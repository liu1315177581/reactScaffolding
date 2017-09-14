import * as actionTypes from '@/constants/userinfo'		/* 引入userinfo里面的所有 */

const initState = {};

export default function userinfo(state = initState,action){
	switch(action.type){
		case actionTypes.USERINFO_LOGIN:
			return action.data
		case actionTypes.USERINFO_OUTPUT:
			return action.data
		default:
			return state
	}
}



