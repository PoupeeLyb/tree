const { get } = require("../../../utils/http");

const app = getApp()

Page({
  data: {
    show_auth:false,
    userInfo: {},
    hasUserInfo: false,
    school: '',
    praiseBorder: '',
    notPraiseBorder: '',
    posts: [],
    follows:[],
    praises:[],
    postType: 1,
    baseImageUrl: app.globalData.imageUrl,
    show: 0,
    hidden: false,
    showCommentInput: false,
    commentContent: '',
    commentObjId: '',
    commentType: '',
    refcommentId: '',
    filter:'',
    pageSize: 10,
    pageNumber: 1,
    initPageNumber: 1,
    showGeMoreLoadin: false,
    currentTime: '',
    notDataTips: false,
    newMessage: false,
    newMessageNumber: 0,
    select: 1,
    animationData: {},
    commentValue: '',
    showNormal: false,
    showAudit: false,
    topic:'',
    showTopic:false,
    showSelect: false,
    showBegin: true,
    showCancel: false,
    showReport: false,
    bindReport: false,
    showSubmit: false,
    showSearch:false,
    tryAgant: false,
    imageLeft: '',
    imageRight: '',
    postImageLeft: '',
    PostImageRight: '',
    rate: 0,
    face: '',
    conclusion: '',
    canComment:true,
    sharecomeIn:false,
    shareId:'',
    shareType:'',
    param:app.globalData.param
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title:"树洞"
    })
  },
  onShow: function (option) {
      this.setData({
        pageNumber: this.data.initPageNumber,
        posts: []
      });
      this.getFollows();
      this.getPost();
  },
  getPost: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/post/allpost',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res);
        var postPromises = res.data.map(post => that.getAttachment(post.id));
        Promise.all(postPromises).then((attachments) => {
          var posts = [];
          var praisePromises = res.data.map(post => that.getPraises(post.id));
          var commentPromises = res.data.map(post => that.getComment(post.id));
          Promise.all(praisePromises).then((praisesArray) => {
            Promise.all(commentPromises).then((commentsArray) => {
              var userPromises = [];
  
              commentsArray.forEach((comments, postIndex) => {
                comments.forEach(comment => {
                  userPromises.push(that.getUserPromise(comment.commenter_id));
                });
              });
  
              Promise.all(userPromises).then(users => {
                var userIndex = 0;
                res.data.forEach((post, postIndex) => {
                  var getPost = {
                    id: post.id,
                    content: post.content,
                    follow: false, // 默认设置为 false
                    praise: false,
                    praises: praisesArray[postIndex],
                    created_at: post.created_at,
                    attachments: attachments[postIndex],
                    comments: Array.isArray(commentsArray[postIndex]) ? commentsArray[postIndex].map(comment => {
                      var commenter = users[userIndex++];
                      return {
                        id: comment.id,
                        commenter: commenter,
                        content: comment.content
                      };
                    }) : []
                  };
  
                  praisesArray[postIndex].forEach(praise => {
                    if (praise && praise.id === app.globalData.USER.id) {
                      getPost.praise = true;
                    }
                  });
  
                  that.data.follows.forEach(item => {
                    if (item.id === post.user_id) {
                      getPost.follow = true;
                    }
                  });
  
                  // 在这里调用获取用户信息的函数，并将用户信息存入帖子对象
                  that.getUser(post.user_id, function(user) {
                    getPost.user = user;
                    posts.push(getPost);
                    if (posts.length === res.data.length) {
                      // 如果选择的是“最热”，对帖子进行排序
                      if (that.data.postType == 4) {
                        posts.sort((a, b) => {
                          let aScore = a.praises.length+a.comments.length*2;
                          let bScore = b.praises.length+b.comments.length*2;
                          return bScore - aScore;
                        });
                      }
                      // 如果选择的是“收藏”，过滤出关注的帖子
                      if (that.data.postType == 2) {
                        posts = posts.filter(post => post.follow == true);
                      }
                      // 当所有帖子都处理完毕后，更新页面数据
                      that.setData({
                        posts: posts
                      });
                      console.log(that.data.posts);
                    }
                  });
                });
              }).catch((error) => {
                console.error(error);
              });
            }).catch((error) => {
              console.error(error);
            });
          }).catch((error) => {
            console.error(error);
          });
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  },
  
  getUser: function (userId, callback) {
    wx.request({
      url: 'http://localhost:8080/user/userInfoById?id=' + userId,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res);
        // 调用回调函数，并传入用户信息
        callback(res.data);
      }
    });
  },
  
  getUserPromise: function (userId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://localhost:8080/user/userInfoById?id=' + userId,
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
  
  getFollows: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/userRelation/findFollow?userId=' + app.globalData.USER.id,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res);
        that.setData({
          follows: res.data,
        });
        console.log(that.data.follows);
      }
    });
  },
  
  getPraises: function(postId) {
    console.log(postId);
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://localhost:8080/praise/get?postId=' + postId,
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
  
  getComment: function(postId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://localhost:8080/comment/get?postId=' + postId,
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res);
          if (Array.isArray(res.data)) {
            resolve(res.data);
          } else {
            var array=[];
            resolve(array);
          }
        },
        fail(error) {
          reject(error);
        }
      });
    });
  },
  
    
  
  
  follow: function (e) {
    let objId = e.target.dataset.obj;
    let userRelation = {};
    userRelation.user_id = app.globalData.USER.id;
    userRelation.related_user_id = this.data.posts[objId - 1].user.id;
    console.log(this.data.posts);
    userRelation.relation_type = 'FOLLOW';
    console.log(userRelation);
    wx.request({
      url: 'http://localhost:8080/userRelation/post',
      method: 'post',
      data: userRelation,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res);
      }
    });
    this.data.posts.forEach(item => {
      if (item.user.id === userRelation.related_user_id)
        item.follow = true;
    });
    var that = this;
    this.getUser(userRelation.related_user_id, function(user) {
      that.data.follows.push(user);
      that.setData({
        follows: that.data.follows,
      });
    });
    this.setData({
      posts: this.data.posts,
    });
  },
  
  cancelFollow: function(e) {
    let objId = e.target.dataset.obj;
    let userRelation = {};
    userRelation.user_id = app.globalData.USER.id;
    userRelation.related_user_id = this.data.posts[objId - 1].user.id;
    console.log(userRelation);
    var that = this;
    wx.request({
      url: 'http://localhost:8080/userRelation/delete/' + userRelation.user_id + '/' + userRelation.related_user_id,
      method: 'DELETE',
      data: userRelation,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res);
        // 取消关注成功后，更新本地数据
        let posts = that.data.posts;
        posts.forEach(item => {
          if (item.user.id === userRelation.related_user_id)
            item.follow = false;
        });
        let follows = that.data.follows;
        let index = follows.findIndex(user => user.id === userRelation.related_user_id);
        if (index !== -1) {
          follows.splice(index, 1);
        }
        that.setData({
          posts: posts,
          follows: follows
        });
      }
    });
  },
  
  /**
   * 点赞
   */
  praise: function (event) {
    let objId = event.target.dataset.obj;
    console.log(objId);
    var praise = {};
    praise.post_id = objId;
    praise.user_id = app.globalData.USER.id;
    console.log(praise);
    let objType = 1;
    wx.request({
      url: 'http://localhost:8080/praise/post',
      method: 'POST',
      data: praise,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res);
      }
    });
      this.data.posts[objId-1].praises.push(app.globalData.USER);
      this.data.posts[objId-1].praise=1;
    this.setData({
      posts: this.data.posts,
    });
  },
 cancelPraise:function(event){
  let objId = event.target.dataset.obj;
  console.log(objId);
  var praise = {};
  praise.post_id = objId;
  praise.user_id = app.globalData.USER.id;
  console.log(praise);
  let objType = 1;
  wx.request({
    url: 'http://localhost:8080/praise/delete/'+praise.post_id+'/'+praise.user_id,
    method: 'delete',
    data: {},
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log(res);
    }
  });
  let index = this.data.posts[objId-1].praises.findIndex(user => user.id === app.globalData.USER.id);
        if (index !== -1) {
          this.data.posts[objId-1].praises.splice(index, 1);
        }
        this.data.posts[objId-1].praise=false;
        this.setData({
          posts: this.data.posts,
        });
 }, 

  /**
   * 获取具体类型的贴子
   */
  selected(e) {
    let objType = e.target.dataset.type;
    let thisTopic = this.data.topic;

    if (objType == 1 && thisTopic != null){
      this.setData({
        showTopic: true,
        posts: []
      });
    }else{
      this.setData({
        showTopic: false
      });
    }

    if (objType == 5) {
      this.setData({
        showSearch: true,
        showTopic: false,
      });
    } else {
      this.setData({
        showSearch: false
      });
    }

    this.setData({
      select: objType,
      postType: objType,
      posts: [],
      filter:''
    })

    this.setData({
      pageNumber: this.data.initPageNumber
    });

    if (objType != 5) {
      this.getPost();
    }

  },

  /**
   * 搜索
   */
  search:function(){
    const keyword = this.data.filter.toLowerCase();
    console.log(keyword);
    if(keyword!=''){
    const filtered = this.data.posts.filter(post => post.content.toLowerCase().includes(keyword));
    console.log(filtered);
    this.setData({
      posts: filtered
    });
  }
  else{
    this.getPost();
  }
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
   * 进入新消息列表
   */
  openMessage: function () {
    wx.navigateTo({
      url: '/pages/personal/message/message?type=0&new_message=1&t=1'
    })
  },

  /**
   * 下拉刷新，获取最新的贴子
   */
  onPullDownRefresh: function () {
   
  },

  /**
   * 上拉加载更多
   */
  onReachBottom: function () {
   
  },

  /** 
   * 进入发表页面
   */
  post: function () {
    wx.navigateTo({
      url: '/pages/home/post/post'
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
   * 提交评论
   */
  sendComment: function (e) {
    if (!this.data.canComment) {
      return false;
    }
  
    this.setData({ canComment: false });
  
    wx.showLoading({
      title: '发送中',
    });
  
    var comment = {};
    comment.content = this.data.commentContent;
    comment.post_id = this.data.commentObjId;
    comment.commenter_id = app.globalData.USER.id;
    comment.ref_comment_id = this.data.refcommentId;
    var that = this;
  
    if (comment.content == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      });
      this.setData({ canComment: true });
      return false;
    } else {
      wx.request({
        url: 'http://localhost:8080/comment/post',
        method: 'POST',
        data: comment,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res);
          let newPostList = that.data.posts.map(item => {
            if (that.data.commentObjId == item.id) {
              comment.commenter = app.globalData.USER;
              if (!item.comments) {
                item.comments = [];
              }
              item.comments.push(comment);
            }
            return item;
          });
  
          // 重新赋值，更新数据列表
          that.setData({
            posts: newPostList,
            commentContent: '', // 清空评论内容
            canComment: true // 恢复可以评论状态
          });
  
          wx.hideLoading(); // 隐藏加载提示
        },
        fail(error) {
          console.error(error);
          wx.hideLoading(); // 隐藏加载提示
          wx.showToast({
            title: '评论失败',
            icon: 'none'
          });
          that.setData({ canComment: true }); // 恢复可以评论状态
        }
      });
    }
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

  /**
   * 跳转到私信
   */
  letter: function (e) {
    let id = e.target.dataset.obj;
    let canChat = e.target.dataset.chat;
    wx.navigateTo({
      url: '/pages/personal/letter/letter?friend_id=' + id
    })
  },

  


  topic:function(){
    http.get(`/topic`, {}, res=> {
      if(res.data.data){
        let topicShow = res.data.data != null ? true : false;
        this.setData({ topic: res.data.data, showTopic: topicShow });
      }

    });
  },
  
  openTopic:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/home/topic_detail/topic_detail?id=' + id
    })
  },

  openUserInfo:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/user_info/personal?id=' + id
    })
  }

})