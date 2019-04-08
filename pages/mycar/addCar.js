// wxPile/pages\mycar/addCar.js
import carData from '../../utils/car'
let car = carData['data']
const { $Toast } = require('../../dist/base/index')
const app = getApp()
const { netUtil } = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choiseVehicle: '',
    choiseV: '请选择',
    addNewCar: {
      plateNumber: '',
      vehicleNumber: '',
      vin: ''
    },
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
    numArrStatus: true,
    resCar: [],
    resSeries: [],
    resModel: [],
    Letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    toView: 'a'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let t = this
    const provinceArrItem = []
    '京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新'.split('').forEach((item) => {
      provinceArrItem.push({key: item, status: true})
    })
    this.setData({
      provinceArr: provinceArrItem
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let t = this
    const lettersArrItem = []
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((item) => {
      let _bool = true
      if ( item === 'I' || item === 'O') {
        _bool = false
      } else {
        _bool = true
      }
      lettersArrItem.push({key: item, status: _bool})
    })
    const numArrItem = []
    '1234567890'.split('').forEach((item) => {
      numArrItem.push({key: item, status: true})
    })
    this.setData({
      lettersArr: lettersArrItem,
      setNumArr: numArrItem
    })

    // 处理汽车品牌
    this.getCarArr()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    netUtil.getRequest('dswx.car.brand.list', {}, this.onStartBrand, this.onSuccessBrand, this.onFailed)
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
  // 网络请求 start
  onStart: function () { //onStart回调
    wx.showLoading({
      title: '正在添加···',
    })
  },
  onSuccess: function (res) { //onSuccess回调
    wx.hideLoading()
    if (res.data.status === '10000') {
      $Toast({
        content: '添加成功',
        type: 'success'
      })
      wx.navigateBack({
        delta: 1
      })
    } else {
      $Toast({
        content: '添加失败',
        type: 'error'
      })
    }
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
      letterStatus: this.data.letterStatus !== 0,
      numArrStatus: this.data.focusIndex > 1 ? false : true
    })
    console.log(this.data.carId.join(''))
    let plateNumber = this.data.carId.join('')
    this.setData({
      addNewCar:{
        ...this.data.addNewCar,
        plateNumber: plateNumber
      }
    })
    
  },
  // 提交添加车辆信息
  handleClickSubmitAdd() {
     this.setData({
       addNewCar: {
         ...this.data.addNewCar,
         vehicleNumber: this.data.choiseVehicle
       }
     })
     let { plateNumber, vehicleNumber } = this.data.addNewCar
     if (vehicleNumber === '') {
       $Toast({
         content: '请选择车型',
         type: 'warning'
       })
       return
     }
     if (plateNumber.length !== 7) {
       $Toast({
         content: '车牌号错误',
         type: 'warning'
       })
       return
     }
     console.log(this.data.addNewCar)
     return
     netUtil.getRequest('dswx.car.create', this.data.addNewCar, this.onStart, this.onSuccessDetail, this.onFailed)

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
  openTwoDrawer(e) {
    let {carname, number} = e.target.dataset
    let params = {
      brand: number
    }
    netUtil.getRequest('dswx.car.series.list', params, this.onStartBrand, this.onSuccessSeries, this.onFailed)
    console.log('carname', carname)
    this.setData({
      choiseVehicle: '',
    })
    this.setData({
      showRight2: !this.data.showRight2,
      choiseVehicle: '',
      choiseVehicle: this.data.choiseVehicle + ' ' + carname
    })
  },
  toggleRight2() {
    this.setData({
      showRight2: !this.data.showRight2
    })
  },
  openThreeDrawer(e) {
    let { name, number } = e.target.dataset,
        params = {
          series: number
        }
    netUtil.getRequest('dswx.car.series.list', params, this.onStartBrand, this.onSuccessModel, this.onFailed)    
    this.setData({
      showRight3: !this.data.showRight3,
      choiseVehicle: this.data.choiseVehicle + ' ' + name
    })
  },
  choiseThree(e) {
    let { name, number } = e.target.dataset
    
    this.setData({
      showRight1: !this.data.showRight3,
      showRight2: !this.data.showRight3,
      showRight3: !this.data.showRight3,
      choiseVehicle: this.data.choiseVehicle + ' ' + name
    })
  },
  onStartBrand() {},
  onSuccessBrand(res) {
    let { Brand } = res.data
    this.getCarArr(Brand)
  },
  onSuccessSeries(res) {
    let { Series } = res.data
    this.setData({
      resSeries: Series
    })
  },
  onSuccessModel(res) {
    let { Model } = res.data
    this.setData({
      resModel: Model
    })
  },
  getCarArr(arr) {
    let Objects = {}, t = this, resArr = arr || car
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
  },
  // 删除车牌号
  deleteCar() {
    let index = this.data.focusIndex,
        carId = this.data.carId
    // 当前carId 下标index为空时，清空上一个值
    if (carId[index] === '') {
      carId[index-1] = ''
    } else {
      carId[index] = ''
    }
    this.setData({
      carId: carId,
      focusIndex: index === 0 ? 0 : index - 1,
      letterStatus: (index-1) === 0 ? false : true,
      numArrStatus: index-1 > 1 ? false : true
    })
    if (index-1 === 0) {
      this.setData({
        letterStatus: false
      })
    }
  }
})