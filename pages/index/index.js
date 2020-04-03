//index.js
//获取应用实例
const app = getApp();
import { fetchPostRequest } from '../../utils/request.js';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showClause: false,
    clauseData: '',
    bannerList: ''
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    let that = this;
    app.checkLoginStatus();
    //获取首页banner和契约条款内容
    fetchPostRequest('/GetRecoveryBannerHS').then( res =>  {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      let clauseData = res.data.data.data;
      let bannerList = res.data.data.list;
      //console.log(clauseData);
      this.setData({
        clauseData,
        bannerList
      });
    });  
  },
  
  onShow: function () {
    this.setData({
      showClause: wx.getStorageSync('token') && !wx.getStorageSync('agreedClause')
    });
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
  },

  /**
   * 收编人员上门回收
   */
  incorporatedReservation: function () {
    app.checkLoginStatus();
    wx.navigateTo({
      url: '../addIncorporatedReservation/addIncorporatedReservation'
    });
  },

  /**
   * 测试支付
   */
  testPay: function () {
    app.checkLoginStatus();
    wx.navigateTo({
      url: '../testPay/testPay'
    });
  },
  
  /**
   * 同意条款
   */
  agreeClause: function () {
    wx.setStorageSync('agreedClause', true);
    this.setData({
      showClause: false
    })
  },

  /**
   * 新闻页
   */
  showNews: function (e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../news/news?url=' + (url ? url : '')  
    });
  }
})