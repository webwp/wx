// wxPile/pages\mycar/mycar.js
const app = getApp()
const { netUtil } = app.globalData
const { $Message } = require('../../dist/base/index')
const { $Toast } = require('../../dist/base/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Vehicle: [
      {
        plateNumber: '桂A099T2',
        brand: '奇瑞',
        series: '艾瑞泽5',
        model: '自动天窗版 ',
        logo: '',
        vin: '099tw000123097892'
      },
      {
        plateNumber: '桂A099T2',
        brand: '奇瑞',
        series: '艾瑞泽5',
        model: '自动天窗版 ',
        logo: '',
        vin: '099tw000123097892'
      }
    ],
    visibleModal: false,
    modalActions: [
      {
          name: '取消'
      },
      {
          name: '删除',
          color: '#ed3f14',
          loading: false
      }
    ],
    delVin: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // netUtil.getRequest('dswx.car.list', {}, this.onStart, this.onSuccess, this.onFailed)
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
      Vehicle: res.data.Vehicle
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
  // modalactions
  modalActions() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 报告列表
  onHandleToList(e) {
    let vin =  e.target.dataset.vin
    // netUtil.getRequest('dswx.car.list', {}, this.onStart, this.onSuccessDetail, this.onFailed)
    wx.navigateTo({
      url: "./reportlist?vin=" + vin
    })
  },
  onHandleDelCar(e) {
    let vin = e.target.dataset.vin
    this.setData({
      visibleModal: true,
      delVin: vin
    })

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
  },
  handleClickmodal({ detail }) {
    if (detail.index === 0) {
        this.setData({
          visibleModal: false
        });
    } else {
        const action = [...this.data.modalActions];
        action[1].loading = true;
  
        this.setData({
          modalActions: action
        });
        netUtil.getRequest('dswx.car.delete', { vin: this.data.delVin }, this.onStartDel, this.onSuccessDel, this.onFailed)
        // setTimeout(() => {
        //     action[1].loading = false;
        // }, 2000);
    }
  },
  onStartDel(res) {

  },
  onSuccessDel(res) {
    this.setData({
      visibleModal: false,
      modalActions: this.data.modalActions
    });
    this.data.modalActions[1].loading = false
    $Toast({
        content: '删除成功！',
        type: 'success'
    });
  }
})