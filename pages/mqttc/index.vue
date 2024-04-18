<template>
  <div>
    <input type="text" v-model="deviceNumber" placeholder="输入设备号">
	<button @click="connect">连接设备</button>
	<button @click="publishMessage">发布消息</button>
  </div>
</template>

<script>
import { v4 } from 'uuid';
import { MQTT_IP, MQTT_OPTIONS } from '@/utils/mqtt.js';
import storage from '@/utils/storage';
import {judgeConnect,getTopic} from '@/api/system/device'
var mqtt = require('mqtt/dist/mqtt.js');
var client;

export default {
  data() {
    return {
      topicPub: 'scx/sub', // 要发布的主题
	  topicSub: 'scx/pub',
	  userId: this.$store.state.user.id,
	  tempFlag : 0,
	  deviceNumber:''
    };
  },
  mounted() {
    // this.connect(); // 连接 MQTT 服务器
  },
  methods: {
    

	
	
	 connect() {
      MQTT_OPTIONS.clientId = v4();
      var that = this;
	  judgeConnect(this.userId,this.deviceNumber).then(response=>{
		  console.log("hello scx");
		  console.log(response);
		  // response 为 1
		  
			  
		  if(response ==1){
			 // #ifdef H5
			 client = mqtt.connect('ws://' + MQTT_IP, MQTT_OPTIONS);
			 // #endif
			 
			 
			 // #ifdef MP-WEIXIN||APP-PLUS
			 client = mqtt.connect('wx://' + MQTT_IP, MQTT_OPTIONS);
			 // #endif
			 
			 // console.log("userId "+this.userId);
			 client.on('connect', function () {
			   console.log('连接成功');
			   client.subscribe(that.topicSub, function (err) {
			     if (!err) {
			       console.log('订阅成功');
			     }
			   });
			 }).on('reconnect', function (error) {
			   console.log('正在重连...', that.topic);
			 }).on('error', function (error) {
			   console.log('连接失败...', error);
			 }).on('end', function () {
			   console.log('连接断开');
			 }).on('message', function (topicSub, message) {
			   console.log('接收推送信息：', message.toString());
			 }); 
		  }
			  
		  else {
			  // 不满足条件 弹出来一个对话框
			  
		  }
		  
		  
		  
		  
	  });
	  

    },
    publishMessage() {
      if (client && client.connected) {
        client.publish(this.topicPub, 'hello', function (err) {
          if (!err) {
            console.log('消息发布成功');
          } else {
            console.log('消息发布失败:', err);
          }
        });
      } else {
        console.log('MQTT 客户端未连接');
      }
    }
  }
};
</script>

<style>
</style>
