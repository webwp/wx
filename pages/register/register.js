// wxPile/pages\register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwdStatus: 'password',
    password: ''
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
  // 是否显示密码
  changePwdType() {
    this.setData({
      pwdStatus: this.data.pwdStatus === 'password' ? 'text' : 'password'
    })
  },
  onChangeInput(e) {
    const { detail } = e
    this.setData({
      password: detail.value
    })
  }
})