// pages/findkey/findkey.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDecide:false,
    password:{},
    passwordShow:'password',
    passwordIsShow:false,
    passwordDecide:false,
    passwordAgainDecide:false,
    passwordAgainShow:'password',
    passwordAgainIsShow:false,
  },
  registerUserBlur:function(e){
    var objs={};
    objs.username=e.detail.value;
    var arr=wx.getStorageSync('users')||[];
    var userinfo=arr.find(item=>{
      return item.username==objs.username });
      if( objs.username==''){
        this.setData({
          userDecide:false
        })
      }
      else{
      if(!userinfo){
   this.setData({
     userDecide:2
   })
  }
  else{
    this.setData({
      userDecide:1
    })
  }
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
 formSubmit:function(e){
  var objs={};
  objs.username=e.detail.value.username;
  objs.password=e.detail.value.password;
  var arr=wx.getStorageSync('users')||[];
  var location=arr.findIndex(item=>{
    return item.username==objs.username});
  var userinfo=arr.find(item=>{
    return item.username==objs.username });
    objs.phoneNumber=userinfo.phoneNumber;
    console.log(objs);
    console.log(location);
    console.log(userinfo);
    if(!userinfo){
      wx.showToast({
        title:'用户名不存在',
        duration:2000
      })
    }
    else{
      if(this.data.passwordDecide==1&&this.data.passwordDecide==1&&this.data.userDecide==1){
      arr.splice(location,1);
      arr.push(objs);
      wx.setStorageSync('users', arr);
      wx.showToast({
        title: '修改成功',
        duration:2000
      }) 
      wx.navigateTo({
        url: '../login/login',
      })
    }
    else{
      wx.showToast({
        title: '修改失败',
        duration:2000
      }) 
    }
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
    wx.setNavigationBarTitle({
      title: '找回密码',
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