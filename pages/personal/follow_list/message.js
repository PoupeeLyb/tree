const util = require('./../../../utils/util.js');
const http = require("./../../../utils/http.js");
const app = getApp();

Page({
  data: {
    objType:0,
    pageSize: 15,
    pageNumber: 1,
    initPageNumber: 1,
    showGeMoreLoadin: false,
    notDataTips: false,
    userId:0,
    list: [],
  },
  onLoad: function (option) {
    let id = option.id
    let objType = option.objType
this.setData({
  objType:objType,
})
    if(objType == 1){
      wx.setNavigationBarTitle({ title: "关注列表"});
    }else{
      wx.setNavigationBarTitle({ title: "粉丝列表"});
    }

    this.setData({userId:id,objType:objType})
    this.getList()
  },

  openUserInfo:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/user_info/personal?id=' + id
    })
  },

  /**
   * 上拉加载更多
   */
  onReachBottom: function () {
    this.setData({
      showGeMoreLoadin: true
    });
    this.getList();
  },

  /**
   * 获取贴子列表
   */
  getList:function(){
    if(this.data.objType==1){
      this.getFollows(app.globalData.USER.id);
    }
    else{
      this.getFans(app.globalData.USER.id);
    }
  },
  getFans:function(e){
    var that=this;
    wx.request({
      url: 'http://localhost:8080/userRelation/findFans?userId='+e,
      method:'GET',
      data:{},
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res);
        that.setData({
          list:res.data,
        })
        console.log(that.data.follows)
      }
    })
  },
  getFollows:function(e){
    var that=this;
    wx.request({
      url: 'http://localhost:8080/userRelation/findFollow?userId='+e,
      method:'GET',
      data:{},
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res);
        that.setData({
          list:res.data,
        })
        console.log(that.data.follows)
      }
    })
  }
})