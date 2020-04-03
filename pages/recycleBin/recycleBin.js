// pages/recycleBin/recycleBin.js
const app = getApp();
import { fetchPostRequest } from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 2,
    noMore: true,
    binList: [],
    key: '',
    chosenId: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getList(this.data.currentType, this.data.key);
    this.setData({
      chosenId: isNaN(parseInt(options.chosenId)) ? 0 : parseInt(options.chosenId)
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
    this._getList(this.data.currentType, this.data.key);
    wx.stopPullDownRefresh();
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
   * 切换回收站场类型
   */
  swichNav: function (e) {
    let current = e.currentTarget.dataset.current;
    this.setData({
      currentType: current,
      binList: [],
      key: ''
    });
    this._getList(current, this.data.key);
  },

  /**
   * 根据名称、地址、街道模糊搜索回收站场
   */
  searchBin: function (e) {
    const key = e.detail.value;
    this.setData({
      key: key
    });
    this._getList(this.data.currentType, key);
  },

   /**
   * 选择回收站场
   */
  chooseBin: function (e) {
    let chosenId = e.currentTarget.dataset.id;
    app.globalData.chosenBin = this.data.binList.find(e => e.id == chosenId);
    wx.navigateBack({});
  },

  /**
   * 获取分页数据
   */
  _getList: function (type, key) {
    let that = this;
    fetchPostRequest('/GetRecycleBinHS', { priceType: type, key: key}).then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      let binList = res.data.data.list;
      that.setData({
        binList: binList
      });
    });
  }

})