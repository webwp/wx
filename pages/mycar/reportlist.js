// wxPile/pages\mycar/mycar.js
const app = getApp()
const { netUtil } = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchField: {
      vin: '',
      page: 1,
      size: ''
    },
    result: {
      result: 0,
      total: 0,
      totalPage: 0,
      data: [
        {
          sn: '07711807803076',
          systemCount: 10,
          faultCount: 10,
          normalCount: 20,
          source: 1,
          createTime: '2019-04-05 23:49:00'
        },
        {
          sn: '07711807803076',
          systemCount: 10,
          faultCount: 10,
          normalCount: 20,
          source: 1,
          createTime: '2019-04-05 23:49:00'
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchField: {
        ...this.data.searchField,
        vin: options.vin
      }
    })
    // netUtil.getRequest('dswx.car.report.list', this.data.searchField, this.onStart, this.onSuccess, this.onFailed)
  },
  // 网络请求 start
  onStart: function () { //onStart回调
    wx.showLoading({
      title: '正在加载···',
    })
  },
  onSuccess: function (res) { //onSuccess回调
    
    wx.hideLoading();
    this.setData({
      result: res.data
    })
    

  },
  onFailed: function (msg) { //onFailed回调
    console.log('----', msg.errMsg)
    wx.hideLoading();
    if (msg) {
      wx.showToast({
        title: msg.errMsg,
      })
    }
  },
  // 网络请求 end
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 报告详情
  onHandleToDetail(e) {
    console.log(e)
    let sn =  e.currentTarget.dataset.sn
    // netUtil.getRequest('dswx.car.list', {}, this.onStart, this.onSuccessDetail, this.onFailed)
    wx.navigateTo({
      url: "./webview?sn=" + sn
    })
    console.log(sn)
  },
  // onSuccessDetail(res) {
  //   console.log(res.data);

  // },

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
  handleClickToAdd() {
    wx.navigateTo({
      url: '../../pages/mycar/addCar'
    })
  }
})