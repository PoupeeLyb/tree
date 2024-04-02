const app = getApp();

Page({
  data: {
    userAvatarUrl:app.globalData.USERAVATARURL,
    selectPoster:2,
    userDecide:false,
    userAvatarUrlDecide:false,
    username:'',
    password:'',
    passwordDecide:false,
    passwordAgainDecide:false
    },
    switch:function(e){
      let objType = e.target.dataset.type;
      this.setData({
        selectPoster:objType
      })
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail
      console.log(e.detail);   
      this.setData({
        userAvatarUrl: avatarUrl,
      })
      if(avatarUrl==app.globalData.USERAVATARURL){
      this.setData({
        userAvatarUrlDecide:2
      })
    }
      else{
        this.setData({
          userAvatarUrlDecide:1
        })
      }
    },
    userAvatarUrlSave:function(){
      if(this.data.userAvatarUrlDecide==1){
      var userinfos=wx.getStorageSync('users');
      var location=userinfos.findIndex(item=>{
        return item.username==app.globalData.USERNAME})
      userinfos[location].userAvatarUrl=this.data.userAvatarUrl;
      wx.setStorageSync('users', userinfos);  
      console.log(userinfos[location]);
      app.globalData.USERAVATARURL=this.data.userAvatarUrl;
      console.log(app.globalData.USERAVATARURL);
      wx.showToast({
        title: '修改成功',
        duration:2000
      }) 
      wx.navigateBack({
        url: '../index_2/personal',
      })
    }
    else{
      wx.showToast({
        title: '修改失败',
        duration:2000
      }) 
    }
    },
    changeUserBlur:function(e){
      var objs={};
      objs.username=e.detail.value;
      var arr=wx.getStorageSync('users')||[];
      var userinfo=arr.find(item=>{
        return item.username==objs.username });
      var location=arr.findIndex(item=>{
        return item.username==app.globalData.USERNAME})  
        if( objs.username==''){
          this.setData({
            userDecide:false
          })
        }
        else if(objs.username==app.globalData.USERNAME){
          this.setData({
            userDecide:3
          })
        }
        else{
        if(!userinfo){
     this.setData({
       userDecide:1,
       username:objs.username
     })
    }
    else{
      this.setData({
        userDecide:2
      })
    }
  }
    },
    usernameSave:function(){
      if(this.data.userDecide==1){
      var userinfos=wx.getStorageSync('users');
      var location=userinfos.findIndex(item=>{
        return item.username==app.globalData.USERNAME})
      userinfos[location].username=this.data.username;
      wx.setStorageSync('users', userinfos);  
      console.log(userinfos[location]);
      app.globalData.USERNAME=this.data.username;
      console.log(app.globalData.USERNAME);
      wx.showToast({
        title: '修改成功',
        duration:2000
      }) 
      wx.navigateBack({
        url: '../index_2/personal',
      })
    }
    else{
      wx.showToast({
        title: '修改失败',
        duration:2000
      }) 
    }
    },
    changePasswordBlur:function(e){
      var userinfos=wx.getStorageSync('users');
      var location=userinfos.findIndex(item=>{
        return item.username==app.globalData.USERNAME})
      if( e.detail.value==''){
        this.setData({
          passwordDecide:false
        })
      }
      else if(e.detail.value==userinfos[location].password){
        this.setData({
          passwordDecide:3
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
   changePasswordAgainBlur(e){
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
   passwordSave:function(){
    if(this.data.passwordDecide==1&&this.data.passwordAgainDecide==1){
      var userinfos=wx.getStorageSync('users');
      var location=userinfos.findIndex(item=>{
        return item.username==app.globalData.USERNAME})
      userinfos[location].password=this.data.password;
      wx.setStorageSync('users', userinfos);  
      wx.showToast({
        title: '修改成功',
        duration:2000
      }) 
      wx.navigateBack({
        url: '../index_2/personal',
      })
    }
    else{
      wx.showToast({
        title: '修改失败',
        duration:2000
      }) 
    }
   },
  onLoad: function (option) {
  
   
  },
  onShow: function(){
    this.setData({
      userAvatarUrl:app.globalData.USERAVATARURL,
      username:app.globalData.USERNAME
    })
  }
})


  

  

 