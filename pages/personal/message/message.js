const app = getApp();

Page({
  data: {
    userAvatarUrl:app.globalData.USERAVATARURL,
    selectPoster:2
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
    },
    userAvatarUrlSave:function(){
      var userinfos=wx.getStorageSync('users');
      var location=userinfos.findIndex(item=>{
        return item.username==app.globalData.USERNAME})
      userinfos[location].userAvatarUrl=this.data.userAvatarUrl;
      wx.setStorageSync('users', userinfos);  
      console.log(userinfos[location]);
      app.globalData.USERAVATARURL=this.data.userAvatarUrl;
      console.log(app.globalData.USERAVATARURL);
      wx.navigateBack({
        url: '../index_2/personal',
      })
    },
  onLoad: function (option) {
  
   
  }
})


  

  

 