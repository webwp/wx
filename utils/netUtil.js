
const MD5 = require('./MD5.js')
const errorPrompt = require('./errorPrompt')
const baseConfig = require('./config')
console.log('errorPrompt::::', errorPrompt)

// randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
function randomWord (randomFlag, min, max) {
    let str = ''
    let range = min
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  
    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min
    }
    for (let i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1))
      str += arr[pos]
    }
    return str
}
  
function commonParam (obj) {
    // 字典排序
    const ordered = {}
    Object.keys(obj).sort().forEach((key) => {
        ordered[key] = obj[key]
    })

    // 拼接key和value
    let str = ''
    Object.keys(ordered).forEach((key) => {
        str += key + ordered[key]
    })

    const timestamp = new Date().getTime()
    const ranstr = randomWord(false, 6, 6)
    const unsign = timestamp + str + ranstr
    console.log('签名算法', timestamp, ranstr, unsign)
    // unsign = unsign.toLowerCase()
    // console.log('timestamp', timestamp, 'ranstr', ranstr, 'unsign', unsign)
    // console.log('md5', md5(unsign), md5(unsign).length)
    return { timestamp, ranstr, sign: MD5.hex_md5(unsign) }
}
// let params = {
//     lng: 108.31343, 
//     lat: 22.83393, 
//     city: "南宁市"
// }
// let commomParams = commonParam(params)
// let newParams = {}
// newParams.method = 'share.report.get'
// newParams = { ...newParams, ...params, ...commomParams}
// console.log('新签名算法', newParams)
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
    let token = wx.getStorageSync('token')
    // 公共参数
    let commomParams = commonParam(params)
    let newParams = token ? {token} : {}
    newParams.method = url
    newParams = { ...newParams, ...params, ...commomParams}
    console.log(method + " params", newParams)
    //  请求开始 start
    console.log('url', baseConfig.default.baseUrl)
     onStart()
     wx.request({
        url: baseConfig.default.baseUrl,
        // url: 'http://192.168.0.19:22003/site/querySiteListInfo',
        method: method,
        // data: dealParams(url,params),
        data:  params ,
        // params:  params,
        header: { 'content-type': 'application/json' },
        success: function (res) {
            console.log("request:",res.data)
            onSuccess(res.data)
            // if (res.data) {
            //     if(res.data.token) {
            //         wx.setStorageSync('token', res.data.token)
            //     }
            //     /**
            //      * start根据需求，接口的返回状态码进行处理
            //      */
            //     // if (res.data.error_code == 0) {
            //     //     onSuccess(res.data)
            //     // } else {
            //     //     onFailed(res.data.msg)
            //     // }
            // /**处理结束 */
            // }
            if (res.data.result === '10000') {
                onSuccess(res.data)
            } else {
                console.log('555555555', errorPrompt.default[res.data.result])
                wx.showToast({
                    title: errorPrompt.default[res.data.result],
                    icon: 'none'
                })
            }
        },
        fail: function(error) {
            onFailed(error)
            wx.showToast({
                title:  '网络请求错误',
                icon: 'none'
            })
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