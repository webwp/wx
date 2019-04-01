//index.js
//获取应用实例
const app = getApp()
var wxGetSetting = require('../../utils/wxGetSetting')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'LPDBZ-Z2Q3R-NMLW2-WRASK-CGGNO-TFFH5'
})
const { netUtil } = app.globalData
Page({
  data: {
    curPosition: {
      longitude: 0,
      latitude: 0
    },
    polyline: [],
    cityInfo: { city: '南宁' },
    curMarkers: [],
    isShow: true
  },
  onShow () {
    console.log('onShow', this, netUtil)
    let params = {
      "city":"南宁市",
      "lng":108.33,
      "lat":22.84
    }
    netUtil.postRequest('/site/querySiteListInfo', params, this.onStart, this.onSuccess, this.onFailed)
    this.wxGetLocation()
  },
  // 网络请求 start
  onStart: function () { //onStart回调
    wx.showLoading({
      title: '正在加载',
    })
  },
  onSuccess: function (res) { //onSuccess回调
    wx.hideLoading();
    console.log('后端数据', res)
    this.setData({
      // jokeList: res.result.data //请求结果数据
    })

  },
  onFailed: function (msg) { //onFailed回调
    wx.hideLoading();
    if (msg) {
      wx.showToast({
        title: msg,
      })
    }
  },
  // 网络请求 end
  onReady () {
    console.log('onReady', this)
  },
  onHide () {
    console.log('onHide', this)
  },
  onUnload () {
    console.log('onUnload', this)
  },
  // 获取当前位置
  wxGetLocation () {
    // 判断是否有定位权限
    wxGetSetting.default('userLocation')
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
          curPosition: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        })
        qqmapsdk.reverseGeocoder({
          location: that.data.curPosition,
          success: function(res) {
            console.log('地址你接戏',res)
            const { result } = res
            const { address_component } = result
            that.setData({
              cityInfo: address_component
            })

          }
        })
        console.log(that)
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  // 点击最近检测桩
  onClickHandler () {
    this.setData({
      isShow: !this.data.isShow
    })
    console.log(this.data.isShow)
  },
  // 点击开始导航
  onClickHandlerStartMap () {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  onClickToUser(uri) {
    console.log(uri)
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },
  formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: e.detail.value.start,
      to: e.detail.value.dest, 
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          curPosition: {
            latitude:pl[0].latitude,
            longitude:pl[0].longitude
          },
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})
