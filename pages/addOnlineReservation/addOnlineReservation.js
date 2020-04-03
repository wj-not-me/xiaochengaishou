// pages/addOnlineReservation/addOnlineReservation.js

const app = getApp();
import { fetchPostRequest, API_BASE_URL } from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recyclingAddress: '',
    recyclingTypes:'',
    newImages: [],
    id: 0,
    status: null,
    look: false,
    toChooseAddress: false,
    toChooseTypes: false,
    weight: null,
    tips: '',
    handler: '',
    handlerPhone: '',
    picUrlHandleList: [],
    recycleHandleJson: [],
    totalPrice: '',
    timeArray: [],
    sel_time: [0, 0],
    reasonArray: ['多发了', '发错了', '不预约了', '已经预约了', '重量不达标'],
    reasonIndex: 0,
    reserveDate: '',
    reserveTime: '',
    reason: '',
    way: '',
    sel_way: 1,
    toChooseBin: false,
    recyclingBin: '',
    reSubmit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this. _initTimeArray();
    const that = this;
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '编辑回收单'
      });
      that.setData({
        id: options.id
      });
      //请求单条预约数据
      fetchPostRequest('/GetRecoveryReserveInfoHS', {id: options.id}).then(function (res) {
        if (res.data.code != 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          });
          return;
        }
        let reservation  = res.data.data;
        //console.log(reservation);
        //暂存和重新预约都显示最新价格（nowPrice）而不是历史价格（price）
        const _recyclingTypes = [];
        if(options.reSubmit || reservation.status == 1) {
          reservation.recycleTypeJson.forEach(e => {
            e.price = e.nowPrice ? e.nowPrice : 0;
            _recyclingTypes.push(e)
          });
        }else {
          reservation.recycleTypeJson.forEach(e => {
            e.price = e.price ? e.price : 0;
            _recyclingTypes.push(e);
          });
        }
        //全局变量赋值
         app.globalData.chosenAddress = { //构造地址对象
          id: reservation.userAddressId,
          name: reservation.name,
          mobile: reservation.mobile,
          provinceName: reservation.provinceName,
          cityName: reservation.cityName,
          districtName: reservation.districtName,
          subdistrictName: reservation.subdistrictName,
          committeeName: reservation.committeeName,
          communityName: reservation.communityName,
          address: reservation.address
        };
        app.globalData.chosenRecyclingTypes = _recyclingTypes;
        app.globalData.chosenBin = reservation.placeData;
        //预约时间
        let reserveDateIndex = that.data.timeArray[0].findIndex(e => e === reservation.reserveDate);
        let dateStr =  new Date().getFullYear() + '-' + ( new Date().getMonth() + 1 >=  10 ?  new Date().getMonth() + 1 : '0' + ( new Date().getMonth() + 1)) + '-' 
      +  (new Date().getDate() >=  10 ? new Date().getDate() : '0' + new Date().getDate())
        that.setData({
          [`timeArray[1]`]:  dateStr === reservation.reserveDate && new Date().getHours() >= 12 ? ['下午'] : ['上午', '下午']
        });
        let reserveTimeIndex = that.data.timeArray[1].findIndex(e => e === reservation.reserveTime);
        if(reserveDateIndex >= 0 && reserveTimeIndex >= 0) {
          that.setData({
            sel_time: [reserveDateIndex, reserveTimeIndex]
          })
        }
        //页面data赋值
        that.setData({
          status: reservation.status,
          recyclingAddress: app.globalData.chosenAddress,
          recyclingTypes: _recyclingTypes,
          newImages: reservation.picUrlList,
          weight: reservation.weight,
          tips: reservation.tips,
          handler: reservation.handler,
          handlerPhone: reservation.handlerPhone,
          picUrlHandleList: reservation.picUrlHandleList,
          recycleHandleJson: reservation.recycleHandleJson,
          totalPrice: reservation.totalPrice ? reservation.totalPrice : 0,
          reserveDate: reservation.reserveDate ? reservation.reserveDate : '',
          reserveTime: reservation.reserveTime ? reservation.reserveTime : '',
          reason: reservation.reason,
          sel_way: reservation.priceType,
          way: reservation.priceTypeName,
          recyclingBin:  reservation.reserveTime ? reservation.placeData : ''
        });
      });    
    }
    if(options.look) {
      wx.setNavigationBarTitle({
        title: '查看回收单'
      });
      this.setData({
        look: true
      });
    }

    if(options.reSubmit) {
      wx.setNavigationBarTitle({
        title: '再次预约'
      });
      this.setData({
        id: 0,
        reSubmit: true
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
    if(!this.data.id || this.data.toChooseAddress) {
      this._initRecyclingAddress();
    } 
    if(!this.data.id || this.data.toChooseTypes) {
      this._initRecyclingTypes();
    } 
    if(!this.data.id || this.data.toChooseBin) {
      this._initRecyclingBin();
    }
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
    app.globalData.chosenRecyclingTypes = '';
    app.globalData.chosenAddress = '';
    app.globalData.chosenBin = '';
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
   * 选择地址
   */
  chooseRecyclingaAddress: function() {
    this.setData({
      toChooseAddress: true
    })
    wx.navigateTo({
      url: '../address/address?toChoose=true' + '&chosenId=' + this.data.recyclingAddress.id,
    })
  },

  /**
   * 选择可回收物类型
   */
  chooseRecyclingTypes: function () {
    if(this.data.sel_way == 2 && !this.data.recyclingBin) {
      wx.showToast({
        title: '请先选择回收站场',
        icon: 'none',
        mask: true,
        duration: 1000
      });
      return false;
    }
    this.setData({
      toChooseTypes: true
    })
    wx.navigateTo({
      url: '../recyclingType/recyclingType?toChoose=' + true + '&placeId=' + (this.data.recyclingBin ? this.data.recyclingBin.id : ''),
    })
  },
  
  /**
   * 上传图片
   */
  uploadPic: function () {
    const _count = 12 - this.data.newImages.length;
    if (_count <= 0) return false;
    wx.chooseImage({
      count: _count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        });
        let uploadImgCount = 0;
        let newImages = [];
        //console.log(tempFilePaths);
        var value = wx.getStorageSync('token');
        for (let i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url:  API_BASE_URL + '/uploadHS',
            filePath: tempFilePaths[i],
            name: 'file',           
            formData: {
              token: value,
              type: 1
            },
            header: {
              "Content-Type": "multipart/form-data",
            },
            success: res => {
              let data = JSON.parse(res.data);
              //console.log(res);
              if (data.code == 0) {
                uploadImgCount++;
                newImages.push(data.data.url);
                //如果是最后一张,则隐藏等待中  
                if (uploadImgCount === tempFilePaths.length) {
                  this.setData({
                    // images: this.data.images.concat(tempFilePaths),
                    newImages: this.data.newImages.concat(newImages)
                  });
                  wx.hideToast();
                  wx.showToast({
                    title: '上传成功',
                    icon: 'none',
                    duration: 2000,
                    success: () => {}
                  });
                }
              } else {
                wx.hideToast();
                wx.showToast({
                  title: '上传失败' + data.msg,
                  icon: 'none',
                  duration: 2000,
                  success: () => { }
                });
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showToast({
                title: '上传失败' + res.errMsg,
                icon: 'none',
                duration: 2000,
                success: () => { }
              });
            }
          });
        }
      }
    })
  },

  /**
   * 操作图片
   */
  operatePic: function (e) {
    const url = e.currentTarget.dataset.url;
    let _newImages = this.data.newImages;
    const currentIndex = _newImages.indexOf(url);
    wx.showActionSheet({
      itemList: ['预览', '删除'],
      success: res => {
        if (res.tapIndex === 1) {     
          _newImages.splice(currentIndex, 1);
          this.setData({
            newImages: _newImages
          });
        } else {
          wx.previewImage({
            urls: [url]
          });
        }
      },
      fail: res => { }
    });
  },

  /**
   * 查看图片
   * @param {*} e 
   */
  previewPic: function (e) {
    wx.previewImage({
      urls: e.currentTarget.dataset.urls,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 选择交投方式
   * @param {*} e 
   */
  selectWay: function (e) {
    let labelIdx = e.currentTarget.dataset.idx;  
    app.globalData.chosenRecyclingTypes = '';  
    app.globalData.chosenBin = '';
    if(labelIdx == 1) {
      this.setData({
        sel_way: labelIdx,
        recyclingBin: '',
        recyclingTypes: ''
    });
    }else {
      this.setData({
        sel_way: labelIdx,
        sel_time: [0, 0],
        recyclingTypes: ''
    });
    }
  },

  /**
   * 选择回收站场
   * @param {*} e 
   */
  chooseRecycleBin: function () {
    this.setData({
      toChooseBin: true
    });
    wx.navigateTo({
      url: '../recycleBin/recycleBin?chosenId=' + (this.data.recyclingBin ? this.data.recyclingBin.id : ''),
    })
  },

  /**
   * 输入预估备注
   * @param {*} e 
   */
  inputTips: function (e) {
    const tips = e.detail.value;
    this.setData({
      tips: tips
    });
  },

  /**
   * 预估重量保留一位小数
   */
  formateWeight: function (e) {
    const weight = isNaN(parseFloat( e.detail.value)) ? null : parseFloat( e.detail.value).toFixed(1);
    this.setData({
      weight: weight
    });
  },

  /**
   * 选择上门时间
   * @param {*} e 
   */
  bindMultiPickerColumnChange: function (e) {
    switch (e.detail.column) {  //判断滚动的哪一列并做相应的数据处理
      case 0: 
      const reserveDate = this.data.timeArray[0][e.detail.value];
      let dateStr =  new Date().getFullYear() + '-' + ( new Date().getMonth() + 1 >=  10 ?  new Date().getMonth() + 1 : '0' + ( new Date().getMonth() + 1)) + '-' 
      +  (new Date().getDate() >=  10 ? new Date().getDate() : '0' + new Date().getDate())
      this.setData({
        [`timeArray[1]`]:  dateStr === reserveDate && new Date().getHours() >= 12 ? ['下午'] : ['上午', '下午']
      });
        break;
      case 1:
        // this.setData({
        //   [`sel_time[1]`]: e.detail.value
        // });
        break;
    }
  },

  /**
   * 确认上门时间
   * @param {*} e 
   */
  bindMultiPickerChange: function (e) {
    this.setData({
      sel_time: e.detail.value
    });
  },

  /**
   * 修改上门时间
   * @param {*} e 
   */
  changeTime: function (e) {
    const sel_time =  e.detail.value;
    this.setData({
      sel_time: sel_time
    });
    let reserveDate = this.data.timeArray[0][sel_time[0]];
    let reserveTime = this.data.timeArray[1][sel_time[1]];
    let id = this.data.id;
    fetchPostRequest('/UpdateRecoveryReserveDate', { id, reserveDate, reserveTime }).then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000,
          mask: true
        });
        return;
      }
      app.globalData.re = true;
      wx.showToast({
        title: '修改成功',
        mask: true,
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {  
            wx.navigateBack({});
          }, 2000)
        }
      });
    });

  },

  /**
   * 保存预约单
   */
  saveOnlineReservation: function (e) {
    const status = e.currentTarget.dataset.status;
    if(!this.data.recyclingAddress) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (!this.data.recyclingTypes) {
      wx.showToast({
        title: '请选择可回收物类型',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (!this.data.weight) {
      wx.showToast({
        title: '填写预估重量',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    // if (this.data.newImages.length <= 0) {
    //   wx.showToast({
    //     title: '请上传图片',
    //     icon: 'none',
    //     duration: 2000
    //   });
    //   return false;
    // }
    // wx.requestSubscribeMessage({
    //   tmplIds: ['RmPQQb_Of9mk4LN3xSB1assbH0ncUWOIc54P2QOMoLQ'],
    //   success (res) {
    //     console(res);
    //    },
    //    fail (res) {
    //     console.log("fail");
    //    }
    // })

    let id = this.data.id
    let userAddressId = this.data.recyclingAddress.id;
    let recycleTypeIdList = [];
    this.data.recyclingTypes.forEach(e => {
      recycleTypeIdList.push(e.id);
    });
    let picUrlList = this.data.newImages;
    let weight = this.data.weight;
    let tips = this.data.tips;
    let reserveDate = this.data.timeArray[0][this.data.sel_time[0]];
    let reserveTime = this.data.timeArray[1][this.data.sel_time[1]];
    let placeId = this.data.recyclingBin ? this.data.recyclingBin.id : '';
    console.log("w:"+ weight);
    let url = status == 1 ? '/AddRecoveryReserveHS' : '/SumbitRecoveryReserveHS';
    let title = status == 1 ? '暂存成功' : '提交成功';
    // let loading = status == 1 ? '暂存中' : '提交中';
    
    fetchPostRequest(url, { id, userAddressId, recycleTypeIdList, picUrlList, weight, tips, reserveDate, reserveTime, placeId }).then(function (res) {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000,
          mask: true
        });
        return;
      }
      app.globalData.re = true;
      wx.showToast({
        title: title,
        mask: true,
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {  
            wx.navigateBack({});
          }, 2000)
        }
      });
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
   * 取消预约
   */
  cancleOnlineReservation: function(e) {
    const that = this;
    const id = e.currentTarget.dataset.id;
    const reason = this.data.reasonArray[e.detail.value];
    fetchPostRequest('/CancelRecoveryReserveHS', {id, reason}).then(function (res) {
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
            wx.navigateBack({});
          }, 1000)
        }
      });
    });   
  },

  /**
   * 显示地址
   */
  _initRecyclingAddress: function () {
    //let chosenAddressId = app.globalData.chosenAddressId;
    //let addressList = app.globalData.addressList;
    const that = this;
    let recyclingAddress = app.globalData.chosenAddress;
    if (!recyclingAddress) {//从接口获取默认地址
      fetchPostRequest('/GetRecoveryAddressDefaultHS').then(function (res) {
        if (res.data.code != 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          });
          return;
        }
        that.setData({
          recyclingAddress: res.data.data.id > 0 ? res.data.data : ''
        });
      });
    }else{
      that.setData({
        recyclingAddress: recyclingAddress
      });
    }  
  },

  /**
   * 显示可回收物类型
   */
  _initRecyclingTypes: function() {
    if (app.globalData.chosenRecyclingTypes) {
      this.setData({
        recyclingTypes: app.globalData.chosenRecyclingTypes
      });    
    }
  },

  /**
   * 显示回收站场
   */
  _initRecyclingBin: function() {
    if (app.globalData.chosenBin) {
      this.setData({
        recyclingBin: app.globalData.chosenBin
      });    
    }
  },

  /**
   * 初始化上门时间
   */
  _initTimeArray: function () {
     let dateTime = new Date();
     let dateArray = [];
     // 年-月-日（yyyy-MM-dd）
     for (let i = 0; i < 15; i++) {
      dateTime = i == 0 ? dateTime : new Date(dateTime.setDate(dateTime.getDate() + 1));
      let dateStr = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1 >=  10 ? dateTime.getMonth() + 1 : '0' + (dateTime.getMonth() + 1)) + '-' 
      +  (dateTime.getDate() >=  10 ? dateTime.getDate() : '0' + dateTime.getDate())
      dateArray.push(dateStr);
    }
    this.setData({
      [`timeArray[0]`]: dateArray,
      [`timeArray[1]`]: new Date().getHours() >= 12 ? ['下午'] : ['上午', '下午']
    });
  }


})