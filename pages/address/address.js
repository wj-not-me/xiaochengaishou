// pages/address/address.js

const app = getApp();
const api = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    toChoose: false,
    chosenId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.toChoose) {
      this.setData({
        toChoose: options.toChoose,
        chosenId: isNaN(parseInt(options.chosenId)) ? 0 : parseInt(options.chosenId)
      });
    }   
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
    this._refreshPage();
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
   * 新增地址
   */
  addAddress: function () {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },

  /**
   * 选择地址
   */
  chooseAddress: function (e) {
    let chosenId = e.currentTarget.dataset.id;
    app.globalData.chosenAddress = this.data.addressList.find(e => e.id == chosenId);
    wx.navigateBack({
      
    });
  },

  /**
   * 编辑地址
   */
  editAddress: function (e) {
    let addressId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addAddress/addAddress?id=' + addressId,
    })
  },

  /**
   * 删除地址
   */
  deleteAddress: function (e) {
    const that = this;
    const id = e.currentTarget.dataset.id;
    api.fetchPostRequest('/DeleteRecoveryAddressHS', { id: id }).then(function (res) {
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
   * 刷新页面
   */
  _refreshPage: function (e) {
    const that = this;
    api.fetchPostRequest('/GetRecoveryAddressHS').then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      that.setData({
        addressList: res.data.data.list
      })
    });
  }
})