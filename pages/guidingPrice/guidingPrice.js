// pages/guidingPrice/guidingPrice.js

import { fetchPostRequest } from '../../utils/request.js';
import { formatTime } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNotice: true,
    updateTime: formatTime(new Date()),
    gudingPriceList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    fetchPostRequest('/GetRecoveryTypesHS').then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      console.log(res.data.data.list);
      that.setData({
        gudingPriceList: res.data.data.list
      })
    });   
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
   * 关闭提示框
   */
  closeNotice: function() {
    this.setData({
      showNotice: false
    });
  }
})