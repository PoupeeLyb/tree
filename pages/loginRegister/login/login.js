// pages/login/login.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginBtnState:true,
    username:"",
    password:"",
    user:[
      {
      username:"1234",
      password:"2004",
    }]
  },
usernameInput:function(text){
  console.log(text);
  var temp=text.detail.value;
  if(temp!=""){
    this.setData({
      username:temp
    })
    if(this.data.password!=""){
      this.setData({
        loginBtnState:false
      })
    }
 }
 else{
  this.setData({
    username:"",
    loginBtnState:true
  })
}
},
passwordInput:function(text){
  console.log(text);
  var temp=text.detail.value;
  if(temp!=""){
    this.setData({
      password:temp
    })
    if(this.data.username!=""){
      this.setData({
        loginBtnState:false
      })
    }
 }
 else{
  this.setData({
    password:"",
    loginBtnState:true
  })
}
},
login:function(){
  var app=getApp();
 var userinfos=wx.getStorageSync('users')||this.data.user;
 console.log(userinfos);
  var userinfo=userinfos.find(item=>{
    return item.username===this.data.username});
  var location=userinfos.findIndex(item=>{
      return item.username===this.data.username});
if(userinfo){
   if(userinfo.password==this.data.password){
     var date=new Date();
     var objs={};
     objs.year=date.getFullYear();
     objs.month=date.getMonth()+1;
     objs.day=date.getDate();
     if(userinfos[location].lastLogin.year==0){
       userinfos[location].lastLogin=objs;
       userinfos[location].loginDays++;
       console.log(userinfos[location].las);
       wx.setStorageSync('users',userinfos);
     }
     else{
       if(userinfos[location].lastLogin.year<objs.year||(userinfos[location].lastLogin.year==objs.year&&userinfos[location].lastLogin.month<objs.month)||(userinfos[location].lastLogin.year==objs.year&&userinfos[location].lastLogin.month==objs.month&&userinfos[location].lastLogin.day<objs.day)){
        userinfos[location].lastLogin=objs;
        userinfos[location].loginDays++;
        console.log(userinfos[location].lastLogin);
        wx.setStorageSync('users',userinfos);
       }
     }
     wx.showToast({
       title: '登录成功',
       duration:2000,
       success:function(){
        wx.switchTab({
          url: '../../personal/index_2/personal',
        })
       app.globalData.USERNAME=userinfo.username;
       app.globalData.USERAVATARURL=userinfo.userAvatarUrl;
       }
     })
   }
   else{
    wx.showToast({
      title: '密码错误',
      duration:2000
   })
 }
}
else{
  wx.showToast({
    title: '用户名不存在',
    duration:2000
 })
}
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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