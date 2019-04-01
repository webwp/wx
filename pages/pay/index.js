// wxPile/pages\pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payType: 1,
    current: '余额支付',
    balance: 5000,
    orderPrace: 2000
  },
  handleFruitChange({ detail = {} }) {
      this.setData({
          current: detail.value
      });
  },
  onHandleChangePayType( { target = {} } ) {
     console.log(target)
     this.setData({
       payType: parseInt(target.dataset.paytype)
     })
  },
  // 支付方法
  onHandleToOrder() {
    wx.navigateTo({
      url: '../../pages/order/order'
    })
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

  }
})