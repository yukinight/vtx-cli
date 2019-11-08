import React from 'react';

export default class RouterComponent extends React.Component{
	constructor(props){
		super(props);
        this.namespace = '';
        this.updateState = this.updateState.bind(this);
        this.act = this.act.bind(this);
	}
    // 更新state
	updateState(obj,namespace){
		this.props.dispatch({
			type:`${namespace||this.namespace}/updateState`,
			payload:obj
		});
    }
    // 调用指定namespace内部函数
    act(functionName,obj={},namespace){
        return this.props.dispatch({
			type:`${namespace||this.namespace}/${functionName}`,
			payload:obj
		});
    }
}