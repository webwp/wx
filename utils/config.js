const baseConfig = {
    baseUrl: 'http://192.168.0.18:5007/service/v1',	
   
    // method 请求接口
    method: {
        // 用户注册
        DSWX_USER_REGIST: 'dswx.user.regist',
        // 登录
        DSWX_USER_LOGIN: 'dswx.user.login',
        // 检测报告绑定车辆
        DSWX_REPORT_BINDWITHCAR: 'dswx.report.bindWithCar',
    }
}

export default baseConfig