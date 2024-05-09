<!-- <template>
  <div>
    <input type="text" v-model="deviceNumber" placeholder="输入设备号">
	<button @click="connect">连接设备</button>
	<button @click="publishMessage">保存数据</button>
  </div>
</template> -->
<template>
  <div id="myapp">
    <input type="text" v-model="deviceNumber" placeholder="输入设备号">
    <button @click="connect">连接设备</button>
    <button @click="publishMessage">保存数据</button>
  </div>
</template>
<!-- <template>
  <view class="container">
    <view class="header">
      
      <text class="title">水质检测设备连接</text>
    </view>
    <view class="input-area">
      <input type="text"  class="input-field"/>
    </view>
    <view class="buttons">
      <button @click="connect" class="button connect">连接设备</button>
      <button bindtap="publishMessage" class="button save">保存数据</button>
    </view>
  </view>
</template> -->


<script>
import { v4 } from 'uuid';
import { MQTT_IP, MQTT_OPTIONS } from '@/utils/mqtt.js';
import storage from '@/utils/storage';
import {judgeConnect,getTopic} from '@/api/system/device';
import { sharedData } from '@/sharedData/sharedData.js';
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
			   that.$modal.showToast('连接成功')
			   client.subscribe(that.topicSub, function (err) {
			     if (!err) {
			       console.log('订阅成功');
			     }
			   });
			 }).on('reconnect', function (error) {
			   console.log('正在重连...', that.topic);
			   that.$modal.showToast('正在重连')
			 }).on('error', function (error) {
			   console.log('连接失败...', error);
			   that.$modal.showToast('连接失败')
			 }).on('end', function () {
			   console.log('连接断开');
			   that.$modal.showToast('连接断开')
			 }).on('message', function (topicSub, message) {

			   const data = JSON.parse(message.toString());
			   
			   // console.log(data.TDS);
			   // console.log(data.PH);
			   // console.log(data.TEMP);
			   sharedData.SCORE = data.SCORE;
			   sharedData.TDS = data.TDS;
			   sharedData.PH = data.PH;
			   sharedData.TEMP = data.TEMP;
			   console.log(sharedData.SCORE);
			   console.log(sharedData.TDS);
			   console.log(sharedData.PH);
			   console.log(sharedData.TEMP);
			 }); 
		  }
			  
		  else {
			  // 不满足条件 弹出来一个对话框
			  console.log("设备部门id和用户部门id不匹配，无法连接");
			  that.$modal.showToast('部门不匹配，无法连接');
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
#myapp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e6f7ff;
  padding: 20px;
  box-sizing: border-box;
}

input[type="text"] {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #91d5ff;
  border-radius: 5px;
  outline: none;
}

button {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #40a9ff;
}

button:active {
  background-color: #096dd9;
}
</style>

