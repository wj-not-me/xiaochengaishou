// pages/personal/personal.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: {}
    userName: '',
    phoneNo: '',
    avatarUrl: ''
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
    this.setData({
      userName: wx.getStorageSync('userName'),
      phoneNo: wx.getStorageSync('phoneNo')
    });
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
   * 跳转到回收地址管理页面
   */
  showAddressManage: function() {
    app.checkLoginStatus();
    wx.navigateTo({
      url: '../address/address'
    });
  },

  /**
   * 登录
   */
  loginIn: function () {
    wx.navigateTo({
      url: '../authorize/authorize'
    });
  },

  /**
   * 登出
   */
  loginOut: function() {
    wx.navigateTo({
      url: '../account/account'
    });
  }

  

 
})