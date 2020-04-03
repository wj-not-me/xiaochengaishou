//app.js
import api from '/utils/request.js';
App({
  onLaunch: function () {
    // wx.login({
    //   success: loginRes => { 
    //     wx.request({
    //       url: 'http://192.168.1.86:5042/appapi/app/LoginHS', //  
    //       method: 'POST',
    //       data: {
    //         code: loginRes.code, // 临时登录凭证   
    //         //iv: iv //                        
    //       },
    //       success: res => {
    //         wx.setStorageSync('token', res.data.token);
    //         console.log('aaaa')
    //         // res = res.data;
    //         // if (res.status == 0) {
    //         //   resolve({ 'token': res.data.token});
    //         // } else {
    //         //   reject(res.msg);
    //         // }
    //       },
    //       fail: error => { reject(error) }
    //     });
    //   } 
    // })
  },

  /**
   * 检查本地storage中是否有登录状态标识
   */
  checkLoginStatus: function () {
    let token = wx.getStorageSync('token');
    if (token) {
      wx.checkSession({ //检查session_key是否过期
        success: () => { //有效
          //从storage中获取用户信息
          if (!wx.getStorageSync('userInfo')) {
            wx.showToast({
              title: '用户缓存信息缺失',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          } 
        },
        fail: () => {//过期
          this.goLoginPageTimeOut();
        }
      })

    } else {
      this.goLoginPageTimeOut();
    }
  },

  /**
   * 跳转到登录页面
   */
  goLoginPageTimeOut: function () {
    wx.navigateTo({
      url: "/pages/authorize/authorize"
    });
  },

  /**
   * app全局数据
   */
  globalData: {
    userInfo: null,
    addressList: [],
    chosenAddressId: '',
    onlineReservationList: [],
    cityList: [],
    chosenAddress: '',
    re: false,
    chosenBin: '',
    chosenCommunity: ''
    }
})