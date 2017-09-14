import { combineReducers } from 'redux'		/*合并各个reducer*/


import userinfo from './userinfo'

const rootReducers = combineReducers({
	userinfo
})
export default rootReducers
