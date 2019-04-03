// wxPile/pages\register/register.js
import WxValidate from '../../utils/WxValidate'
const MD5 = require('../../utils/MD5.js')
const app = getApp()
const { netUtil } = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeStatus: true,
    times: 90,
    pwdStatus: 'password',
    password: '',
    ruleForm: {
      regticket: '',
      account: '',
      authcode: '',
      password: ''
    },
    checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.regticket)
    this.setData({
      ruleForm: {
        ...this.data.ruleForm,
        regticket: options.regticket
      }
    })
    // 初始化表单验证
    this.initValidate()
  },
  
  // 网络请求 start
  onStart: function () { //onStart回调
    wx.showLoading({
      title: '正在加载',
    })
  },
  onSuccess: function (res) { //onSuccess回调
    
    wx.hideLoading();
    if (res.token) {
      wx.navigateTo({
        url: '../map/index'
      })
    } else {}
    

  },
  onFailed: function (msg) { //onFailed回调
    console.log('----', msg)
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

  },
  // 是否显示密码
  changePwdType() {
    this.setData({
      pwdStatus: this.data.pwdStatus === 'password' ? 'text' : 'password'
    })
  },
  onChangeInput(e) {
    const { detail, target } = e
    this.data.ruleForm[target.dataset.index] = detail.value
  },
  // 注册提交
  onhandleClickReg() {
    console.log(this.data.ruleForm)
    let params = this.data.ruleForm
    // params.phone = this.data.ruleForm.phone
    // if (this.data.loginType === '1') {
    //   params.code = this.data.ruleForm.code
    // } else {
    //   params.pwd = this.data.ruleForm.pwd
    // }
    params = { ...params, password: MD5.hex_md5(params.password)}
    console.log('params', params)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return
    }
    netUtil.getRequest('swx.user.rdegist', params, this.onStart, this.onSuccess, this.onFailed)
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
  // 是否同意协议
  onHandleCheckbox(e) {
    console.log(e)
  },
  handleAnimalChange({ detail = {} }) {
    console.log(console.log(detail))
      this.setData({
          checked: detail.current
      });
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
  
  /**
  * 表单-验证字段
  */
 initValidate() {

    /**
    * 4-2(配置规则)
    */
    const rules = {
      authcode: {
        required: true,
        // rangelength: [2, 6]
      },
      account: {
        required: true,
        tel: true,
      },
      regticket: {
        required: true
      },
      password: {
        required: true
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      regticket: {
        required: '没有通行证',
        rangelength: '验证码不能为空'
      },
      account: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      },
      authcode: {
        required: '验证码不能为空'
      },
      password: {
        required: '密码不能为空'
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
})