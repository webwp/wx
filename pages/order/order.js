// wxPile/pages\order/order.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab0',
    tabType: ['全部', '待支付', '待服务', '已完成', '已失效'],
    alreadyLoadTab: []
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
  handleDaoHang () {
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 22.5542080000,//要去的纬度-地址
          longitude: 113.8878770000,//要去的经度-地址
          name: "宝安中心A地铁口",
          address:'宝安中心A地铁口'
        })
      }
    })
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