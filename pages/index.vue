<template>
	<view class="container">
		<view style="width:750rpx; height:750rpx"><l-echart ref="chartRefTDS" @finished="init"></l-echart></view>
		<view style="width:750rpx; height:750rpx"><l-echart ref="chartRefPH" @finished="init"></l-echart></view>
	</view>
</template>

<script>
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
	export default {
		data() {
			return {
				optionTDS: {
					xAxis: {
						type: 'category',
						data: ['14:00:01', '14:00:02', '14:00:03', '14:00:04', '14:00:05', '14:00:06', '14:00:07']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [2026, 2020, 2120, 2094, 2133, 2022, 2094],
						type: 'line'
					}]
				},
				optionPH: {
					xAxis: {
						type: 'category',
						data: ['14:00:01', '14:00:02', '14:00:03', '14:00:04', '14:00:05', '14:00:06', '14:00:07']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [7.5, 7.4, 7.3, 7.3, 7.3, 7.4, 7.3],
						type: 'line'
					}]
				},
			};
		},
		// 组件能被调用必须是组件的节点已经被渲染到页面上
		methods: {
			async init() {
				// chart 图表实例不能存在data里
				const chartTDS = await this.$refs.chartRefTDS.init(echarts);
				chartTDS.setOption(this.optionTDS)
				const chartPH = await this.$refs.chartRefPH.init(echarts);
				chartPH.setOption(this.optionPH)
			}
		}
	}
</script>