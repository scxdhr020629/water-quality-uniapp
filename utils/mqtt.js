export const MQTT_IP = '114.55.251.57:8083/mqtt'//mqtt地址端口
const MQTT_USERNAME = 'scx-weixin'//mqtt用户名
const MQTT_PASSWORD = 'cx020629'//密码

export const MQTT_OPTIONS = {
    connectTimeout: 5000,
    clientId: '',
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    clean: false
}