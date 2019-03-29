// wxPile/pages\report/report.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab0',
    tabType: ['检测桩', '车里眼', '小奔', '黑金刚'],
    alreadyLoadTab: ['tab0'],
    resData: [
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修',
        status: 0
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修',
        status: 0
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修',
        status: 1
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修',
        status: 1
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修',
        status: 1
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修'
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修'
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修'
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修'
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修'
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修'
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修'
      },
      {
        carNumber: '桂A 099T2',
        createTime: '2019-02-30 10:10:10',
        report: '存在风险，建议维修',
        content: '存在风险，建议维修存在风险，建议维修'
      },
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
  }
})