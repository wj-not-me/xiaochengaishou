// pages/community/community.js
const app = getApp();
import { fetchPostRequest } from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noMore: false,
    page: 0,
    pageLen: 15,
    communityList: [{
      id: 1,
      street: "嘉兴路街道",
      village: "小区名称",
      committee: "居委会",
      address: "海伦路800号"
    }],
    key: '',
    chosenId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      page: 0,
      noMore: false,
      communityList: [],
    });
    this._getList(this.data.key);
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
    this._refreshPage();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getList(this.data.key);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 根据名称、地址、街道模糊搜索小区
   * @param {*} e 
   */
  searchCommunity: function (e) {
    const key = e.detail.value;
    this.setData({
      key: key,
      noMore: false,
      page: 0,   
      communityList: []
    });
    this._getList(key);
  },

  /**
   * 选择小区
   * @param {*} e 
   */
  chooseCommunity: function (e) {
    let chosenId = e.currentTarget.dataset.id;
    app.globalData.chosenCommunity = this.data.communityList.find(e => e.id == chosenId);
    wx.navigateBack({});
  },

  /**
   * 获取小区、单位列表(分页)
   * @param {*} key 
   */
  _getList: function (key) {
    if(this.data.noMore) return false;
    let that = this;
    fetchPostRequest('/GetVillageHS', { key: key, pageSize: that.data.pageLen, pageNumber: that.data.page}).then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      let _communityList = res.data.data.list;
      that.setData({
        communityList: that.data.communityList.concat(_communityList),
        page: that.data.page + 1,
        noMore: _communityList.length < that.data.pageLen ? true : false
      });
    });
  },

  /**
   * 刷新当前页面
   */
  _refreshPage: function () {
    this.setData({
      page: 0,
      noMore: false,
      communityList: []
    });
    this._getList(this.data.key);
  }
})