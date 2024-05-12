const app = getApp();
const http = require("./../../../utils/http.js");
const qiniuUtil = require("./../../../utils/qiniuToken.js");
const config = require("./../../../config.js");
var post_id=0;
Page({
  data: {
    logs: [],
    imageArray: [],
    attachments: [],
    private: false,
    textContent: '',
    name: '',
    phone:'',
    param: app.globalData.param,

    icon: {
      width: "100rpx",
      height: "100rpx",
      path: "/image/select-image.png",
      showImage:true
    },
    qiniu: {
      uploadNumber: 9,
      region: config.region,
      token: '',
      domain: config.qiniuDomain,
      returnAllImage: true
    },
    canPost:true
  },
  onLoad: function () {

  },
  onShow: function () {
    this.getQiNiuToken()    
  },

  /**
   * 获取上传的图片
   */
  uploadSuccess:function(uploadData){
    console.log(uploadData)
    this.setData({ imageArray:uploadData.detail})
  },

  /**
   * 获取删除后的图片
   */
  deleteSuccess:function(uploadData){
    this.setData({ imageArray: uploadData.detail })
  },

  /**
   * 获取七牛token
   */
  getQiNiuToken: function () {
    qiniuUtil.getQiniuToken(res => {
      let qiniu = this.data.qiniu;
      qiniu.token = res;
      this.setData({ qiniu: qiniu })
    })
  },

  /** 提交 */
  post: function () {
    this.setData({ canPost: false })
    var post = {};
    post.user_id = app.globalData.USER.id;
    post.content = this.data.textContent;
    console.log(post);
    let attachments = this.data.imageArray;
    console.log(this.data.imageArray);
    if (this.data.content == '' && attachments == '') {
      wx.showLoading({
        title: '内容不能为空！',
      });
    } else {
      this.uploadPost(post);
    }
  },
  
  uploadPost: function (post) {
    wx.request({
      url: 'http://localhost:8080/post/newpost',
      method: 'POST',
      data: post,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res);
        post_id = res.data;
        this.uploadAttachments(this.data.imageArray, 0);
      },
      fail: (err) => {
        console.error(err);
        // 处理上传失败的情况
      }
    })
  },
  
  uploadAttachments: function (attachments, index) {
    if (index < attachments.length) {
      var attachment = {};
      attachment.post_id = post_id;
      attachment.imageUrl = attachments[index].localPath;
      wx.request({
        url: 'http://localhost:8080/attachment/post',
        method: 'POST',
        data: attachment,
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          console.log(res);
          this.uploadAttachments(attachments, index + 1); // 递归调用下一个附件
        },
        fail: (err) => {
          console.error(err);
          // 处理上传失败的情况
        }
      })
    } else {
      wx.navigateBack({
        url: '../index_2/index_2',
      })
    }
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
   * 获取输入内容
   */
  getTextContent: function (event) {
    let value = event.detail.value;
    this.setData({
      textContent: value
    });
  }
})