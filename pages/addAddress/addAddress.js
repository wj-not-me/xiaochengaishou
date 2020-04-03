// pages/addAddress/addAddress.js

const app = getApp();
const api = require('../../utils/request.js');
//引入SDK核心类
import QQMapWX from '../../libs/qqmap-wx-jssdk.min'
var qqmapsdk = new QQMapWX({
  key: 'TLQBZ-PZ5L3-4CL3H-Y5XBZ-WV7NE-JIBRO'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedAddressLabel: 0,
    recycleLoaction: '',
    addressId: '',
    model: {
      id: '',
      name: '',
      mobile: '',
      provinceCode: '',
      cityCode:'',
      districtCode: '.1.7.',
      subdistrictCode: '',
      committeeName: '',
      communityName: '',
      address: ''
    },
    // sel_addressLabel: '',
    // sel_address: '',
    addressList: [],
    cityArray: [[], [], [], []],
    distinctArray: [[], []],
    sel_citiesIndex: [0, 0, 0, 0],
    sel_distinctIndex: [0, 0],
    old_sel_distinctIndex: [0, 0],
    chosenCommunityId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '编辑地址'
      });
      this.setData({
        addressId: options.id
      });
      this._initModel(options.id);
    } else {
      this._initCityData();
       // 实例化API核心类
      qqmapsdk.reverseGeocoder({
        success: res => {
          if (res.status === 0)
            this.setData({
              [`model.address`]:res.result.address        
            });
          else console.log(res.message);
        },
        fail: error => {
          console.log(error)
        }
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
    this._initCommunity();
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
    app.globalData.chosenCommunity = '';
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
   * 选择地址标签
   */
  // selectAddressLabel: function (e) {
  //   let labelIdx = e.currentTarget.dataset.idx;
  //   this.setData({
  //     sel_addressLabel: labelIdx
  //   });
  // },

  /**
   * 选择回收地址
   */
  // chooseLocation: function () {
    
  //   wx.chooseLocation({
  //     success: res => {  
  //       this.setData({
  //         sel_address: res.name
  //       });
  //     },
  //   })
  // },

  /**
   * 列滚动
   */
  bindMultiPickerColumnChange: function (e) {
    let selectedIndex = e.detail.value;  //滚动到哪一项
    let array = this.data.addressList;
    let cityArray = this.data.cityArray;
    let list1 = []; //存放第二列数据，即市的列
    let list2 = []; //存放第三列数据，即区的列
    let list3 = []; //存放第四列数据，即街道的列

    let sel_citiesIndex = [];
    let provinceId = this.data.sel_citiesIndex[0];  //选中的省索引
    let cityIndex = this.data.sel_citiesIndex[1];  //选中的市索引
    let areaIndex = this.data.sel_citiesIndex[2];  //选中的区索引 

    switch (e.detail.column) {  //判断滚动的哪一列并做相应的数据处理
      case 0: //滚动第一列，即省的那一列
        for (let i = 0, len = array[selectedIndex].childList.length; i < len; i++) { //存入省下面的市
          list1.push({
            name: array[selectedIndex].childList[i].name,
            code: array[selectedIndex].childList[i].code
          });
        }
        for (let j = 0, len = array[selectedIndex].childList[0].childList.length; j < len; j++) { //存入市下面的区
          list2.push({
            name: array[selectedIndex].childList[0].childList[j].name,
            code: array[selectedIndex].childList[0].childList[j].code
          });
        }  
        for (let k = 0, len = array[selectedIndex].childList[0].childList[0].childList.length; k < len; k++) { //存入市下面的街道
          list3.push({
            name: array[selectedIndex].childList[0].childList[0].childList[k].name,
            code: array[selectedIndex].childList[0].childList[0].childList[k].code
          });
        }         
        sel_citiesIndex = [selectedIndex, 0, 0, 0];  //记录索引
        break;
      case 1:  //滚动第二列，即市的那一列
        list1 = cityArray[1]; 
        for (let i = 0, len = array[provinceId].childList[selectedIndex].childList.length; i < len; i++) {//存入市下面的区
          list2.push({
            name: array[provinceId].childList[selectedIndex].childList[i].name,
            code: array[provinceId].childList[selectedIndex].childList[i].code
          });
        }
        for (let j = 0, len = array[provinceId].childList[selectedIndex].childList[0].childList.length; j < len; j++) {//存入区下面的街道
          list3.push({
            name: array[provinceId].childList[selectedIndex].childList[0].childList[j].name,
            code: array[provinceId].childList[selectedIndex].childList[0].childList[j].code
          });
        }
        sel_citiesIndex = [provinceId, selectedIndex, 0, 0];  //记录索引
        break;
      case 2: //滚动第三列，即区的那一列
        list1 = cityArray[1]; 
        list2 = cityArray[2];
        for (let i = 0, len = array[provinceId].childList[cityIndex].childList[selectedIndex].childList.length; i < len; i++) {//存入区下面的街道
          list3.push({
            name: array[provinceId].childList[cityIndex].childList[selectedIndex].childList[i].name,
            code: array[provinceId].childList[cityIndex].childList[selectedIndex].childList[i].code
          });
        }
        sel_citiesIndex = [provinceId, cityIndex, selectedIndex, 0];  //记录索引
        break;
      case 3: //滚动第四列，即街道的那一列
        list1 = cityArray[1]; //市和区的数据都需要更新
        list2 = cityArray[2];
        list3 = cityArray[3];
        sel_citiesIndex = [provinceId, cityIndex, areaIndex, selectedIndex];  //记录索引
        break;
     
    }
    this.setData({
      [`cityArray[1]`]: list1,//重新赋值第二列数组，即联动了市
      [`cityArray[2]`]: list2,//重新赋值第三列数组，即联动了区
      [`cityArray[3]`]: list3,//重新赋值第三列数组，即联动了街道
      sel_citiesIndex: sel_citiesIndex,//更新索引
    });
  },

  /**
   * 列滚动
   */
  bindMultiPickerColumnChange2: function (e) {
    let selectedIndex = e.detail.value;  //滚动到哪一项
    let array = this.data.addressList;
    let distinctArray = this.data.distinctArray;
    let list1 = []; //存放第二列数据，即街道的列
    let sel_distinctIndex = [];
    let areaIndex = this.data.sel_distinctIndex[0];  //选中的区索引
    
    switch (e.detail.column) {  //判断滚动的哪一列并做相应的数据处理
      case 0: //滚动第一列，即区的那一列
      for (let i = 0, len = array[0].childList[0].childList[selectedIndex].childList.length; i < len; i++) {//存入区下面的街道
        list1.push({
          name: array[0].childList[0].childList[selectedIndex].childList[i].name,
          code: array[0].childList[0].childList[selectedIndex].childList[i].code
        });
      }
      sel_distinctIndex = [selectedIndex, 0];  //记录索引
      break;
      case 1:  //滚动第二列，即街道的那一列
        list1 = distinctArray[1];
        sel_distinctIndex = [areaIndex, selectedIndex];  //记录索引
        break;
    }
    this.setData({
      [`distinctArray[1]`]: list1,//重新赋值第二列数组，即联动了街道
      sel_distinctIndex: sel_distinctIndex//更新索引
    });
  },

  /**
   * 确认选择
   * @param {*} e 
   */
  bindMultiPickerChange: function (e) {
    this.setData({
      sel_distinctIndex: e.detail.value,
      old_sel_distinctIndex: e.detail.value
    })
  },

  /**
   * 取消选择
   * @param {*} e 
   */
  bindMultiPickerCancel: function () {
    this.setData({
      sel_distinctIndex: this.data.old_sel_distinctIndex
    })
  },

 /**
  * 验证预约人输入（2-25字符之间，只能输入中文、英文和数字）
  * @param {*} e 
  */
 checkName: function (e) {
    const name = e.detail.value;
    const re = /^[\u4E00-\u9FA5A-Za-z0-9]{2,25}$/;
    if(!re.test(name)) {
      this.showInfo('预约人姓名长度在2-25个字符之间, 且只能包含只能输入中文、英文和数字');
      this.setData({
        [`model.name`]: ''
      })
    }
 },
 
 /**
  * 验证手机号码
  * @param {*} e 
  */
 checkNumber: function (e) {
    const number = e.detail.value;
    const re = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))[0-9]{8}$/;
    if(!re.test(number)) {
      this.showInfo('请输入正确的手机号');
      this.setData({
        [`model.mobile`]: ''
      });
    }
 },

 /**
  * 选择小区
  */
 chooseCommunity: function () {
  wx.navigateTo({
    url: '../community/community?chosenId=' + this.data.chosenCommunityId
  });
 },

 /**
  * 验证详细地址（5-120字符之间）
  * @param {*} e 
  */
 checkAddress: function (e) {
  const address = e.detail.value;
  const re = /^.{5,120}$/;
  if(!re.test(address)) {
    this.showInfo('详细地址长度在5-120个字符之间');
    this.setData({
      [`model.address`]: ''
    })
  }
},

  /**
   * 表单提交
   */
  formSubmit: function (e) {
    let address = e.detail.value;
    if (!this._validateForm(address)){
      return false;
    }
    let title = address.id > 0 ? '修改成功' : '新增成功';
    let url = address.id > 0 ? '/EditRecoveryAddressHS' : '/AddRecoveryAddressHS';
    api.fetchPostRequest(url, address).then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          mask: true,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      wx.showToast({
        title: title,
        mask: true,
        icon: 'success',
        duration: 20000,
        success: () => {
          wx.navigateBack({});
          // setTimeout(() => {
            
          // }, 20000)
        }
      });
    });
  },

  /**
   * 表单验证
   */
  _validateForm: function (address) {

    if(!(/^[\u4E00-\u9FA5A-Za-z0-9]{2,25}$/.test(address.name))) {
      this.showInfo('预约人姓名长度在2-25个字符之间, 且只能包含只能输入中文、英文和数字');
     return false;
    }

    if (!address.name) {
      this.showInfo('请填写预约人');
      return false;
    }

    if(!(/^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))[0-9]{8}$/.test(address.mobile))) {
      this.showInfo('请输入正确的手机号');
      return false;
    }

    if (!address.mobile) {
      this.showInfo('请填写手机号');
      return false;
    }
    if (!address.provinceCode || !address.cityCode || !address.districtCode || !address.subdistrictCode) {
      this.showInfo('请选择正确的回收地址');
      return false;
    }
    // if (!address.committeeName) {
    //   this.showInfo('请填写所属居委会');
    //   return false;
    // }
    // if (!address.communityName) {
    //   this.showInfo('请填写所属小区');
    //   return false;
    // }
    if(!(/^.{5,120}$/.test(address.address))) {
      this.showInfo('详细地址长度在5-120个字符之间');
      return false;
    }
    if (!address.address) {
      this.showInfo('请填写详细地址');
      return false;
    }
    return true;
  },

  /**
    * 封装 wx.showToast 方法
    * @param {String} info 
    * @param {String} icon 
    */
  showInfo: function (info = 'error', icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true
    });
  },

  /**
   * 初始化小区
   */
  _initCommunity: function () {
    if(app.globalData.chosenCommunity) {
      this.setData({
        [`model.communityName`]: app.globalData.chosenCommunity.village,
        [`model.address`]: app.globalData.chosenCommunity.address,
        chosenCommunityId: app.globalData.chosenCommunity.id
      });  
    }
  },

  /**
   * 获取编辑数据
   */
  _initModel: function (id) {
    const that = this;
    let _model = {
      id: '',
      name: '',
      mobile: '',
      provinceCode: '',
      cityCode: '',
      districtCode: '',
      subdistrictCode: '',
      committeeName: '',
      communityName: '',
      address: ''
    };
    api.fetchPostRequest('/GetRecoveryAddressInfoHS', {id: id}).then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        return;
      }
      //console.log(res);
      that.setData({
        model: res.data.data
      });

    }).then(function (res) {
      that._initCityData();
    }); 
  },

  /**
   * 获取省市区
   */
  _initCityData:function (e) {
    const that = this;
    setCities(wx.getStorageSync('cityList')); 
    function setCities (res) {
      let array = res;
      let cityArray = [[], [], [], []];  //选择器数据
      let distinctArray = [[],[]]; //区和街道
      let provinceId = 0;  //选中的省索引
      let cityIndex = 0;  //选中的市索引
      let areaIndex = 0;  //选中的区索引 
      let streetIndex = 0;  //选中的区索引 
      for (let i = 0, len = array.length; i < len; i++) {//存入省
        cityArray[0].push({
          name: array[i].name,
          code: array[i].code
        });
      }
      const provinceCode = that.data.model.provinceCode;
      provinceId = that.data.model.provinceCode ? cityArray[0].findIndex(e => e.code == provinceCode) : 0;
      for (let j = 0, len = array[provinceId].childList.length; j < len; j++) {//存入市，默认关联第一个省
        cityArray[1].push({
          name: array[provinceId].childList[j].name,
          code: array[provinceId].childList[j].code
        });
      }
      const cityCode = that.data.model.cityCode;
      cityIndex = that.data.model.cityCode ? cityArray[1].findIndex(e => e.code == cityCode ) : 0;
      for (let k = 0, len = array[provinceId].childList[cityIndex].childList.length; k < len; k++) {//存入区，默认关联第一个省的第一个市
        cityArray[2].push({
          name: array[provinceId].childList[cityIndex].childList[k].name,
          code: array[provinceId].childList[cityIndex].childList[k].code
        });
        distinctArray[0].push({
          name: array[provinceId].childList[cityIndex].childList[k].name,
          code: array[provinceId].childList[cityIndex].childList[k].code
        });
      }
      const districtCode = that.data.model.districtCode;
      areaIndex = that.data.model.districtCode ? cityArray[2].findIndex(e => e.code == districtCode ) : 0;
      for (let m = 0, len = array[provinceId].childList[cityIndex].childList[areaIndex].childList.length; m < len; m++) {//存入街道，默认关联第一个省的第一个市的第一个区
        cityArray[3].push({
          name: array[provinceId].childList[cityIndex].childList[areaIndex].childList[m].name,
          code: array[provinceId].childList[cityIndex].childList[areaIndex].childList[m].code
        });
        distinctArray[1].push({
          name: array[provinceId].childList[cityIndex].childList[areaIndex].childList[m].name,
          code: array[provinceId].childList[cityIndex].childList[areaIndex].childList[m].code
        });
      }
      const subdistrictCode = that.data.model.subdistrictCode;
      streetIndex = that.data.model.subdistrictCode ? cityArray[3].findIndex(e => e.code == subdistrictCode) : 0;
      that.setData({
        addressList: res,
        cityArray: cityArray,
        sel_citiesIndex: [provinceId, cityIndex, areaIndex, streetIndex],
        distinctArray: distinctArray,
        sel_distinctIndex: [areaIndex, streetIndex],
        old_sel_distinctIndex: [areaIndex, streetIndex]
      });
    }
  }
})