const { get } = require("../../../utils/http");

const app = getApp();
Page({
  data: {
    user: {},
    fans:[],
    follows:[],
    getAttachment:[],
    newLetterNumber: 0,
    serviceId: '',
    param: app.globalData.param,
    showLoginButton: true,
    selectPoster:1,
    signature:"",
    todayStep:0,
    myRank:0,
    posts:[],
    pageSize: 10,
    pageNumber: 1,
    baseImageUrl: app.globalData.imageUrl,
    initPageNumber: 1,
    showCommentInput: false,
    commentContent: '',
    commentObjId: '',
    commentType: '',
    refcommentId: '',
    commentValue: '',
    showSubmit: false,
    canComment:true,
    leftList: [],
    rightList: [],
    leftHeight: 0,
    rightHeigt: 1,
    userAvatarUrl:app.globalData.USERAVATARURL,
    username:app.globalData.USERNAME
  },
  onLoad: function () {
  },
  onShow: function () {
    this.setData({
      username:app.globalData.USERNAME,
      user:app.globalData.USER
    })
    this.getPersonalInfo(app.globalData.USERNAME);
  },
   getPersonalInfo:function(e){
     var that=this;
    wx.request({
      url: 'http://localhost:8080/user/userInfo?username='+e,
      method:'GET',
      data:{},
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res);
       app.globalData.USER=res.data;
       that.getLastloginDay(app.globalData.USER);
       that.getPost(that.data.user.id);
       that.getFans(that.data.user.id);
       that.getFollows(that.data.user.id);
      }
    })
    },
  getLastloginDay:function(e){

// 使用 Date 对象来解析日期字符串
console.log(e);
const dateParts = e.last_login.split("-"); // 将日期字符串拆分为年、月、日的数组
const year = parseInt(dateParts[0]);
const month = parseInt(dateParts[1]);
const day = parseInt(dateParts[2]);
console.log(day);
const currentDate = new Date();

// 获取年、月、日
const nowyear = currentDate.getFullYear();
const nowmonth = currentDate.getMonth() + 1; // 月份从 0 开始，需要加 1
const nowday = currentDate.getDate();
console.log(nowday);
if(year<nowyear||(year==nowyear&&month<nowmonth)||(year==nowyear&&month==nowmonth&&day<nowday)){
  app.globalData.USER.last_login=`${nowyear}-${nowmonth.toString().padStart(2, '0')}-${nowday.toString().padStart(2, '0')}`
  app.globalData.USER.login_days++;
  console.log( app.globalData.USER);
  this.updateUser(app.globalData.USER);
}
this.setData({
  user: app.globalData.USER
});
  },
  updateUser:function(e){

    wx.request({
      url: 'http://localhost:8080/user/update',
      method:'PUT',
      data:e,
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res);
      }
    })
  },
  getPost: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/post/getpost?userId=' + e,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res);
        var postPromises = [];
        res.data.forEach(post => {
          postPromises.push(that.getAttachment(post.id));
        });
  
        Promise.all(postPromises).then((attachments) => {
          var posts = [];
          res.data.forEach((post, index) => {
            var getPost = {};
            getPost.id = post.id;
            getPost.user = that.data.user;
            getPost.content = post.content;
            getPost.created_at = post.created_at;
            getPost.attachments = attachments[index];
            posts.push(getPost);
          });
          console.log(posts);
          that.setData({
            posts: posts
          });
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  },
  getAttachment: function(postId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://localhost:8080/attachment/get?postId=' + postId,
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res);
          resolve(res.data);
        },
        fail(error) {
          reject(error);
        }
      });
    });
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
          fans:res.data,
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
          follows:res.data,
        })
        console.log(that.data.follows)
      }
    })
  },
  
  /**
   * 进入关注页面
   */
  openFollowList:function(e){
    let t = e.currentTarget.dataset.t;
    wx.navigateTo({
      url: `/pages/personal/follow_list/message?objType=${t}&id=0`
    })
  },

  /**
   * 触摸屏幕后移动触发一些隐藏操作
   */
  hiddenComment: function () {
    this.setData({
      show: 0,
      hidden: false,
      showCommentInput: false
    });
  },

  /**
   * 关注
   */
  follow: function (e) {
    let objId = e.target.dataset.obj;
    http.post('/follow', {obj_id: objId,obj_type: 1}, res=> {
      let follow = res.data.data;
      let post = this.data.posts;
      let newPost = post.map(item => {
        if (item.id == follow.obj_id) {
          item.follow = true;
        }
        return item;
      });

      this.setData({
        posts: newPost
      });
    });
  },

  /**
   * 取消关注
   */
  cancelFolllow: function (e) {
    let objId = e.target.dataset.obj;
    http.put(`/cancel/${objId}/follow/1`, {},res=> {
      let follow = res.data.data;
      let post = this.data.posts;
      let newPost = post.map(item => {
        if (item.id == objId) {
          item.follow = false;
        }
        return item;
      });
      this.setData({
        posts: newPost
      });
    });

  },

  /**
   * 删除评论
   */
  deleteComment: function (e) {
    let objId = e.currentTarget.dataset.objid;
    let commentId = e.currentTarget.dataset.refid;
    wx.showModal({
      title: '提示',
      content: '确认删除该评论?',
      success: res=> {
        if (res.confirm) {
          http.httpDelete(`/delete/${commentId}/comment`, {}, res => {
            if (res.data.data == 1) {
              let newPostList = this.data.posts.map(item => {
                if (objId == item.id) {
                  let newComment = item.comments.filter((item, index) => {
                    if (item.id != commentId) {
                      return item;
                    }
                  });
                  item.comments = newComment;
                }
                return item;
              });
              this.setData({
                posts: newPostList
              });
            }
          });

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
   * 删除帖子
   */
  deletePost: function (e) {
    let objId = e.target.id;
    wx.showModal({
      title: '提示',
      content: '确定删除吗?',
      success: res=> {
        if (res.confirm) {
          http.httpDelete(`/delete/${objId}/post`, {}, res => {
            let result = res.data.data;
            if (result == 1) {
              let newPosts = this.data.posts.filter((item, index) => {
                if (item.id != objId) {
                  return item;
                }
              });

              this.setData({
                posts: newPosts
              });
            } 
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  

  select(e) {
    let objType = e.target.dataset.type;
    this.setData({selectPoster:objType})
  },


  getMyRank: function () {
    http.get(`/my_rank`, {}, res => {
      let resData = res.data;
      if (resData.error_code == 0) {
        this.setData({
          myRank: resData.data.rank
        })
      }
    });
  },

    /**
   * 获取统计的数据
   */
  statistic: function () {
    http.get('/run_statistic', {}, res=>{
      let todayStep = res.data.data.today_step != null ? res.data.data.today_step : 0;
      let totalStep = res.data.data.total_step != null ? res.data.data.total_step : 0;
      this.setData({
        todayStep: todayStep
      })
      wx.setStorageSync('todayStep', todayStep);
      wx.setStorageSync('totalStep', totalStep);
    });
  },

  /**
   * 获取客服id
   */
  getService: function () {
    http.get(`/service`, {}, res => {
      this.setData({
        serviceId: res.data.data
      });
    });
  },


  /**
   * 获取未读私信数量
   */
  newLetterCount: function () {
    http.get(`/new_messages`, {}, res => {
      if (res.data.data != null) {
        this.setData({
          newLetterNumber: res.data.data
        })
      }
    });
  },

  /**
   * 进入消息列表
   */
  openMessage: function () {
    wx.navigateTo({
      url: '/pages/personal/message/message?type=0&new_message=0&t=2'
    })
  },

  /**
   * 进入私信列表
   */
  openLetter: function () {
    wx.navigateTo({
      url: '/pages/personal/friends/friends'
    })
  },

  /**
   * 进入建议留言列表
   */
  openSugesstion: function () {
    let id = this.data.serviceId;
    console.log('客服id' + id);
    wx.navigateTo({
      url: '/pages/personal/letter/letter?friend_id=' + id
    })
  },



  updateInfo: function () {
    wx.navigateTo({
      url: '/pages/personal/set_profile/set_profile'
    })
  },

  /**
   * 预览图片
   */
  previewImage: function (event) {
    let url = event.target.id;
    wx.previewImage({
      current: '',
      urls: [url]
    })
  },

  /**
 * 预览图片
 */
  previewMoreImage: function (event) {
    let images = event.currentTarget.dataset.obj.map(item=>{
      return this.data.baseImageUrl+item;
    });
    let url = event.target.id;
    wx.previewImage({
      current: url,
      urls: images
    })
  },

  /**
   * 显示评论控制面板
   */
  showComment: function (event) {
    this.setData({
      show: 0
    });
    let id = event.target.id;
    let hidden = event.target.dataset.show;
    if (!hidden) {
      this.setData({
        show: id,
        showCommentInput: true
      });
    } else {
      this.setData({
        show: 0,
        showCommentInput: false
      });
    }
  },

  /**
   * 触摸屏幕后移动触发一些隐藏操作
   */
  hiddenComment: function () {
    this.setData({
      show: 0,
      hidden: false,
      showCommentInput: false
    });
  },

  /**
   * 点赞
   */
  praise: function (event) {
    let objId = event.target.dataset.obj;
    let objType = 1;
    this.setData({
      show: 0,
      hidden: false,
      showCommentInput: false
    });
    http.post(`/praise`,{ obj_id: objId, obj_type: objType }, res => {
      let repData = res.data
      if(repData.error_code == 0 && repData.data != null){
        let postList = this.data.posts;
        let newPostList = postList.map(item => {
          if (objId == item.id) {
            item.praises.push(res.data.data);
          }
          return item;
        });
        //重新赋值，更新数据列表
        this.setData({
          posts: newPostList
        });
      }
    });
  },

  /**
   * 激活评论框
   */
  showCommentInput: function (event) {
    let objId = event.target.dataset.objid;
    let type = event.target.dataset.objtype;
    this.setData({
      commentObjId: objId,
      commentType: type,
      show: 0,
      hidden: false,
      showCommentInput: true
    });
  },

  /**
   * 获取评论框的输入内容
   */
  getCommentContent: function (event) {
    let content = event.detail.value;
    this.setData({
      commentContent: ''
    })
    this.setData({
      commentContent: content
    })
  },

  /**
   * 获取评论框的输入内容
   */
  getCommentContent: function (event) {
    let content = event.detail.value;
    this.setData({
      commentContent: ''
    })
    this.setData({
      commentContent: content
    })
  },

  /**
   * 获取搜索框的内容
   */
  getFilter: function (event){
    let content = event.detail.value;
    this.setData({
      filter: content
    })
  },
  
  /**
   * 提交评论
   */
  sendComment: function (e) {
    console.log(e)
    if (!this.data.canComment){
      return false;
    }
    this.setData({ canComment: false })
    wx.showLoading({
      title: '发送中',
    });
    
    let content = this.data.commentContent;
    let objId = this.data.commentObjId;
    let type = this.data.commentType;
    let refcommentId = this.data.refcommentId;
    if (content == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
      this.setData({ canComment:true})
      return false;
    }

    http.post('/comment', {
      content: content,
      obj_id: objId,
      type: type,
      ref_comment_id: refcommentId
    }, res=> {
      this.setData({ canComment:true})
      wx.hideLoading();
      this.setData({
        commentContent: '',
        commentObjId: '',
        commentType: '',
        showCommentInput: false,
        refcommentId: ''
      })

      if(res.data.error_code == 0){
        let postList = this.data.posts;
        let newPostList = postList.map(item => {
          if (objId == item.id) {
            item.comments.push(res.data.data);
          }
          return item;
        });
  
        //重新赋值，更新数据列表
        this.setData({
          posts: newPostList
        });
      }else{
        wx.showToast({
          title: res.data.error_message,
          icon:'none'
        });
        setTimeout(function () {
          wx.hideLoading();
        }, 1500)
      }

    });
  },

  /**
   * 回复别人
   */
  commentOtherComment: function (e) {
    let objId = e.currentTarget.dataset.objid;
    let type = e.currentTarget.dataset.objtype;
    let refcommentId = e.currentTarget.dataset.refid;
    this.setData({
      commentObjId: objId,
      commentType: type,
      show: 0,
      hidden: false,
      showCommentInput: true,
      refcommentId: refcommentId
    });
  },

})