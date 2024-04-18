import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission
// 引入Echarts

// import * as echarts from 'echarts';

// import 'echarts-gl';

// Vue.prototype.$echarts = echarts //可以全局使用 不用每次使用需要在页面导入
Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
