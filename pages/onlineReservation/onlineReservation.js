// pages/onlineReservation/onlineReservation.js

const app = getApp();
const api = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStatus: 1,
    page: 0,
    pageLen: 10,
    noMore: false,
    onlineReservationList: [],
    reasonArray: ['多发了', '发错了', '不预约了', '已经预约了', '重量不达标'],
    reasonIndex: 0
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
      page: 0,
      noMore: false,
      onlineReservationList: [],
      currentStatus: app.globalData.re ? 1: this.data.currentStatus
    });
    app.globalData.re = false;
    this._getOnlineReservationList(this.data.currentStatus);
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
   this. _getOnlineReservationList(this.data.currentStatus);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 切换预约单状态
   */
  swichNav: function (e) {
    let current = e.currentTarget.dataset.current;
    this.setData({
      currentStatus: current,
      page: 0,
      noMore: false,
      onlineReservationList: [],
    });
    this._getOnlineReservationList(current);
  },

  /**
   * 新增预约
   */
  addOnlineReservation: function() {
    wx.navigateTo({
      url: '../addOnlineReservation/addOnlineReservation',
    });
  },

  /**
   * 编辑预约
   */
  editOnlineReservation: function (e) {
    console.log('editOnlineReservation')
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addOnlineReservation/addOnlineReservation?id=' + id
    });
  },

  /**
   * 再次预约
   * @param {*} e 
   */
  reOnlineReservation: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addOnlineReservation/addOnlineReservation?id=' + id + '&reSubmit=true'
    });
  },

  /**
   * 查看预约
   */
  lookOnlineReservation: function (e) {
    console.log('lookOnlineReservation')
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addOnlineReservation/addOnlineReservation?id=' + id + '&look=true'
    });
  },

  /**
   * 取消预约
   */
  cancleOnlineReservation: function(e) {
    const that = this;
    const id = e.currentTarget.dataset.id;
    const reason = this.data.reasonArray[e.detail.value];
    api.fetchPostRequest('/CancelRecoveryReserveHS', {id, reason}).then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      wx.showToast({
        title: '取消成功，已取消的回收单在‘已处理’页面中',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: () => {
          setTimeout(() => {
            that._refreshPage();
          }, 1000)
        }
      });
    });   
  },

  /**
   * 删除预约
   */
  deleteOnlineReservation: function (e) {
    const that = this;
    const id = e.currentTarget.dataset.id;
    api.fetchPostRequest('/DeleteRecoveryReserveHS', { id: id }).then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 500,
        success: () => {
          setTimeout(() => {
            that._refreshPage();
          }, 500)
        }
      });
    });   
  },

  /**
   * 获取分页数据
   */
  _getOnlineReservationList: function (s) {
    if(this.data.noMore) return false;
    let that = this;
    api.fetchPostRequest('/GetRecoveryReserveHS', { status: s, pageSize: that.data.pageLen, pageNumber: that.data.page}).then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      let _onlineReservationList = res.data.data.list;
      that.setData({
        onlineReservationList: that.data.onlineReservationList.concat(_onlineReservationList),
        page: that.data.page + 1,
        noMore: _onlineReservationList.length < that.data.pageLen ? true : false
      });
    });

    // let list = app.globalData.onlineReservappationList.filter(x => {//根据tap筛选数据
    //   return statuss.includes(parseInt(x.status));
    // } );
    // list.sort((a, b) => {
    //   return b.id - a.id;
    // });
    // let _page = this.data.page + 1;
    // let startIdx = this.data.page * this.data.pageLen;
    // let endIdx = _page * this.data.pageLen;
    // let _onlineReservationList = list.slice(startIdx, endIdx);
    // if (_onlineReservationList.length > 0) {
    //   this.setData({
    //     onlineReservationList: _onlineReservationList.concat(this.data.onlineReservationList),
    //     page: _page,
    //     noMore: _onlineReservationList.length < this.data.pageLen ? true : false
    //   });
    // } else {
    //   this.setData({
    //     noMore: true
    //   });
    // }       
  },
  /**
   * 刷新当前页面
   */
  _refreshPage: function () {
    this.setData({
      page: 0,
      noMore: false,
      onlineReservationList: []
    });
    this._getOnlineReservationList(this.data.currentStatus);
  }
})