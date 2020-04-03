// pages/addIncorporatedReservation/addIncorporatedReservation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [{
      id: 1,
      name: '废纸',
      childList: [{
        id: 1,
        name: '书本杂志',
		price: 5,
        picUrl: '../../images/categories/book.png'
      }, {
          id: 2,
          name: '废纸箱',
		  price: 6,
          picUrl: '../../images/categories/wastePaperBox.png'
        }, {
          id: 3,
          name: '报纸',
		  price: 7,
          picUrl: '../../images/categories/newspaper.png'
        }, {
          id: 4,
          name: '利乐包装',
		  price: 8,
          picUrl: '../../images/categories/tetraPak.png'
        }, {
          id: 5,
          name: '未被污染的杂纸',
		  price: 10,
          picUrl: '../../images/categories/unpollutedPaper.png'
        }]
    }, {
        id: 2,
        name: '废塑料',
        childList: [{
          id: 6,
          name: '塑料饮料瓶',
		  price: 1,
          picUrl: '../../images/categories/plastiDrinkBottle.png'
        }, {
          id: 7,
            name: '塑料玩具',
			price: 2,
            picUrl: '../../images/categories/plasticToy.png'
          }, {
            id: 8,
            name: '油壶油桶',
			price: 3,
            picUrl: '../../images/categories/oilerOilBarrel.png'
          }, {
            id: 9,
            name: '泡沫塑料',
			price: 4,
            picUrl: '../../images/categories/foam.png'
          }, {
            id: 10,
            name: '未被污染的杂塑料',
			price: 5,
            picUrl: '../../images/categories/unpollutedPlastic.png'
          }]
      }, {
        id: 3,
        name: '废玻璃',
        childList: [{
          id: 11,
          name: '玻璃瓶',
		  price: 11,
          picUrl: '../../images/categories/glassBottle.png'
        }, {
          id: 12,
          name: '成块玻璃',
		  price: 13,
          picUrl: '../../images/categories/glass.png'
        }, {
          id: 13,
          name: '碎玻璃单独包装',
		  price: 14,
          picUrl: '../../images/categories/shatteredGlass.png'
        }, {
          id: 14,
          name: '其他玻璃制品',
		  price: 15,
          picUrl: '../../images/categories/otherGlassProducts.png'
        }]
      }, {
        id: 4,
        name: '废金属',
        childList: [{
          id: 15,
          name: '易拉罐(压扁)',
		  price: 20,
          picUrl: '../../images/categories/cans.png'
        }, {
            id: 16,
            name: '电源线拖线板',
			price: 22,
            picUrl: '../../images/categories/powerCordExtensionBoard.png'
        }, {
            id: 17,
            name: '其他废旧金属',
			price: 23,
            picUrl: '../../images/categories/otherScrapMetal.png'
        }]
      },{
      id: 5,
      name: '废纸',
      childList: [{
        id: 24,
        name: '书本杂志',
		price: 5,
        picUrl: '../../images/categories/book.png'
      }, {
          id: 25,
          name: '废纸箱',
		  price: 6,
          picUrl: '../../images/categories/wastePaperBox.png'
        }, {
          id: 26,
          name: '报纸',
		  price: 7,
          picUrl: '../../images/categories/newspaper.png'
        }, {
          id: 27,
          name: '利乐包装',
		  price: 8,
          picUrl: '../../images/categories/tetraPak.png'
        }, {
          id: 28,
          name: '未被污染的杂纸',
		  price: 10,
          picUrl: '../../images/categories/unpollutedPaper.png'
        }]
    }, {
        id: 6,
        name: '废塑料',
        childList: [{
          id: 29,
          name: '塑料饮料瓶',
		  price: 1,
          picUrl: '../../images/categories/plastiDrinkBottle.png'
        }, {
          id: 30,
            name: '塑料玩具',
			price: 2,
            picUrl: '../../images/categories/plasticToy.png'
          }, {
            id: 31,
            name: '油壶油桶',
			price: 3,
            picUrl: '../../images/categories/oilerOilBarrel.png'
          }, {
            id: 32,
            name: '泡沫塑料',
			price: 4,
            picUrl: '../../images/categories/foam.png'
          }, {
            id: 33,
            name: '未被污染的杂塑料',
			price: 5,
            picUrl: '../../images/categories/unpollutedPlastic.png'
          }]
      }, {
        id: 7,
        name: '废玻璃',
        childList: [{
          id: 34,
          name: '玻璃瓶',
		  price: 11,
          picUrl: '../../images/categories/glassBottle.png'
        }, {
          id: 35,
          name: '成块玻璃',
		  price: 13,
          picUrl: '../../images/categories/glass.png'
        }, {
          id: 36,
          name: '碎玻璃单独包装',
		  price: 14,
          picUrl: '../../images/categories/shatteredGlass.png'
        }, {
          id: 37,
          name: '其他玻璃制品',
		  price: 15,
          picUrl: '../../images/categories/otherGlassProducts.png'
        }]
      }, {
        id: 8,
        name: '废金属',
        childList: [{
          id: 38,
          name: '易拉罐(压扁)',
		  price: 20,
          picUrl: '../../images/categories/cans.png'
        }, {
            id: 39,
            name: '电源线拖线板',
			price: 22,
            picUrl: '../../images/categories/powerCordExtensionBoard.png'
        }, {
            id: 40,
            name: '其他废旧金属',
			price: 23,
            picUrl: '../../images/categories/otherScrapMetal.png'
        }]
      },{
        id: 10,
        name: '废塑料',
        childList: [{
          id: 46,
          name: '塑料饮料瓶',
		  price: 1,
          picUrl: '../../images/categories/plastiDrinkBottle.png'
        }, {
          id: 47,
            name: '塑料玩具',
			price: 2,
            picUrl: '../../images/categories/plasticToy.png'
          }, {
            id: 48,
            name: '油壶油桶',
			price: 3,
            picUrl: '../../images/categories/oilerOilBarrel.png'
          }, {
            id: 49,
            name: '泡沫塑料',
			price: 4,
            picUrl: '../../images/categories/foam.png'
          }, {
            id: 50,
            name: '未被污染的杂塑料',
			price: 5,
            picUrl: '../../images/categories/unpollutedPlastic.png'
          }]
      }, {
        id: 11,
        name: '废玻璃',
        childList: [{
          id: 34,
          name: '玻璃瓶',
		  price: 51,
          picUrl: '../../images/categories/glassBottle.png'
        }, {
          id: 52,
          name: '成块玻璃',
		  price: 13,
          picUrl: '../../images/categories/glass.png'
        }, {
          id: 53,
          name: '碎玻璃单独包装',
		  price: 14,
          picUrl: '../../images/categories/shatteredGlass.png'
        }, {
          id: 54,
          name: '其他玻璃制品',
		  price: 15,
          picUrl: '../../images/categories/otherGlassProducts.png'
        }]
      }, {
        id: 12,
        name: '废金属',
        childList: [{
          id: 55,
          name: '易拉罐(压扁)',
		  price: 20,
          picUrl: '../../images/categories/cans.png'
        }, {
            id: 56,
            name: '电源线拖线板',
			price: 22,
            picUrl: '../../images/categories/powerCordExtensionBoard.png'
        }, {
            id: 57,
            name: '其他废旧金属',
			price: 23,
            picUrl: '../../images/categories/otherScrapMetal.png'
        }]
      },{
        id: 9,
        name: '废纸',
        childList: [{
          id: 41,
          name: '书本杂志',
      price: 5,
          picUrl: '../../images/categories/book.png'
        }, {
            id: 42,
            name: '废纸箱',
        price: 6,
            picUrl: '../../images/categories/wastePaperBox.png'
          }, {
            id: 43,
            name: '报纸',
        price: 7,
            picUrl: '../../images/categories/newspaper.png'
          }, {
            id: 44,
            name: '利乐包装',
        price: 8,
            picUrl: '../../images/categories/tetraPak.png'
          }, {
            id: 45,
            name: '未被污染的杂纸',
        price: 10,
            picUrl: '../../images/categories/unpollutedPaper.png'
          }]
      }],
    categorySelectedId:'',
    categorSelectedName: '',
    categoryGroupId: '',
    leftTotop: 0,
    pageScrollTop: 0,
    rel: false
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
  onPageScroll: function (e) {
    console.log(e);
    this.setData({
      rel: e.scrollTop >= 0
    })
  },
  /**
   * 父类子类左右联动
   */
  onSubCategoryScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }
    let scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      categorySelectedId,
      categorSelectedName,
      leftTotop,
      len = this.data.list;

      console.log('scale: ' + scale);
      console.log('deltaY: ' + e.detail.deltaY);
      console.log('scrollTop: ' + e.detail.scrollTop);
      console.log('scrollHeight: ' + e.detail.scrollHeight);
      console.log('-----------------------------');
  
 
    let list = this.data.categories;
    let index = 0;
    for (let i in list) {
      //商品的高度也是根据总体的scrow-view来算的
      var goodsHeight = 46 + list[i].childList.length * 138;
      if (scrollTop >= h - 46) {     
        categorySelectedId = list[i].id;
        categorSelectedName =  list[i].name;
        leftTotop = i > 5 ? 100 * scale * (i - 5) : 0,
        index = i;
        //break;
        // console.log('categorySelectedId: ' + categorySelectedId);
        // console.log('categorSelectedName: ' + categorSelectedName);
        console.log('leftTotop: ' + leftTotop);
        console.log('=====================================');
        
      }
      h += goodsHeight;
    }
    // console.log('category: ' + categorySelectedId);
    // console.log('+++++++++++++++++++++++++++++++++++++++++');
    this.setData({
      categorySelectedId: categorySelectedId,
      categorSelectedName: categorSelectedName,
      leftTotop: leftTotop
    });
  },

  /**
   * 选择左侧分类
   */
  onCategoryTap: function (e) {
    this.setData({
      categoryGroupId: 'scv' + e.currentTarget.dataset.id
    });
  }
})