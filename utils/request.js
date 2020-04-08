const API_BASE_URL = 'http://192.168.1.86:5042' + '/appapi/app'; //https://hths.chi4rec.com.cn
 
/**
 * 简单封装POST请求
 * url: 请求地址
 * data: 请求内容
 */
function FetchPostRequest(url, data = {}) {
  return new Promise(function (resolve, reject){
    wx.request({
      url: API_BASE_URL + url,
      method: 'POST',
      data: Object.assign({token: wx.getStorageSync('token')}, data),//JSON.stringify(data),
      header: { 
        'content-type': 'application/json',
      },
      success: FetchSuccess,
      fail: FetchError
    });
    
    /**
      * 成功回调
      */
    function FetchSuccess(res) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve(res);
      } else {
        FetchError(res.data || res);
        switch (res.statusCode) {
          case 403:
            // 业务逻辑处理
            break
        }
      }
    }

    /**
     * 异常处理
     */
    function FetchError(err) {
      if (err) {
        wx.showToast({
          title: err.msg || err.statusCode+ ": " + err.errMsg,
          icon: 'none',
          duration: 3000
        })
      }
      reject(err);
    }

  });
}

module.exports = {
  fetchPostRequest: FetchPostRequest,
  API_BASE_URL
}


