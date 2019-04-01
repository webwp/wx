/**
 * 供外部post 请求调用
 */
function post(url, params, onStart, onSuccess, onFailed) {
    request(url, params, 'POST', onStart, onSuccess, onFailed)
}
/**
 * 供外部get请求调用
 */
function get(url, params, onStart, onSuccess, onFailed) {
    request(url, params, 'GET', onStart, onSuccess, onFailed)
}

let baseConfig = require('./config')
/**
 * function :封装网络请求
 * @url: URL请求地址
 * @params: 请求参数
 * @method： 请求方式
 * @onStart: 开始请求  初始化loading等处理
 * @onSuccess: 成功回调
 * @onFailed: 失败回调
 */

 function request(url, params, method, onStart, onSuccess, onFailed) {
    //  请求开始 start
    console.log('url', baseConfig.default.baseUrl + url)
     onStart()
     wx.request({
        url: baseConfig.default.baseUrl + url,
        // url: 'http://192.168.0.19:22003/site/querySiteListInfo',
        method: method,
        // data: dealParams(url,params),
        data: params,
        header: { 'content-type': 'application/json' },
        success: function (res) {
            
            console.log('数据返回：', res.data)
            onSuccess(res.data)
            if (res.data) {
                /**
                 * start根据需求，接口的返回状态码进行处理
                 */
            if (res.data.error_code == 0) {
                onSuccess(res.data)
            } else {
                onFailed(res.data.msg)
            }
            /**处理结束 */
            }
        },
        fail: function(error) {
            onFailed(error)
        }
     })
 }

 /**
  * function: 根据需求处理参数或添加固定参数等
  * @params 请求参数
  */
 function dealParams(url, params) {
     let resParams = {
         ...params,
         method: baseConfig.method[url]
     }
    /**具体处理参数 */
    return resParams
 }

 module.exports = {
    postRequest: post,
    getRequest: get
 }