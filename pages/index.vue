<!-- <template>
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
						data: [675.3, 673.3, 706.6, 698, 711, 674, 698],
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
</script> -->

<template>
	<view class="container">
		<view style="width:750rpx; height:700rpx"><l-echart ref="chartRefTDS" @finished="init"></l-echart></view>
		<view style="width:750rpx; height:700rpx"><l-echart ref="chartRefPH" @finished="init"></l-echart></view>
	</view>
</template>

<script>
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min';
	import { sharedData } from '../sharedData/sharedData';
	export default {
		data() {
			return {
				optionTDS: {
					xAxis: {
						type: 'category',
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [],
						type: 'line'
					}]
				},
				optionPH: {
					xAxis: {
						type: 'category',
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [],
						type: 'line'
					}]
				},
				chartTDS: null,
				chartPH: null,
			};
		},
		// methods: {
		// 	async init() {
		// 		this.chartTDS = await this.$refs.chartRefTDS.init(echarts);
		// 		this.chartTDS.setOption(this.optionTDS);
		// 		this.chartPH = await this.$refs.chartRefPH.init(echarts);
		// 		this.chartPH.setOption(this.optionPH);
		// 		this.startDataFeed();
		// 	},
		// 	startDataFeed() {
		// 		setInterval(() => {
		// 			const now = new Date();
		// 			const timeLabel = now.toTimeString().substr(0, 8); // "hh:mm:ss" format
					
		// 			// Assuming sharedData updates TDS and PH values regularly
		// 			this.optionTDS.series[0].data.push(sharedData.TDS);
		// 			this.optionTDS.xAxis.data.push(timeLabel);
					
		// 			this.optionPH.series[0].data.push(sharedData.PH);
		// 			this.optionPH.xAxis.data.push(timeLabel);
					
		// 			// Update and redraw the charts
		// 			this.chartTDS.setOption({
		// 				xAxis: {
		// 					data: this.optionTDS.xAxis.data
		// 				},
		// 				series: [{
		// 					data: this.optionTDS.series[0].data
		// 				}]
		// 			});
					
		// 			this.chartPH.setOption({
		// 				xAxis: {
		// 					data: this.optionPH.xAxis.data
		// 				},
		// 				series: [{
		// 					data: this.optionPH.series[0].data
		// 				}]
		// 			});
		// 		}, 1000);
		// 	}
		// }
		methods: {
		    async init() {
		        this.chartTDS = await this.$refs.chartRefTDS.init(echarts);
		        this.chartTDS.setOption(this.optionTDS);
		        this.chartPH = await this.$refs.chartRefPH.init(echarts);
		        this.chartPH.setOption(this.optionPH);
		        this.startDataFeed();
		    },
		    startDataFeed() {
		        setInterval(() => {
		            const now = new Date();
		            const timeLabel = now.toTimeString().substr(0, 8); // "hh:mm:ss" format
		            
		            // Assuming sharedData updates TDS and PH values regularly
		            if (this.optionTDS.series[0].data.length >= 5) {
		                this.optionTDS.series[0].data.shift();
		                this.optionTDS.xAxis.data.shift();
		            }
		            if (this.optionPH.series[0].data.length >= 5) {
		                this.optionPH.series[0].data.shift();
		                this.optionPH.xAxis.data.shift();
		            }
		
		            this.optionTDS.series[0].data.push(sharedData.TDS);
		            this.optionTDS.xAxis.data.push(timeLabel);
		            
		            this.optionPH.series[0].data.push(sharedData.PH);
		            this.optionPH.xAxis.data.push(timeLabel);
		            
		            // Update and redraw the charts
		            this.chartTDS.setOption({
		                xAxis: {
		                    data: this.optionTDS.xAxis.data
		                },
		                series: [{
		                    data: this.optionTDS.series[0].data
		                }]
		            });
		            
		            this.chartPH.setOption({
		                xAxis: {
		                    data: this.optionPH.xAxis.data
		                },
		                series: [{
		                    data: this.optionPH.series[0].data
		                }]
		            });
		        }, 1000);
		    }
		}
	}

</script>
