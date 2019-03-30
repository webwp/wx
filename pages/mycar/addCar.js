// wxPile/pages\mycar/addCar.js
import carData from '../../utils/car'
let car = carData['data']
console.log(car)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carId: ['', '', '', '', '', '', '', ''], // 车牌号
    focusIndex: 0, // 当前输入的位数

    // 省份
    province: [],
    provinceArr: [],
    // 字母
    letters: [],
    lettersArr: [],
    // 数字
    numArr: [],
    setNumArr: [],
    letterStatus: false,
    showRight1: false,
    showRight2: false,
    showRight3: false,
    resCar: [],
    Letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    toView: 'a'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarArr()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let t = this
    const lettersArrItem = []
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((item) => {
      lettersArrItem.push({key: item, status: true})
    })
    const numArrItem = []
    '1234567890'.split('').forEach((item) => {
      numArrItem.push({key: item, status: true})
    })
    const provinceArrItem = []
    '京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新'.split('').forEach((item) => {
      provinceArrItem.push({key: item, status: true})
    })
    this.setData({
      lettersArr: lettersArrItem,
      setNumArr: numArrItem,
      provinceArr: provinceArrItem
    })
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
  // 选择车牌位数
  focusCarId (e) {
    console.log( e.target.dataset.index)
    this.setData({
      focusIndex: e.target.dataset.index
    })
    this.setData({
      letterStatus: this.data.focusIndex !== 0
    })
  },
  
  // 按钮输入
  preeKey (e) {
    let item = e.target.dataset.index
    console.log(item)
    let arr = this.data.carId.slice()
    if (!item.status || this.data.focusIndex > 7) {
      return false
    }
    arr[this.data.focusIndex] = item.key
    if (this.data.focusIndex === 7) {
      this.responseLastCarId()
    } else {
      // this.focusIndex += 1
      this.setData({
        focusIndex: this.data.focusIndex + 1
      })
    }
    // this.carId = arr.slice()
    this.setData({
      carId: arr.slice()
    })
    this.setData({
      letterStatus: this.data.letterStatus !== 0
    })
    console.log(this.data.carId)
  },
  // 输入新能源位数时的操作
  responseLastCarId () {
    if (this.data.carId[2] !== 'D' && this.data.carId[2] !== 'F') {
      // this.focusIndex = 2
      this.setData({
        focusIndex: 2
      })
    }
  },
  openCarList() {
    this.setData({
      showRight1: !this.data.showRight1
    })
    if (this.data.resCar.length === 0) {
      this.getCarArr()
    }
  },
  toggleRight1() {
      this.setData({
          showRight1: !this.data.showRight1
      });
  },
  toggleRight2() {
      this.setData({
          showRight2: !this.data.showRight2
      });
  },
  toggleRight3() {
      this.setData({
          showRight3: !this.data.showRight3
      });
  },
  openTwoDrawer() {
    
    this.setData({
      showRight2: !this.data.showRight2
    })
  },
  openThreeDrawer() {
    
    this.setData({
      showRight3: !this.data.showRight3
    })
  },
  getCarArr() {
    let Objects = {}, t = this
    this.data.Letter.forEach((item) => {
      Objects[item] = car.filter(res => {
        return item === res.initial
      })
    })
    this.setData({
      resCar: Objects
    })
    console.log(this.data.resCar)
  },
  // 锚点定位
  onHandleAnchor(e) {
    let { target } = e
    console.log(target)
    // location.href = target.dataset.index;
    this.setData({
      toView: target.dataset.index
    })
  }
})