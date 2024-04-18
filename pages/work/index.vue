<template>
  <view class="work-container" :class="bgClass">
    <text class="score">得分: {{ score }}</text>
    <text class="info">TDS: {{ tds }}</text>
    <text class="info">PH: {{ ph }}</text>
    <text class="info">温度: {{ temperature }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      score: 85, // 设置默认得分
      tds: 'xxx', // 设置默认TDS值
      ph: 'xxx', // 设置默认PH值
      temperature: 'xxx' // 设置默认温度值
    };
  },
  created() {
    // 这里可以根据实际情况获取得分、TDS、PH和温度的值，然后更新data中对应的属性值
    // 可以通过网络请求、用户输入等方式获取
    this.score = 70; // 示例：假设得分是92
    this.tds = '0'; // 示例：假设TDS值是xxx
    this.ph = '10.0'; // 示例：假设PH值是xxx
    this.temperature = '25.7'; // 示例：假设温度值是xxx
  },
  computed: {
    bgClass() {
      if (this.score >= 90) {
        return 'bg-blue'; // 得分高于90为蓝色背景
      } else if (this.score >= 60) {
        return 'bg-yellow'; // 得分在60到90之间为黄色背景
      } else {
        return 'bg-red'; // 得分低于60为红色背景
      }
    }
  }
};
</script>

<style>
.work-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.score {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.info {
  font-size: 18px;
  margin-bottom: 10px;
}

.bg-blue {
  background-color: blue;
}

.bg-yellow {
  background-color: yellow;
}

.bg-red {
  background-color: red;
}
</style>
