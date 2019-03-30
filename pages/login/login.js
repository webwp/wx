// pages/login/login.js
import WxValidate from '../../utils/WxValidate'
var app = getApp()
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
      account: '',
      auth:'',
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
        regticket: options.regticket
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
    // params.phone = this.data.ruleForm.phone
    // if (this.data.loginType === '1') {
    //   params.code = this.data.ruleForm.code
    // } else {
    //   params.pwd = this.data.ruleForm.pwd
    // }
    console.log('params', params)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return
    }

    // 验证通过 提交数据到后台
    wx.showToast({
      title: '提交成功！！！！'
    })
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
  // 获取验证码
  onClickGetCode() {
    this.setData({
      codeStatus: false
    })
    const t = this
    let index = setInterval(function() {
      t.setData({
        times: t.data.times - 1
      })
      if (t.data.times<=0) {
        clearInterval(index)
        t.setData({
          times: 90,
          codeStatus: true
        })
      }
      
    }, 1000)
  }
})