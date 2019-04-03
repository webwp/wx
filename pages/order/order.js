// wxPile/pages\order/order.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationVisible: false,
    current: 'tab0',
    tabType: ['全部', '待支付', '待服务', '已完成', '已失效'],
    alreadyLoadTab: [],
    requestParams: {
      method: 'dswx.order.list',
      userName: '',
      state: 0, // 全部0 待服务1 待支付2  已取消3 已完成4  待评价5
      num: '',  // 服务模块(多选以英文逗号分隔):1001:维修竞价服务,1002:车险竞价服务,1003:电瓶竞价服务,2001:维修定价服务,3004:保养服务,3005:钣喷服务,3008:洗车服务, 
      page: 1,
      pageSize: 10
    },
    list: [
      {
        title: '车险:交强险+车船税',
        price: '￥600.00',
        orderNum: '201904021347360001',
        createTime: '2019-04-02 13:47:00',
        orderState: 10, // 10:待支付,20已支付,30:商家已接单,40:已完成
        serviceType: 1, // 2上门取车，1上门服务，0到店服务，3线上服务(车险使用)
        cancelState: 0, // 订单的取消状态0未取消,1车主取消,2商家取消,3订单超时取消
        serviceModule: 1001, // 订单类型:1001:维修竞价服务,3004:保养服务,3008:洗车服务,1002:车险竞价服务,3005:钣喷服务,1003:电瓶竞价服务,2001:维修定价服务
        checkCode: '5002019', // 结单码
        vehicleJson: '花镇宝马', // 车型名称
        biddingNumber: '201904024676456785', // 竞价单号(用于查看竞价详细信息)
        orderNumer: '201904024676456785', // 竞价单号(用于查看竞价详细信息)
        businessInfo: {
          businessId: 0,
          id: 0,
          abbreviation: '华安汽配城维修中心',
          tel: '1800803076',
          gps: '22.773966,108.250008'
        }, // 商家信息
        otherData: '', //其他信息
        vehicleInfo: {
          vehicleName: '第十代CIVIC【思域】傲世动力座驾',
          plateNum: '桂A099T2',
          image: ''
        } //车型信息
      },
      {
        title: '车险:交强险+车船税',
        price: '￥600.00',
        orderNum: '201904021347360001',
        createTime: '2019-04-02 13:47:00',
        orderState: 20, // 10:待支付,20已支付,30:商家已接单,40:已完成
        serviceType: 1, // 2上门取车，1上门服务，0到店服务，3线上服务(车险使用)
        cancelState: 0, // 订单的取消状态0未取消,1车主取消,2商家取消,3订单超时取消
        serviceModule: 1001, // 订单类型:1001:维修竞价服务,3004:保养服务,3008:洗车服务,1002:车险竞价服务,3005:钣喷服务,1003:电瓶竞价服务,2001:维修定价服务
        checkCode: '5002019', // 结单码
        vehicleJson: '花镇宝马', // 车型名称
        biddingNumber: '201904024676456785', // 竞价单号(用于查看竞价详细信息)
        orderNumer: '201904024676456785', // 竞价单号(用于查看竞价详细信息)
        businessInfo: {
          businessId: 0,
          id: 0,
          abbreviation: '华安汽配城维修中心',
          tel: '1800803076',
          gps: '22.773966,108.250008'
        }, // 商家信息
        otherData: '', //其他信息
        vehicleInfo: {
          vehicleName: '阿尔法·罗密欧-Stelvio 2018款 2.9T 510HP 四叶草版',
          plateNum: '桂A099T2',
          image: ''
        } //车型信息
      },
      {
        title: '车险:交强险+车船税',
        price: '￥600.00',
        orderNum: '201904021347360001',
        createTime: '2019-04-02 13:47:00',
        orderState: 30, // 10:待支付,20已支付,30:商家已接单,40:已完成
        serviceType: 1, // 2上门取车，1上门服务，0到店服务，3线上服务(车险使用)
        cancelState: 0, // 订单的取消状态0未取消,1车主取消,2商家取消,3订单超时取消
        serviceModule: 1001, // 订单类型:1001:维修竞价服务,3004:保养服务,3008:洗车服务,1002:车险竞价服务,3005:钣喷服务,1003:电瓶竞价服务,2001:维修定价服务
        checkCode: '5002019', // 结单码
        vehicleJson: '花镇宝马', // 车型名称
        biddingNumber: '201904024676456785', // 竞价单号(用于查看竞价详细信息)
        orderNumer: '201904024676456785', // 竞价单号(用于查看竞价详细信息)
        businessInfo: {
          businessId: 0,
          id: 0,
          abbreviation: '华安汽配城维修中心',
          tel: '1800803076',
          gps: '22.773966,108.250008'
        }, // 商家信息
        otherData: '', //其他信息
        vehicleInfo: {
          vehicleName: '阿尔法·罗密欧-Stelvio 2018款 2.9T 510HP 四叶草版',
          plateNum: '桂A099T2',
          image: ''
        } //车型信息
      },
      {
        title: '车险:交强险+车船税',
        price: '￥600.00',
        orderNum: '201904021347360001',
        createTime: '2019-04-02 13:47:00',
        orderState: 40, // 10:待支付,20已支付,30:商家已接单,40:已完成
        serviceType: 1, // 2上门取车，1上门服务，0到店服务，3线上服务(车险使用)
        cancelState: 0, // 订单的取消状态0未取消,1车主取消,2商家取消,3订单超时取消
        serviceModule: 1001, // 订单类型:1001:维修竞价服务,3004:保养服务,3008:洗车服务,1002:车险竞价服务,3005:钣喷服务,1003:电瓶竞价服务,2001:维修定价服务
        checkCode: '5002019', // 结单码
        vehicleJson: '花镇宝马', // 车型名称
        biddingNumber: '201904024676456785', // 竞价单号(用于查看竞价详细信息)
        orderNumer: '201904024676456785', // 竞价单号(用于查看竞价详细信息)
        businessInfo: {
          businessId: 0,
          id: 0,
          abbreviation: '华安汽配城维修中心',
          tel: '1800803076',
          gps: '22.773966,108.250008'
        }, // 商家信息
        otherData: '', //其他信息
        vehicleInfo: {
          vehicleName: '阿尔法·罗密欧-Stelvio 2018款 2.9T 510HP 四叶草版',
          plateNum: '桂A099T2',
          image: ''
        } //车型信息
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 详情页面
  onHandleOrderDetail() {
    wx.navigateTo({
      url: '../../pages/order/orderdetail'
    })
  },
  // 调用手机拨号
  handleTel(e) {
    const { target } = e
    wx.makePhoneCall({
      phoneNumber: target.dataset.tel
    })
  },
  handleMapNav (e) {
    let gps = e.target.dataset.gps
    
    if (gps !== '') {
      gps = gps.split(',')
      wx.getLocation({//获取当前经纬度
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
        success: function (res) {
          wx.openLocation({//​使用微信内置地图查看位置。
            latitude: parseFloat(gps[0]),//要去的纬度-地址
            longitude: parseFloat(gps[1]),//要去的经度-地址
            name: "",
            address:''
          })
        }
      })
    } else {
      
    console.log(e)
      this.setData({
        locationVisible: true
      })
    }
    
  },
  handleClose2 () {
      this.setData({
        locationVisible: false
      });
  },
  handleChange ({ detail }) {
      // 通过alreadyLoadTab数组控制tab切换时是否载入内容
      if (this.checkArrIndexOf(detail.key)) {
        this.data.alreadyLoadTab.push(detail.key)
        $Toast({
          content: '加载中',
          type: 'loading',
          duration: 3000
        });
        setTimeout(function() {
          $Toast.hide()
        }, 3000)
      }
      this.setData({
          current: detail.key
      });
  },
  checkArrIndexOf(cur) {
    return this.data.alreadyLoadTab.indexOf(cur) < 0 ? true : false
  },
  // 去支付
  onHandleToPay() {
    wx.navigateTo({
      url: '../../pages/pay/index'
    })
  }
})