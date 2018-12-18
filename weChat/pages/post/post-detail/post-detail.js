// pages/post/post-detail/post-detail.js
let postData = require('../../../data/post-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    CurrentPostId: null,
    starShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postId = options.id
    const detailData = postData.localData[postId]
    this.setData({
      detailData,
      CurrentPostId: postId
    })
    let postsCollected = wx.getStorageSync('postsCollected')
    // postsCollected = { 0: true, 1: false}
    if (postsCollected) {
      let currentCollected = postsCollected[this.data.CurrentPostId];
      if (!currentCollected) {
        let newObj = { ...postsCollected}
        newObj[this.data.CurrentPostId] = false;
        wx.setStorageSync('postsCollected', newObj)
      } 
      this.setData({
        starShow: currentCollected
      })
    } else {
      let postsCollected = {};
      postsCollected[this.data.CurrentPostId] = false;
      wx.setStorageSync('postsCollected', postsCollected)
    }
  },

  changeStarShow: function(e) {
    let postsCollected = wx.getStorageSync('postsCollected');
    let currentShow = postsCollected[this.data.CurrentPostId];
    currentShow = !currentShow;
    postsCollected[this.data.CurrentPostId] = currentShow;
    wx.setStorageSync('postsCollected', postsCollected)
    this.setData({
      starShow: currentShow
    })
    wx.showToast({
      title: currentShow ? '收藏成功' : '取消收藏成功',
    })
  },
  onShareTap: function(e) {
    wx.showActionSheet({
      itemList: [
        "分享到微信", "分享到朋友圈", "分享到qq"
      ],
      itemColor: '#405f80',
      success(res) {
        // res.cancel 判断用户是否点击了取消按钮
        // res.tapIndex 判断用户点击的索引值 从0 开始
        console.log(res.tapIndex)
        
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
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

  }
})