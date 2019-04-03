// pages/login/login.js
import WxValidate from '../../utils/WxValidate'
var app = getApp()
const { netUtil } = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeStatus: true,
    times: 90,
    loginType: '1',
    registerOptions: {
      verifyCode: false,
      telephone: false,
      password: false
    },
    boxPosition: '',
    pwdStatus: 'password',
    password: '',
    ruleForm: {
      regticket: '',
      account: '18007803076',
      auth:'123123',
      type:'sms'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('app.globalData.netUtil', app.globalData.netUtil)
    // 初始化表单验证
    this.initValidate()
    this.setData({
      ruleForm: {
        ...this.data.ruleForm,
        regticket: options.regticket || "xxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    })
  },
  onShow () {
    console.log('loginOnShow', this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      boxPosition: this.data.boxPosition = "msTransform: translateX("+ (this.data.loginType === '1' ? 0 : '-70vw') +"); webkitTransform: translateX("+ (this.data.loginType === '1' ? 0 : '-70vw') +"); transform: translateX("+ (this.data.loginType === '1' ? 0 : '-70vw') +")"
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
  submitForm() {
    console.log(this.data.ruleForm)
    const params = this.data.ruleForm
    console.log('params', params)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return
    }
    
    netUtil.getRequest('dswx.user.login', params, this.onStart, this.onSuccess, this.onFailed)
    // 验证通过 提交数据到后台
    // wx.showToast({
    //   title: '提交成功！！！！'
    // })
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  switchType (e) {
    let val = e.target.dataset.index,
        t = this
    if (this.data.loginType === val) {
      return false
    }
    Object.keys(this.data.ruleForm).forEach((item, index) => {
      if (item !== 'regticket')
      t.data.ruleForm[item] = ''
    })
    this.setData({
      loginType: val,
      ruleForm: {
        ...this.data.ruleForm,
        type: val === 1 ? 'sms' : 'pwd'
      }
    })
    this.setData({
      boxPosition: "msTransform: translateX("+ (this.data.loginType === '1' ? 0 : '-70vw') +"); webkitTransform: translateX("+ (this.data.loginType === '1' ? 0 : '-70vw') +"); transform: translateX("+ (this.data.loginType === '1' ? 0 : '-70vw') +")"
    })
    console.log(this.data.boxPosition)
  },
  // 是否显示密码
  changePwdType() {
    this.setData({
      pwdStatus: this.data.pwdStatus === 'password' ? 'text' : 'password'
    })
    console.log(this.data.ruleForm.auth)
  },
  onChangeInput(e) {
    const { detail, target } = e
    this.data.ruleForm[target.dataset.index] = detail.value
  },
  /**
  * 表单-验证字段
  */
  initValidate() {

    /**
    * 4-2(配置规则)
    */
    const rules = {
      auth: {
        required: true,
        // rangelength: [2, 6]
      },
      account: {
        required: true,
        tel: true,
      },
      regticket: {
        required: true
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      regticket: {
        required: '通行证不能为空',
        rangelength: '验证码不能为空'
      },
      account: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      },
      auth: {
        required: '密码或验证码不能为空'
      }
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
    /**
    * 也可以自定义验证规则
    */
    this.WxValidate.addMethod('assistance', (value, param) => {
      return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    }, '请勾选 《金奔腾通行证服务》')
  },
  // 验证码返回值
  onSuccessAuth(res) {
     wx.hideLoading()
     if (res.sendInterval > 0) {
        this.setData({
          codeStatus: false,
          times: res.sendInterval
        })
        
        const t = this
        let index = setInterval(function() {
          t.setData({
            times: t.data.times - 1
          })
          if (t.data.times<=0) {
            clearInterval(index)
            t.setData({
              codeStatus: true
            })
          }
        }, 1000)
     }
  },
  // 获取验证码
  onClickGetCode() {
    console.log('diu', this.data.ruleForm)
    if (this.data.ruleForm.account === '') {
      wx.showModal({
        title: '提示',
        content: '手机号码不能为空',
        success(res) {
          return
        }
      })
    } else {
      let params = {
        regticket: this.data.ruleForm.regticket,
        account: this.data.ruleForm.account,
        type: 'regist'
      }
      netUtil.getRequest('dswx.authcode.send', params, this.onStart, this.onSuccessAuth, this.onFailed)
    }
  },
  
  // 网络请求 start
  onStart: function () { //onStart回调
    wx.showLoading({
      title: '正在加载',
    })
  },
  onSuccess: function (res) { //onSuccess回调
    console.log('onSuccess', res)
    wx.hideLoading();
    if (res.token) {
      wx.navigateTo({
        url: '../map/index'
      })
    } else {}
    

  },
  onFailed: function (msg) { //onFailed回调

    wx.hideLoading()
    if (msg) {
      console.log('onFailed', msg)
      setTimeout(function(){
        wx.showToast({
          title: msg.errMsg,
          icon: 'none'
        })
      }, 500)
    }
  }
  // 网络请求 end
})