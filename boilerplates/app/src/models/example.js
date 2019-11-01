
import u from 'updeep';

const STATE = {};

export default {

    namespace: 'example',

    state: u(STATE,null),

    subscriptions: {
        setup({ dispatch, history }) {
        },
    },

    effects: {
        // 普通请求
        *fetch({ payload }, { call, put, select, take  }) {
            yield put({ type: 'takeLatest' });
            yield take('takeLatest/@@end');//等takeLatest函数执行完毕后，才会执行此语句后面的代码
        },
        // 节流函数：短时间连续触发多次，此函数只执行一次
        throttle:[ function *({ payload }, { call, put, select }){

        }, {type: 'throttle',ms: 500}],
        // 连续多次请求只返回最后一次结果
        takeLatest:[ function *({ payload }, { call, put, select }){

        }, {type: 'takeLatest'}],

    },

    reducers: {
        updateState(state, action) {
            return u(action.payload,state);
        },
        resetState(state, action){
            return u(STATE,null);
        }
    },

};
