//index.js
//获取应用实例
const app = getApp()
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
    wx.showLoading({
      title: '加载中',
    })
    let isToken = false
    if (isToken) {
      // 验证token是否过期
      wx.request({
        url: 'http://baidu.com',
        success: res => {
          if (res.data.success) {
             //  token 验证通过，跳转到指定页面  根据后台返回的标志跳转
             // wx.navigateTo({
             //   url: '/pages/login/login'
             // })
          } else {
             //  token 验证过期 重新登录
             wx.navigateTo({
               url: './pages/login/login'
             })
          }
          wx.hideLoading()
        }
      })
   } else {
     // 没有token 用户请求微信服务器获取code，将code发送给后台申请token，后台验证用户是否存在返回给前端，前端根据标志进行登录或注册
     wxGetSetting.default('userInfo')
     wx.login({
       success: res => {
         if (res.code) {
           // 将code 发送给后台申请token
           console.log('获取code', res.code)
           wx.navigateTo({
             url: '../../pages/login/login'
           })
           // 后端返回标志 决定跳转页面
           // if (res.sign) {
           //   wx.navigateTo({
           //     url: res.sign === 'login' ? './pages/login/login' : './pages/register/register'
           //   })
           // } else {
           //   // 申请token成功，跳转到指定页面

           // }
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
