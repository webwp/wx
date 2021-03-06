//index.js
//获取应用实例
const app = getApp()
let wxGetSetting = require('../../utils/wxGetSetting')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      Gender: '男',
      Name: 'wp',
      Nickname: '岸上的鱼',
      address: '广西南宁市西乡塘区'
    },
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
    let t = this
    wx.getUserInfo({
      success(res) {
        console.log(res)
        let { userInfo } = res
        t.setData({
          userInfo: { ...t.data.userInfo, ...userInfo }
        })
        wx.hideLoading()
      },
      fail: function(err) {
        console.log(err)
      }
    })
    
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  }
})
