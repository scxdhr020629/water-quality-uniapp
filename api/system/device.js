import upload from '@/utils/upload'
import request from '@/utils/request'


export function judgeConnect(user_id,dev_id){
	const data = {
		user_id,
		dev_id
	}
	return request({
		'url': '/system/topic/connect',
		'method': 'post',
		'data': data
  })
}


export function getTopic(devId){
	const data = {
		devId
	}
	return request({
			'url': '/system/topic/list',
			'method': 'get',
			'data': data
	})
}