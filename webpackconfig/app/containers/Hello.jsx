import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userinfoActions from '@/actions/userinfo'
class Hello extends Component{
	render(){
		return(
			<div>Hello</div>
		)
	}
}
function mapStateToProps(state){
	return{
		userinfo:state.userinfo
	}
}
function mapDispatchToProps(dispatch){
	return{
		userinfoActions:bindActionCreators(userinfoActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Hello)