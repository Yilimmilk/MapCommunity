// map.js
Page({
  data: {
    longitude: 114.30,
    latitude: 30.60,
    scale: 14,
    markers: [{
      iconPath: "/images/marker.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    controls: [{
      id: 1,
      iconPath: '/images/get_location.png',
      position: {
        left: 15,
        top: 260 + 245,
        width: 40,
        height: 40
      },
      clickable: true
    }],
  },
  onLoad: function (options) {
    var mainMap = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success(res) {
        //赋值经纬度
        mainMap.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  // //get_location控件的点击事件
  // onGetLocation:function() {
  //   var mainMap = this;
  //   mainMap.setData({
  //     latitude: this.data.latitude,
  //     longitude: this.data.longitude,
  //     scale: 10,
  //   })
  // },
  //controls控件的点击事件
  funGetLocation(e) {
    var that = this;
    if (e.controlId == 1) {
      that.setData({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 16,
        markers: [
          {
          id: 1,
          latitude: this.data.latitude + 0.001,
          longitude: this.data.longitude + 0.001,
          iconPath: '/images/marker.png',
          callout:{
            padding: 12,
            fontSize: 14,
            display: 'BYCLICK',
            borderRadius: 4,
            borderWidth: 2,
            borderColor:"#3875FF",
            bgColor: '#ffffff',
            content: '腾讯总部大楼',
            textAlign: 'center',
            textColor: "#3875FF",
          }
        },
          {
            id: 2,
            latitude: this.data.latitude - 0.001,
            longitude: this.data.longitude - 0.001,
            iconPath: '/images/marker.png',
            callout: {
              padding: 12,
              fontSize: 14,
              display: 'BYCLICK',
              borderRadius: 4,
              borderWidth: 2,
              borderColor:"#3875FF",
              bgColor: '#ffffff',
              content: '腾讯总部大楼',
              textAlign: 'center',
              textColor: "#3875FF",
            }
          }
        ],
      })
    }
  },
})