// pages/authorize/authorize.js

import { fetchPostRequest, API_BASE_URL } from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

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

  /**
   * 获取手机号
   */
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      const iv = e.detail.encryptedData
      // wx.request({
      //   url: 'http://localhost/index/users/decodePhone',
      //   data: {
      //     encryptedData: e.detail.encryptedData,
      //     iv: e.detail.iv,
      //     sessionKey: that.data.session_key,
      //     uid: "",
      //   },
      //   method: "post",
      //   success: function (res) {
      //     console.log(res);
      //   }
      // })
    }
  },

  /**
   * 登录
   */
  doLogin: function () {
    const that = this;
    new Promise(function (resolve, reject){
      wx.login({
        success: loginRes => { resolve(loginRes);} 
      })
    }).then(function (loginRes){
      return new Promise(function (resolve, reject) {
        wx.getUserInfo({
          withCredentials: true, // 非必填, 默认为true
          success: infoRes => { resolve({loginRes, infoRes})},
          fail: error => { reject(error);}
        })
      })   
      }).then(function ({ loginRes, infoRes }) {
        return new Promise(function (resolve, reject) {
          wx.request({
            url: API_BASE_URL + '/LoginHS',
            method: 'POST',
            data: {
              code: loginRes.code // 临时登录凭证                           
            },
            success: res => {
              res = res.data;
              if (res.status == 0) {
                resolve({ 'token': res.data.token, 'userInfo': infoRes.userInfo });
              } else {
                reject(res.msg);
              }
            },
            fail: error => { reject(error) }
          });
        })
      }).then(function ({ token, userInfo }) {
        return new Promise(function (resolve, reject) {
          wx.setStorageSync('token', token);
          wx.setStorageSync('userInfo', userInfo);
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                wx.navigateBack({ delta: 1 });            
              }, 700);
              resolve(token);                      
            }
          });         
        })      
      }).then(function (token) {//获取省、市、区、街道四级数据
        if (!wx.getStorageSync('cityList')) {
          fetchPostRequest('/GetRegionHS').then(res => {
            if (res.data.code != 0) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000
              });
              return;
            }
            wx.setStorageSync('cityList', res.data.data.list);
          });
        }
      }).catch(function(error){
        that.checkUserInfoPermission(error.errMsg || error);
      }).finally(function(){
        console.log('aaaaa');
      })
  },

  /**
   * 检查用户信息授权设置
   */
  checkUserInfoPermission: function (error) {
    const that = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '授权失败',
            content: '您已拒绝使用微信号登录该小程序',
            showCancel: false,
            confirmText: '知道了',
            success: res => {  
              console.log(res);   
            }
          })
        }
        else {
          that.showInfo(error);
        }
      },
      fail: error => {
        console.log(error);
      }
    });
  },

  /**
 * 封装 wx.showToast 方法
 * @param {String} info 
 * @param {String} icon 
 */
  showInfo: function (info = 'error', icon = 'none') {
    wx.showToast({
      title: info.errMsg || info,
      icon: icon,
      duration: 1500,
      mask: true
    });
  }
})