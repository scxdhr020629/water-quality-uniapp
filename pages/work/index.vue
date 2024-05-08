<template>
  <view class="work-container" :class="bgClass">
    <text class="score">得分: {{ score }}</text>
    <text class="info">TDS: {{ tds }}</text>
    <text class="info">PH: {{ ph }}</text>
    <text class="info">温度: {{ temperature }}</text>
  </view>
</template>

<script>
import { sharedData } from '../../sharedData/sharedData';
export default {
  data() {
    return {
      score: sharedData.SCORE, 
      tds: sharedData.TDS, 
      ph: sharedData.PH, 
      temperature: sharedData.TEMP 
    };
  },
  created() {

    this.score = sharedData.SCORE; 
    this.tds = sharedData.TDS; 
    this.ph = sharedData.PH; 
    this.temperature = sharedData.TEMP; 
  },
  computed: {
    bgClass() {
      if (this.score >= 90) {
        return 'bg-blue'; 
      } else if (this.score >= 60) {
        return 'bg-yellow'; 
      } else {
        return 'bg-red'; 
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
