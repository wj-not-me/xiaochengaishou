// pages/recyclingType/recyclingType.js

const app = getApp();
import { fetchPostRequest } from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toChoose: false,
    categories: [{
      categoryId: 1,
      name: '废纸',
      subCategories: [{
        subCategoryId: 1,
        name: '书本杂志',
        picUrl: '../../images/book.png'
      }, {
          subCategoryId: 2,
          name: '废纸箱',
          picUrl: '../../images/wastePaperBox.png'
        }, {
          subCategoryId: 3,
          name: '报纸',
          picUrl: '../../images/newspaper.png'
        }, {
          subCategoryId: 4,
          name: '利乐包装',
          picUrl: '../../images/tetraPak.png'
        }, {
          subCategoryId: 5,
          name: '未被污染的杂纸',
          picUrl: '../../images/unpollutedPaper.png'
        }]
    }, {
        categoryId: 2,
        name: '废塑料',
        subCategories: [{
          subCategoryId: 6,
          name: '塑料饮料瓶',
          picUrl: '../../images/plastiDrinkBottle.png'
        }, {
          subCategoryId: 7,
            name: '塑料玩具',
            picUrl: '../../images/plasticToy.png'
          }, {
            subCategoryId: 8,
            name: '油壶油桶',
            picUrl: '../../images/oilerOilBarrel.png'
          }, {
            subCategoryId: 9,
            name: '泡沫塑料',
            picUrl: '../../images/foam.png'
          }, {
            subCategoryId: 10,
            name: '未被污染的杂塑料',
            picUrl: '../../images/unpollutedPlastic.png'
          }]
      }, {
        categoryId: 3,
        name: '废玻璃',
        subCategories: [{
          subCategoryId: 11,
          name: '玻璃瓶',
          picUrl: '../../images/glassBottle.png'
        }, {
          subCategoryId: 12,
          name: '成块玻璃',
            picUrl: '../../images/glass.png'
        }, {
          subCategoryId: 13,
          name: '碎玻璃单独包装',
            picUrl: '../../images/shatteredGlass.png'
        }, {
          subCategoryId: 14,
          name: '其他玻璃制品',
            picUrl: '../../images/otherGlassProducts.png'
        }]
      }, {
        categoryId: 4,
        name: '废金属',
        subCategories: [{
          subCategoryId: 15,
          name: '易拉罐(压扁)',
          picUrl: '../../images/cans.png'
        }, {
            subCategoryId: 16,
            name: '电源线拖线板',
            picUrl: '../../images/powerCordExtensionBoard.png'
        }, {
            subCategoryId: 17,
            name: '其他废旧金属',
            picUrl: '../../images/otherScrapMetal.png'
        }]
      }],
      chosenRecyclingTypes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    fetchPostRequest('/GetRecoveryTypesHS_New', { placeId: options.placeId }).then(function(res){
      if(res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      that.setData({
        categories: res.data.data.list
      })
    })
    if (options.toChoose) {
      this.setData({
        toChoose: options.toChoose,
        chosenRecyclingTypes: app.globalData.chosenRecyclingTypes ? app.globalData.chosenRecyclingTypes : []
      })
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
   * 选择可回收类型
   */
  chooseRecyclingType: function (e) {
    let currChosen = e.currentTarget.dataset.subcategory;
    let _chosenRecyclingTypes = this.data.chosenRecyclingTypes;
    let idx = _chosenRecyclingTypes.findIndex(function (element){
      return element.id == currChosen.id
    });
    if (idx >= 0){
      _chosenRecyclingTypes.splice(idx, 1);
    }else {
      _chosenRecyclingTypes.push(currChosen);
    }
    this.setData({
      chosenRecyclingTypes: _chosenRecyclingTypes
    });
  },

  /**
   * 确认选中可回收类型
   */
  comfirmChosenTypes: function () {
    if(this.data.chosenRecyclingTypes.length <= 0){
      wx.showToast({
        title: '请选择可回收物类型',
        icon: 'none',
        duration: 2000
      });
    } else {
      app.globalData.chosenRecyclingTypes = this.data.chosenRecyclingTypes;
      wx.navigateBack({
        
      });
    }
  },

  /**
   * 预约回收
   */
  onlineReservation: function () {
    if (this.data.chosenRecyclingTypes.length <= 0) {
      wx.showToast({
        title: '请选择可回收物类型',
        icon: 'none',
        duration: 2000
      });
    } else {
      app.globalData.chosenRecyclingTypes = this.data.chosenRecyclingTypes;
      wx.navigateTo({
        url: '../addOnlineReservation/addOnlineReservation',
      })
    }
  },
  
  /**
   * 确认选中可回收类型
   */
  comfirmChosenTypes: function () {
    if (this.data.chosenRecyclingTypes.length <= 0) {
      wx.showToast({
        title: '请选择可回收物类型',
        icon: 'none',
        duration: 2000
      });
    } else {
      app.globalData.chosenRecyclingTypes = this.data.chosenRecyclingTypes;
      wx.navigateBack({

      });
    }
  }

})