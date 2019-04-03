
wx.authorize({
  scope: 'scope.userLocation',
  success() {
    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    // wx.getUserInfo()
  }
})


function wxGetSetting(mode) {
  wx.authorize({
    scope: 'scope.userLocation',
    success() {
      // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
      // wx.getUserInfo()
    }
  })
    // wx.getSetting({
    //     success: (res) => {
    //       console.log('授权结果', res);
    //       console.log(res.authSetting['scope.userLocation']);
    //       if (mode === 'userLocation') {
    //         if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
    //             getUserInfo("是否授权用户定位", "地图需要获取当前用户得")
    //             return
    //           } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
    //             // village_LBS(that);
    //           }
    //       } else if (mode === 'userInfo') {
    //         if (res.authSetting['scope.userInfo'] != undefined && res.authSetting['scope.userInfo'] != true) {//非初始化进入该页面,且未授权
    //           getUserInfo('是否授权当前用户', '需要获取您当前用户信息')
    //         } else if (res.authSetting['scope.userInfo'] == undefined) {//初始化进入
    //           // village_LBS(that);
    //                 wx.authorize({
    //                   scope: 'scope.userInfo',
    //                   success() {
    //                     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //                     wx.getUserInfo()
    //                   }
    //                 })
    //           console.log("验证是否授权2", mode, res.authSetting['scope.userInfo'])
    //           // getUserInfo('是否授权当前用户', '需要获取您当前用户信息')
    //         }
    //       }
    //     }
    // })
}

// 用户信息授权
function getUserInfo(title,content) {
  wx.showModal({
    title: title, //'是否授权当前用户',
    content: content, //'需要获取您当前用户信息',
    success: function (res) {
      if (res.cancel) {
        console.info("1授权失败返回数据");
      } else if (res.confirm) {
        //village_LBS(that);
        wx.openSetting({
          success: function (data) {
            if (data.authSetting["scope.userLocation"] == true) {
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 5000
              })
              //再次授权，调用getLocationt的API
              // village_LBS(that);
            }else{
              wx.showToast({
                title: '授权失败',
                icon: 'success',
                duration: 5000
              })
            }
          }
        })
      }
    }
  })
}

export default wxGetSetting