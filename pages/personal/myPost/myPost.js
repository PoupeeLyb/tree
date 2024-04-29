// pages/personal/myPost/myPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCommentInput:true,
    posts:[
    {
      poster:{
      avatar:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg",
      nickname:"Lyb"
     },
     supertube:1,
     id:1,
     can_delete:1,
     follow:1,
     content:"我不喜欢",
     created_at:"2004.4.30",
     comments:[
       {
        ref_comment:0,
         id:1,
         author:0,
        commenter:{
        supertube:1,
        nickname:"lin",
        avatar:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg",
       },
       content:"我也不喜欢"
     },
     {
      ref_comment:0,
      id:2,
      author:1,
     commenter:{
     supertube:0,
     nickname:"lyb",
     avatar:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg",
    },
    content:"我喜欢"
  },
  {
     ref_comment:0,
      id:3,
      author:0,
     commenter:{
     supertube:0,
     nickname:"poupee",
     avatar:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg",
    },
    content:"我更加喜欢"
  },
  {
    ref_comment:{
      refCommenter:{
        nickname:"lin",
        avatar:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg",
      }
    },
    id:4,
    author:0,
   commenter:{
   supertube:0,
   nickname:"liu",
   avatar:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg",
  },
  content:"我也一样"
  }
     ],
     praises:[
     {
       id:0,
       avatar:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg",
       nickname:"lin"
     },
     {
      id:1,
      avatar:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg",
      nickname:"lyb"
    }
    ],
     attachments:[
      {
      id:0,
      imageUrl:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg"
     },
     {
      id:1,
      imageUrl:"http://tmp/eI187uHySE2h86ea7a33ee0b7c74fff7f4077147b88c.jpeg"
     },
    ]
     }
    ]
  },
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