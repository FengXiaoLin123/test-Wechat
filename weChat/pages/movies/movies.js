// pages/movies/movies.js
let app = getApp();
import regeneratorRuntime from '../regenerator-runtime/runtime.js'
let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
    let comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
    let top250Url = app.globalData.doubanBase + "/v2/movie/top250"
    this.getMovieListData(inTheatersUrl, 'inTheaters')
    this.getMovieListData(comingSoonUrl, 'comingSoon')
    this.getMovieListData(top250Url, 'top250')
  },
  getMovieListData: function(url, status) {
    let that = this;
    wx.request({
      url: url,
      success: function (res) {
        that.handleMovieData(res.data, status)
      },
      fail: function(error) {
        console.log('fail', error)
      }
    })
  },
  handleMovieData: function (movieData, status) {
    let movies = [];
    for (let idx in movieData.subjects) {
      let subject = movieData.subjects[idx];
      let title = subject.title;
      if(title.length >= 6) {
        title = title.substring(0,6) + "...";
      }
      let temp = {
        stars: util.covertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        images: subject.images.large,
        id: subject.id
      }; 
      movies.push(temp);
    }
    let readyData = {};
    readyData[status] = {
      movies: movies
    }
    this.setData(readyData)
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