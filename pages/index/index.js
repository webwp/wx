//index.js
//获取应用实例
const app = getApp()
const { netUtil } = app.globalData
let wxGetSetting = require('../../utils/wxGetSetting')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow() {
    wx.getSetting({
      success: (response) => {
        console.log('fuck',response)
        // if (!response.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              console.log("sdfsfsasdfa", res)
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.getUserInfo()
            }
          })
        // }
      }
    })
    // return
    wx.showLoading({
      title: '加载中',
    })
    let isToken = wx.getStorageSync('token')
    if (isToken) {
      wx.navigateTo({
        url: '../map/index'
      })
      // 验证token是否过期
      // wx.request({
      //   url: 'http://baidu.com',
      //   success: res => {
      //     if (res.data.success) {
      //        //  token 验证通过，跳转到指定页面  根据后台返回的标志跳转
      //        // wx.navigateTo({
      //        //   url: '/pages/login/login'
      //        // })
      //     } else {
      //        //  token 验证过期 重新登录
      //        wx.navigateTo({
      //          url: './pages/login/login'
      //        })
      //     }
      //     wx.hideLoading()
      //   }
      // })
   } else {
     // 没有token 用户请求微信服务器获取code，将code发送给后台申请token，后台验证用户是否存在返回给前端，前端根据标志进行登录或注册
     wxGetSetting.default('userInfo')
     wx.login({
       success: res => {
         if (res.code) {
           // 将code 发送给后台申请token
          let params = {
            wxcode: res.code
          }
          netUtil.getRequest('dswx.user.token.create', params, this.onStart, this.onSuccess, this.onFailed)
         }
         wx.hideLoading()
       },
       fail: err => {
         console.log(err)
         wx.hideLoading()
       }
     })
   }
  },
  
  // 网络请求 start
  onStart: function () { //onStart回调
    wx.showLoading({
      title: '正在加载',
    })
  },
  onSuccess: function (res) { //onSuccess回调
    
    wx.hideLoading();
    if (res.regticket) {
      wx.navigateTo({
        url: '../login/login?regticket=' + res.regticket
      })
    } else {}
    

  },
  onFailed: function (msg) { //onFailed回调
    console.log('----', msg)
    wx.navigateTo({
      url: '../map/index'
    })
    wx.hideLoading();
    if (msg) {
      // wx.showToast({
      //   title: msg,
      // })
    }
  },
  // 网络请求 end
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
