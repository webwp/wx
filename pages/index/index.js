//index.js
//获取应用实例
const app = getApp()
const { netUtil } = app.globalData
console.log('app', app.globalData)
Page({
  data: {
    motto: 'Hello World',
    toPage: 'map.index',
    hasAuthorization: true,
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // console.log('options', options, 'map.index'.replace(/[.]/g,"/"))
    this.verificationSys(options)
    




    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: false
      })
    } else if (this.data.canIUse){
      // 是否显示授权按钮
      app.userInfoReadyNoCallback = res => {
        this.setData({
          hasAuthorization: res
        })
      }
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        
      }
    } else {
      console.log(3)
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
      hasUserInfo: true,
      hasAuthorization: true
    })
    wx.reLaunch({
      url: '../' + this.data.toPage.replace(/[.]/g,"/")
    })
  },

  verificationSys(options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // this.globalData.hasAuthorization = true
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res =>{ 
              // 可以将 res 发送给后台解码出 unionId
              this.setData({
                userInfo: res.userInfo
              })
  
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          }) 
          let token = wx.getStorageSync('token') 
          if (token) {
            netUtil.getRequest('dswx.user.token.verify', {},
            (onStart) => {
              wx.showLoading()
            },
            (res) => {
              // 20003 token 无效 重新登录
              if (res.data.result === '20003') {
                wx.navigateTo({
                  url: '../login/login'
                })
              } else {
                wx.navigateTo({
                  url: '../' + this.data.toPage.replace(/[.]/g, "/")
                })
              }
            },
            (err) => {
              console.log(err)
            })
            // wx.navigateTo({
            //   url: '../map/index'
            // })
          } else {
            console.log('没有token') 
            wx.login({
              success: res => {
                if (res.code) {
                  // 将code 发送给后台申请token
                  let params = {
                    wxcode: res.code
                  }
                  netUtil.getRequest('dswx.user.token.create', params, (onStart) => {
                    wx.showLoading()
                  },
                  (res) => {
                    wx.hideLoading();
                    if (res.regticket) {
                      wx.navigateTo({
                        url: '../login/login?regticket=' + res.regticket
                      })
                    } else {
                      console.log('--')
                    }
                  },
                  this.onFailed)
                }
                wx.hideLoading()
              },
              fail: err => {
                console.log(err) 
                wx.hideLoading()
              }
            })
          }
        } else {
          this.setData({
            hasAuthorization: false
          })
        }
      }
    })
  }
})
