// pages/post/post.js
let postData = require('../../data/post-data.js')
Page({
  data: {
    imgUrls: [
      {
        id: 1,
        image: '/images/3.png'
      },
      {
        id: 2,
        image: '/images/2.jpg'
      },
      {
        id: 3,
        image: '/images/3.png'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    dataList: []
  },
  onLoad: function(options) {
    this.setData({
      dataList: postData.localData
    })
  },
  onPostTap: function(e) {
    const postId = e.currentTarget.dataset.postid
    wx:wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})