// wxPile/pages\biddingInit/biddingInit.js
const app = getApp()

Page({
  data: {
    form: {
      serviceType: '维修服务',
      serviceMode: '到店服务'
    },
    attendSuccessImg: "",
    canvasImgUrl:'',
    src:"",
    imagesArr: [],
    visible1: false,
    visible2: false,
    serviceType: [
      {
          name: '车辆维修',
      },
      {
          name: '车辆健康检测'
      }
    ],
    serviceMode: [
      {
          name: '到店服务',
      },
      {
          name: '上门服务'
      }
    ]
  },
  // 提交按钮操作
  handleClick() {
    wx.navigateTo({
      url: '../../pages/biddinghis/biddinghis'
    })
  },
  handleOpen1 () {
    console.log('点击调处面板')
    this.setData({
      visible1: true
    });
  },
  handleOpen2 () {
    console.log('点击调处面板')
    this.setData({
      visible2: true
    });
  },
  handleClickItem1 ({ detail }) {
    const index = detail.index
    const res = this.data.serviceType[index].name
    this.setData({
      form: {
        ...this.data.form,
        serviceType: res
      },
      visible1: false
    })

  },
  handleClickItem2 ({ detail }) {
    const index = detail.index;
    const res = this.data.serviceMode[index].name
    this.setData({
      form: {
        ...this.data.form,
        serviceMode: res
      },
      visible2: false
    })
  },
  takePictures: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
     // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log('图片集合', tempFilePaths)
        that.setData({
          attendSuccessImg: tempFilePaths[0],
          imagesArr: that.data.imagesArr.concat(tempFilePaths)
        });

        // 上传图片
        //判断机型
        var model = "";
        wx.getSystemInfo({
          success: function (res) {
            var that = this;
            model = res.model;
          }
        })
        if (model.indexOf("iPhone") <= 0) {
          // that.uploadFileOpt(that.data.attendSuccessImg);
          console.log(111111)
        } else {
          drawCanvas();

        }

        // 缩放图片
        function drawCanvas() {
          const ctx = wx.createCanvasContext('attendCanvasId');
          ctx.drawImage(tempFilePaths[0], 0, 0, 94, 96);
          ctx.draw();
          that.prodImageOpt();
        }
      }
    });
  },
  // 生成图片
  prodImageOpt: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        that.setData({
          canvasImgUrl: res.tempFilePath
        });
        // 上传图片
        that.uploadFileOpt(that.data.canvasImgUrl);
      },
      complete: function complete(e) {
      }
    });
  },
  // 点击查看大图
  previewImg:function(e){
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var imagesArr = this.data.imagesArr;
    wx.previewImage({
      current: imagesArr[index],     //当前图片地址
      urls: imagesArr,               //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
  
})


