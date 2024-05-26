const app = getApp();

Page({
  data: {
    user:app.globalData.USER,
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
      if(avatarUrl==this.data.user.avatar){
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
        app.globalData.USER.avatar=this.data.userAvatarUrl;
        app.globalData.USERAVATARURL=this.data.userAvatarUrl;
        this.updateUser(app.globalData.USER);
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
        if( e.detail.value==''){
          this.setData({
            userDecide:false
          })
        }
        else{
     this.setData({
       userDecide:1,
       username:e.detail.value
     })
     console.log(this.data.username);
    }
    },
    usernameSave:function(){
      if(this.data.userDecide==1){
        var that=this;
        wx.request({
          url: 'http://localhost:8080/user/userInfo?username='+this.data.username,
          method:'GET',
          data:{},
          header:{
            'content-type':'application/json'
          },
          success(res){
            console.log(res);
            if(res.data=='未找到该用户'){
              app.globalData.USER.username=that.data.username;
              app.globalData.USERNAME=that.data.username;
              that.updateUser(app.globalData.USER);
              wx.showToast({
                title: '修改成功',
                duration:2000
              }) 
              wx.navigateBack({
                url: '../index_2/personal',
              })
            }
            else {
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
          title: '修改失败',
          duration:2000
        }) 
      }
    },
    changePasswordBlur:function(e){
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
     app.globalData.USER.password=this.data.password;
     this.updateUser(app.globalData.USER);
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
  onLoad: function (option) {
  
   
  },
  onShow: function(){
    this.setData({
      userAvatarUrl:app.globalData.USERAVATARURL,
      username:app.globalData.USERNAME
    })
  }
})


  

  

 