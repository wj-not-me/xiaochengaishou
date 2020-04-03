// pages/recycle/recycle.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 预约回收（线上预约）
   */
  onlineReservation: function () {
    app.checkLoginStatus();
    wx.navigateTo({
      url: '../onlineReservation/onlineReservation'
    });
  },

  /**
   * 电话预约
   */
  phoneReservation: function () {
    app.checkLoginStatus();
    wx.navigateTo({
      url: '../phoneReservation/phoneReservation'
    });
  },

  /**
   * 可回收类型
   */
  recyclingType: function () {
    app.checkLoginStatus();
    wx.navigateTo({
      url: '../recyclingType/recyclingType'
    });
  },

  /**
   * 指导价格
   */
  guidingPrice: function () {
    app.checkLoginStatus();
    wx.navigateTo({
      url: '../guidingPrice/guidingPrice'
    });
  }

})