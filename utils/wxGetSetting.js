function wxGetSetting(mode) {
    wx.getSetting({
        success: (res) => {
          console.log('授权结果', res);
          console.log(res.authSetting['scope.userLocation']);
          if (mode === 'userLocation') {
            if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
                wx.showModal({
                  title: '是否授权当前位置',
                  content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
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
                return
              } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
                // village_LBS(that);
              }
          } else if (mode === 'userInfo') {
            if (res.authSetting['scope.userInfo'] != undefined && res.authSetting['scope.userInfo'] != true) {//非初始化进入该页面,且未授权
                wx.showModal({
                  title: '是否授权当前用户',
                  content: '需要获取您当前用户信息',
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
              } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
                // village_LBS(that);
              }
          }
        }
    })
}

export default wxGetSetting