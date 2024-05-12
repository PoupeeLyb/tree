const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatarUrl: defaultAvatarUrl,
    username:'',
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    getSecurityCodeState:true,
    userAvatarUrlDecide:false,
    userDecide:false,
    iconDecide:false,
    password:{},
    passwordShow:'password',
    passwordIsShow:false,
    passwordDecide:false,
    passwordAgainDecide:false,
    passwordAgainShow:'password',
    passwordAgainIsShow:false,
    phoneDecide:false
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    console.log(e.detail);   
    this.setData({
      userAvatarUrl: avatarUrl,
      hasUserInfo: this.data.username &&avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
    if(avatarUrl==defaultAvatarUrl){
      this.setData({
        userAvatarUrlDecide:false
      })
    }
      else{
        this.setData({
          userAvatarUrlDecide:1
        })
      }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  registerUserBlur:function(e){
      if( e.detail.value==''){
        this.setData({
          userDecide:false
        })
      }
      else{
      
   this.setData({
     userDecide:1
   })
  }
  },
  registerPasswordBlur:function(e){
    if( e.detail.value==''){
      this.setData({
        passwordDecide:false
      })
    }
    else{
      if(e.detail.cursor>=6&&e.detail.cursor<=20){
     this.setData({
       passwordDecide:1,
       password:e.detail.value
     })
      }
      else{
        this.setData({
          passwordDecide:2,
          password:e.detail.value
        })
         }
      }
  },
 registerPasswordAgainBlur(e){
  if( e.detail.value==''){
    this.setData({
      passwordAgainDecide:false
    })
  }
  else{
   if(e.detail.value==this.data.password){
     this.setData({
       passwordAgainDecide:1
     })
   }
   else{
    this.setData({
      passwordAgainDecide:2
    })
   }
  }
 },
 registerPhoneBlur(e){
  if( e.detail.value==''){
    this.setData({
      phoneDecide:false
    })
  }
  else{
   if(e.detail.cursor==11){
    this.setData({
     phoneDecide:1
  })
   }
   else{
    this.setData({
      phoneDecide:2
   })
   }
  }
 },
  formSubmit:function(e){
    console.log(e.detail.value);
    var objs={};
    objs.username=e.detail.value.username;
    objs.avatar=this.data.userAvatarUrl;
    objs.password=e.detail.value.password;
    objs.phone_number=e.detail.value.phoneNumber;
        if(this.data.iconDecide==true&&this.data.userAvatarUrlDecide==1&&this.data.passwordDecide==1&&this.data.passwordDecide==1&&this.data.phoneDecide==1&&this.data.userDecide==1){
          wx.request({
            url: 'http://localhost:8080/user/register',
            method:'POST',
            data:objs,
            header:{
              'content-type':'application/json'
            },
            success(res){
              console.log(res);
              if(res.data=='注册成功'){
                wx.showToast({
                  title: '注册成功',
                  duration:2000
                }) 
                wx.navigateTo({
                  url: '../login/login',
                })
              }
              else if(res.data=='用户名已注册'){
                wx.showToast({
                  title: '用户名已存在',
                  duration:2000
                }) 
              }  
            }
          })
        
      }
      else{
        wx.showToast({
          title: '注册失败',
          duration:2000
        }) 
      }
  },
  PasswordTouchEye:function(){
    if(!this.data.passwordIsShow){
      this.setData({
        passwordShow:'text',
        passwordIsShow:true
      })  
    }
    else{
      this.setData({
        passwordShow:'password',
        passwordIsShow:false
      })  
    }
  },
  PasswordAgainTouchEye:function(){
    if(!this.data.passwordAgainIsShow){
      this.setData({
        passwordAgainShow:'text',
        passwordAgainIsShow:true
      })  
    }
    else{
      this.setData({
        passwordAgainShow:'password',
        passwordAgainIsShow:false
      })  
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.decide)
    if(options.decide=='true'){
     this.setData({
      iconDecide:true
     })
    }
    console.log(this.data.iconDecide)
wx.setNavigationBarTitle({
  title: '手机号注册',
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