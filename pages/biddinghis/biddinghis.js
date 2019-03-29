// wxPile/pages\biddingInit/biddingInit.js
const app = getApp()

Page({
  data: {
    
  },
  onClickToDetail: function() {
    wx.navigateTo({
      url: '../../pages/order/orderdetail'
    })
  },
  handleClick() {
    wx.navigateTo({
      url: '../../pages/priceinfo/index'
    })
  }
})


