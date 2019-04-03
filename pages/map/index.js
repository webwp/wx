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
    cityInfo: { city: '' },
    currMarker: {},
    isShow: true,
    distance: '0',
    distancenearest: {
      address: '广西南宁市西乡塘区科创路2号',
      distance: '1550',
    },
    list: [
      {
        id: 0,
        sn: '001',
        name: 'B区检测桩',
        province: '广西',
        city: '南宁市',
        area: '西乡塘区',
        address: '科创路2号',
        contacts: '韦先生',
        phone: '18007803076',
        longitude: 108.254364,
        latitude: 22.854506,
        organization_sn: 'JBT0005',
        create_time_str: '',
        create_time: ''
      },
      {
        id: 1,
        sn: '002',
        name: 'A区检测桩',
        province: '广西',
        city: '南宁市',
        area: '西乡塘区',
        address: '相思湖东路',
        contacts: '韦先生',
        phone: '18007803076',
        longitude: 108.246961,
        latitude: 22.840624,
        organization_sn: 'JBT0005',
        create_time_str: '',
        create_time: ''
      },
      {
        id: 2,
        sn: '002',
        name: 'A区检测桩',
        province: '广西',
        city: '南宁市',
        area: '西乡塘区',
        address: '相思湖东路',
        contacts: '韦先生',
        phone: '18007803076',
        longitude: 108.252239,
        latitude: 22.861031,
        organization_sn: 'JBT0005',
        create_time_str: '',
        create_time: ''
      },
      {
        id: 3,
        sn: '002',
        name: 'A区检测桩',
        province: '广西',
        city: '南宁市',
        area: '西乡塘区',
        address: '相思湖东路',
        contacts: '韦先生',
        phone: '18007803076',
        longitude: 108.350773,
        latitude: 22.831250,
        organization_sn: 'JBT0005',
        create_time_str: '',
        create_time: ''
      },
      {
        id: 4,
        sn: '002',
        name: 'A区检测桩',
        province: '广西',
        city: '南宁市',
        area: '西乡塘区',
        address: '相思湖东路',
        contacts: '韦先生',
        phone: '18007803076',
        longitude: 108.317814,
        latitude: 22.823340,
        organization_sn: 'JBT0005',
        create_time_str: '',
        create_time: ''
      }
    ]
  },
  onShow () {
    console.log('onShow', this, netUtil)
    let params = {
      "city":"南宁市",
      "lng":108.33,
      "lat":22.84
    }
    // netUtil.postRequest('/site/querySiteListInfo', params, this.onStart, this.onSuccess, this.onFailed)
    if (this.data.cityInfo.city === '') {
      wx.authorize({
        scope: 'scope.userLocation',
        success(res) {
          console.log("sdfsfsasdfa", res)
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          
      this.wxGetLocation()
        }
      })
    } else {
      this.getGeocoder()
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
  // 地址解析(地址转坐标)
  getGeocoder() {
    wx.showLoading({
      title: '正在加载',
    })
    var _this = this;
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: _this.data.cityInfo.city, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function(res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        _this.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
          poi: { //根据自己data数据设置相应的地图中心坐标变量名称
            latitude: latitude,
            longitude: longitude
          },
          curPosition: {
            longitude: longitude,
            latitude: latitude
          },
        })
        wx.hideLoading()
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },
  // 点击marker事件
  onHandleMarker(e) {
    let positionStr = this.data.list.filter(res => {
      return res.id === e.markerId
    })
    if (positionStr) {
      this.setData({
        currMarker: positionStr[0],
        isShow: false,
        distancenearest: {
          ...this.data.distancenearest,
          address: positionStr[0].province + positionStr[0].city + positionStr[0].area + positionStr[0].address,
        }
      })
      
    }
    positionStr = positionStr[0].latitude + "," + positionStr[0].longitude
    // 传入终点 经纬度 规划路线
    this.formSubmit(positionStr)
  },
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
  handleClickDistance () {
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
    wx.openLocation({
      latitude: this.data.currMarker.latitude,
      longitude: this.data.currMarker.longitude,
      scale: 28,
      // name: '西部电信中心',
      // address: '益州大道1666号'
    })
  },
  onClickToUser(uri) {
    console.log(uri)
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },
  formSubmit(value) {
    // console.log('to:', typeof e.detail.value.dest)
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      // from: e.detail.value.start,
      to: value, 
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        _this.setData({
          distance: ret.result.routes[0].distance,
          distancenearest: {
            ..._this.data.distancenearest,
            distance: ret.result.routes[0].distance
          }
        })
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
  },
  onHandleList() {
    let params = {
      lng: this.data.curPosition.longitude,
      lat: this.data.curPosition.latitude,
      city: this.data.cityInfo.city
    }
    wx.navigateTo({
      url: '../../pages/checklist/index?current=' + JSON.stringify(params)
    })
  }
})
