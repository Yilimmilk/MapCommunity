// map.js
const app = getApp()

Page({
  data: {
    hiddenmodalput: true,
    openid: '',

    text_input: '',
    latitude: 30.60,
    longitude: 114.30,
    scale: 14,
    markers: [],
    controls: [
      {
        id: 1,
        iconPath: '/images/get_location.png',
        position: {
          left: 15,
          top: 260 + 245,
          width: 40,
          height: 40
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: '/images/add_marker.png',
        position: {
          left: 170,
          top: 260 + 245,
          width: 40,
          height: 40
        },
        clickable: true
      }
    ],
  },
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    this.onGetLocation(),
    this.onQuery()
  },
  //controls控件的点击事件
  funOnControlTap(e) {
    var that = this;
    if (e.controlId == 1) {
      this.onGetLocation(),
      console.log('点击了controlId为1的按钮', this.data.latitude, this.data.longitude)
    }
    if(e.controlId == 2) {
      this.onGetLocation(),
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
      console.log('点击了controlId为2的按钮', this.data.latitude, this.data.longitude)
    }
  },
  //添加marker记录方法
  onAdd: function () {
    const db = wx.cloud.database()
    db.collection('map_community_markers').add({
      data: {
        text_main: this.data.text_input,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          latitude: res.latitude,
          longitude: res.longitude,
          text_main: res.text_main,
        })
        wx.showToast({
          title: '新增记录成功',
        })
        this.onQuery(),
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  //marker查询方法
  onQuery: function() {
    var mainMap = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('map_community_markers').where({
      
    }).get({
      success: res => {
        //for循环添加markers
        for (var i = 0; i < res.data.length; i++) {
          let markers = "markers[" + i + "]";
          let _id = "markers[" + i + "]._id";
          let latitude = "markers[" + i + "].latitude";
          let longitude = "markers[" + i + "].longitude";
          let text_main = "markers[" + i + "].text_main";

          //赋值完毕后直接setData
          mainMap.setData({
            [markers]:{ 
              _id: res.data[i]._id,
              latitude: res.data[i].latitude,
              longitude: res.data[i].longitude,
              callout:{
                content: res.data[i].text_main,
                bgColor:"#fff",
                padding:"5px",
                borderRadius:"2px",
                borderWidth:"1px",
                borderColor:"#07c160",
              }
            }
          });
        }
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onGetLocation :function(){
    var mainMap = this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success (res) {
        const resultLatitude = res.latitude
        const resultLongitude = res.longitude
        mainMap.setData({
          latitude: resultLatitude,
          longitude: resultLongitude,
        })
        console.log('获取位置成功-lat:', resultLatitude)
        console.log('获取位置成功-lon:', resultLongitude)
      }
    })
  },

  //取消按钮 
  cancel: function() {
    this.setData({
        hiddenmodalput: true
    });
  },
  //确认 
  confirm: function() {
    this.setData({
      hiddenmodalput: true,
    })
    this.onAdd()
  },
  bindMainTextInput:function(e){
    this.setData({
      text_input: e.detail.value
    })
  }

})

