//app.js
import {fetchPostRequest, API_BASE_URL} from './utils/request';
App({
  onLaunch: function () {
    // const login = new Promise((resolve, reject) => {
    //   wx.login({
    //     success: loginRes => { 
    //       wx.request({
    //         url:  API_BASE_URL + '/LoginHS', 
    //         method: 'POST',
    //         data: {
    //           code: loginRes.code, // 临时登录凭证                          
    //         },
    //         success: res => {
    //           wx.setStorageSync('token', res.data.data.token);
    //           resolve(res.data.data.token);
    //         },
    //         fail: error => { reject(error) }
    //       });
    //     } 
    //   })
    // });

    // login.then(res => {
    //   getCityList(res);
    // });

    // //获取省-市-区-街道
    // const getCityList = function (token) {
    //   fetchPostRequest('/GetRegionHS').then(res => {
    //     if (res.data.code != 0) {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none',
    //         duration: 3000
    //       });
    //       return;
    //     }
    //     wx.setStorageSync('cityList', res.data.data.list);
    //   });
    // };
   
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
          if (!wx.getStorageSync('phoneNo')) {
            wx.showToast({
              title: '用户缓存信息缺失',
              icon: 'none',
              duration: 1500,
              mask: true
            });
            this.goLoginPageTimeOut();
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