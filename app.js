//app.js
let wxGetSetting = require('./utils/wxGetSetting')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    let isToken = false
    
    // if (isToken) {
    //   wx.setStorageSync('token', Date.now())
    // } else {
    //   wx.removeStorageSync('token')
    // }
    // return
    // 判断是否有token
    let token = wx.getStorageSync('token')
    // if (token) {
    //   // 验证token
    //   this.validate()
    // } else {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请授权微信小程序',
    //     success(res) {
    //       if (res.confim) {
    //         wx.login({
    //           success: res => {
    //             if (res.code) {
                  
    //             }
    //           }
    //         })
    //       }
    //     }
    //   })
    // }
    // // 获取用户信息
    if (isToken) {

    } else {
      if (wxGetSetting.default('userInfo')) {
        wx.navigateTo({
          url: './pages/login/login'
        })
      }
    }
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       console.log('已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框')
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     } else {
    //       wx.showModal({
    //         title: '是否授权当前用户',
    //         content: '需要获取您当前用户信息',
    //         success: function (res) {
    //           if (res.cancel) {
    //             console.info("1授权失败返回数据");
 
    //           } else if (res.confirm) {
    //             //village_LBS(that);
    //             wx.openSetting({
    //               success: function (data) {
    //                 if (data.authSetting["scope.userLocation"] == true) {
                        
    //                 console.log('授权情况', data);
    //                   wx.showToast({
    //                     title: '授权成功',
    //                     icon: 'success',
    //                     duration: 5000
    //                   })
    //                   //再次授权，调用getLocationt的API
    //                   // village_LBS(that);
    //                 }else{
    //                   wx.showToast({
    //                     title: '授权失败',
    //                     icon: 'success',
    //                     duration: 5000
    //                   })
    //                 }
    //               }
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  },
  validate() {
    wx.request({
      url: 'http://192.168.1.103/yiji/skillList.php',
      method: 'POST',
      data:{
        token: token 
      },    //参数为json
      header: {
        //设置参数内容类型为application/json
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          items: res.data
        })
        // 返回成功
        if (res.data.success) {
          // 判断token 是否有效
          if (!true) {
            // token无效  根据返回标识  跳转到登录页面或者注册页面
            if (user === 'reg') {
              wx.reLaunch({
                url: '../../pages/register/register'
              })
            } else {
              wx.reLaunch({
                url: '../../pages/login/login'
              })
            }
          }
          // 可以进行业务数据请求
        } else {
          // 网络错误···
        }
      }
    })
  }
})