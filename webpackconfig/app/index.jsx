import React,{ Component } from 'react'
import { render } from 'react-dom'
import Rerf from 'react-addons-perf'			/* react性能测工具 */
import { Provider } from 'react-redux'			/* 主要功能是将状态分发到每个组件上 */
import configStore from '@/store/configStore'	/* store配置文件 */


import Hello from '@/containers/Hello'


/* react性能测试工具 */
if(__DEV__){
	window.Perf = Perf;
}
const store = configStore();


render(
	<Provider store={store}>
		<Hello/>
	</Provider>,
	document.getElementById('root')
)