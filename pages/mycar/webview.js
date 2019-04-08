//Page Object
Page({
    data: {
       url: ''
    },
    //options(Object)
    onLoad: function(options) {
        this.setData({
            url: this.data.url + "http://www.baidu.com?sn=" + options.sn
        })
        console.log(this.data.url)
    },
    onReady: function() {
        
    },
    onShow: function() {
        
    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item) {

    }
});
  