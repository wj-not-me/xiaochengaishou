// pages/phoneReservation/phoneReservation.js

import { fetchPostRequest } from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    noMore: false,
    addressPhoneNoArray: [{
        id: 1,
        picUrl: '../../images/glass.png',
        districtName: '虹口区',
        content: '废纸, 废塑料, 废金属, 废玻璃等',
        phone: '18521756144'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    fetchPostRequest('/GetRecoveryContact').then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      that.setData({
        addressPhoneNoArray: res.data.data.list
      })
    });   
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
   * 拨打电话
   */
  tel: function(e) {
    const telNo = e.currentTarget.dataset.telno;
    wx.makePhoneCall({
      phoneNumber: telNo
    })
  }
})