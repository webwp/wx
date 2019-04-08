// wxPile/pages\checklist/index.js
const app = getApp()
const { netUtil } = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageRequest: {
      method: 'dswx.site.list',
      lng: 0,
      lat: 0,
      city: '',
      page: 1,
      size: 10
    },
    list: [
      {
        longitude: 108.254364,
        latitude: 22.854506,
        address: '广西壮族自治区南宁市西乡塘区科创路金奔腾大夏b座25楼',
        distance: '700'
      },
      {
        longitude: 108.254364,
        latitude: 22.854506,
        address: '广西壮族自治区南宁市西乡塘区科创路金奔腾大夏b座25楼',
        distance: '700'
      },
      {
        longitude: 108.254364,
        latitude: 22.854506,
        address: '广西壮族自治区南宁市西乡塘区科创路金奔腾大夏b座25楼',
        distance: '700'
      }
    ]
  },
  // 点击开始导航
  onClickHandlerStartMap (e) {
    let item = e.target.dataset.item
    // this.setData({
    //   isShow: !this.data.isShow
    // })
    if (item.latitude && item.longitude) {
      wx.openLocation({
        latitude: item.latitude,
        longitude: item.longitude,
        scale: 28,
        name: item.adress,
        address: item.adress
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  获取url 参数
    let getParams = JSON.parse(options.current);
    this.setData({
      pageRequest: {
        ...this.data.pageRequest,
        ...getParams
      }
    })
    console.log('请求后端参数', this.data.pageRequest)
    netUtil.postRequest('dswx.site.list', this.data.pageRequest, this.onStart, this.onSuccess, this.onFailed)
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
      list: res.data.List
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