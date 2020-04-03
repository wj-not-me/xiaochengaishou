// pages/testPay/testPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    args: {
      fee: 1,             // 支付金额，单位为分
      paymentArgs: 'A', // 将传递到功能页函数的自定义参数
      currencyType: 'USD' // 货币符号，页面显示货币简写 US$ 
    }
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

   // 支付成功的回调接口
   paymentSuccess: function (e) {
    console.log(e);
    e.detail.extraData.timeStamp // 用 extraData 传递数据，详见下面功能页函数代码
  },
  // 支付失败的回调接口
  paymentFailed: function (e) {
    console.log(e);
  }
})