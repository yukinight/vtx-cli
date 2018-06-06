import {VtxUtil} from './util';

/* 
    普通请求
    参数： 1. url, 
          2. options:{
              method:'post',
              body:{aa:1}
            } 
*/
export default function request(url, options={}) {
    let postData = {};
    let qstr = {
        tenantId: VtxUtil.getUrlParam('tenantId'),
        userId: VtxUtil.getUrlParam('userId'),
    }
    if(options.body){   
        for(let k in options.body){
            if(typeof options.body[k]=='object' &&  options.body[k]!==null){
                postData[k] = JSON.stringify(options.body[k]);
            }
            else{
                postData[k] = options.body[k];
            }
        }
    }
    let ajaxPropmise = new Promise((resolve, reject) => {
        $.ajax({
            type: options.method || 'get',
            url: `${url}?${$.param(qstr)}`,
            data: postData,
            dataType: 'json',
            cache:false,
            success: function (data) {
                resolve(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(textStatus);
            }
        });
    });
    return ajaxPropmise.then(data => ({ data }))
    .catch(err => {
        return { data: null };
    });
}

/* 
    头为application/json的请求
    参数： 1. url, 
          2. options:{
              urlQuery:{}, 放在url后面的参数
              body:{aa:1}，放在请求体内的参数
            } 
*/
export function requestJson(url, options={}) {
    let qstr = {
        tenantId: VtxUtil.getUrlParam('tenantId'),
        userId: VtxUtil.getUrlParam('userId'),
    }
    if(options && options.urlQuery) {
        qstr = {
            ...qstr,
            ...options.urlQuery
        }
    }
    let ajaxPropmise = new Promise((resolve, reject) => {
        $.ajax({
            type: 'post',
            url: `${url}?${$.param(qstr)}`,
            // data:options.body,
            data: options.body ? JSON.stringify(options.body) : '',
            contentType: 'application/json;charset=UTF-8',
            dataType: 'json',
            cache:false,
            success: function (data) {
                resolve(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(textStatus);
            }
        });
    });
    return ajaxPropmise.then(data => ({ data }))
    .catch(err => {
        return { data: null };
    });
}
