/**
 * 供外部post 请求调用
 */
function post(url, params, onStart, onSuccess, onFailed) {
    request(url, params, onStart, onSuccess, onFailed)
}
/**
 * 供外部get请求调用
 */
function get(url, params, onStart, onSuccess, onFailed) {
    request(url, params, onStart, onSuccess, onFailed)
}

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
     onStart()
     wx.request({
        url: url,
        data: dealParams(params),
        header: { 'content-type': 'application/json' },
        success: function (res) {
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
 function dealParams(params) {
    /**具体处理参数 */
    return params
 }

 module.exports = {
    postRequest: post,
    getRequest: get
 }