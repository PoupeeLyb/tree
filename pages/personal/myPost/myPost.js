// pages/personal/myPost/myPost.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    follows:[],
    username:'',
    showCommentInput:true,
    posts:[
    ]
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title:"我的贴子"
    })
      },
    
      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady() {
    
      },
    
      /**
       * 生命周期函数--监听页面显示
       */
      onShow() {
        this.setData({
          username:app.globalData.USERNAME,
          user:app.globalData.USER
        })
        this.getPersonalInfo(app.globalData.USERNAME);
      },
    
      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide() {
    
      },
    
      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload() {
    
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
         success(res){
          console.log(res);
          var postPromises = res.data.map(post => that.getAttachment(post.id));
          Promise.all(postPromises).then((attachments) => {
            var posts = [];
            var praisePromises = res.data.map(post => that.getPraises(post.id));
            Promise.all(praisePromises).then((praisesArray) => {
              res.data.forEach((post, index) => {
                var getPost = {
                  id: post.id,
                  content: post.content,
                  follow: false, // 默认设置为 false
                  praise: false,
                  praises: praisesArray[index],
                  created_at: post.created_at,
                  attachments: attachments[index],
                };
                
                praisesArray[index].forEach(praise => {
                  if (praise&&praise.id === app.globalData.USER.id) {
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
  deletePost: function (e) {
    let objId = e.target.id;
    console.log(objId);
    
    wx.showModal({
      title: '提示',
      content: '确定删除吗?',
      success: res=> {
        if (res.confirm) {
          let that=this;
          wx.request({
            url: 'http://localhost:8080/post/delete/'+objId,
            method:'delete',
            data:{},
            header:{
              'content-type':'application/json'
            },
            success(res){
              console.log(res.data);
              if(res.data=="删除成功"){
                let newPosts = that.data.posts.filter((item, index) => {
                  if (item.id != objId) {
                    return item;
                  }
                });
  
                that.setData({
                  posts: newPosts
                });
              } 
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  follow: function (e) {
    let objId = e.target.dataset.obj;
    let userRelation={};
    userRelation.user_id=app.globalData.USER.id;
    userRelation.related_user_id=this.data.posts[objId].user.id;
    console.log(this.data.posts);
    userRelation.relation_type='FOLLOW';
    console.log(userRelation);
    wx.request({
      url: 'http://localhost:8080/userRelation/post',
      method:'post',
      data:userRelation,
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res);
      }
    })
  },
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
  getCommentContent: function (event) {
    let content = event.detail.value;
    this.setData({
      commentContent: ''
    })
    this.setData({
      commentContent: content
    })
  },
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
   * 生命周期函数--监听页面加载
   */

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})