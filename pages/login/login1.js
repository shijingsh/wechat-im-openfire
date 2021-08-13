// pages/login/login1.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{ title: '我是观众', value: 0,img:'au_' }, { title: '我是参展商', value: 1 ,img:'ex_'}],
    value: 2,
    name: '',
    code:null,
    pwd: '',
    checked: false,
    userType:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    if(typeof options.userType=='undefined'){
      options.userType=wx.getStorageSync('loginType')
    }
    this.setData({
      userType: options.userType
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if(options.userType == 1){
      this.setData({
        value:1,
        items: [{ title: '我是观众', value: 0,img:'au_',hidden:true }, { title: '我是参展商', value: 1 ,img:'ex_',checked:true}],
        userType:1
      })
    }
  },
  name (e) {
    this.setData({
      name: e.detail.value
    })
  },
  pwd (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  check(e) {
    console.log(e)
    let checked = e.detail.value[0]
    if(checked=='selected'){
      this.setData({
        checked: true
      })
    }else{
      this.setData({
        checked: false
      })
    }

  },
  radioChange (e) {
    console.log(e.detail.value);
    this.setData({
      value: e.detail.value
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        var obj = {
          detail:{
            userInfo:res.userInfo
          }
        }
        this.onGotUserInfo(obj);
      }
    })
  },
  onGotUserInfo(e) {
    app.popLoading()
    let that = this;

    if (e.detail.userInfo) {
      if (that.data.value == 0) {//我是观众
        // if (this.data.checked == false) {
        //   app.popTest('请阅读并同意《隐私权政策》《用户服务协议》');
        //   return;
        // }else{

          that.saveUserInfo(e.detail.userInfo,e.detail,0)
          return;
        // }
      }
      if (that.data.value == 1) {//我是参展商
        if (this.data.name == '') {
          app.popTest('请输入您的账号');
          return;
        }
        if (this.data.pwd == '') {
          app.popTest('请输入您的密码');
          return;
        }
      }
      let userInfo = e.detail.userInfo;
      userInfo.usercode = this.data.name;
      userInfo.password = this.data.pwd;
      that.saveUserInfo(userInfo,e.detail,1)
      // if (that.data.tabIndex == 0) {
      //   app.req('visitorWMP/register/s2', 'post', {
      //     usercode: that.data.username,
      //     password: that.data.password,
      //     nickName: userInfo.nickName,
      //     icon: userInfo.avatarUrl,
      //     gender: userInfo.gender
      //   }, function (res) {
      //     if (res.data.code == '200') {
      //       wx.redirectTo({
      //         url: 'informationExhibits?type=' + that.data.tabIndex,
      //       })
      //     }

      //   })
      // }

    }else{
      //let userInfo = {};
      //userInfo.usercode = this.data.name;
      //userInfo.password = this.data.pwd;
      //this.saveUserInfo(userInfo,1)
    }
  },
  saveUserInfo: function (userInfo,detail,type) {
    let that = this;

/*     wx.getSetting({
      success: resSet => {
        if (resSet.authSetting['scope.userInfo']) {

          wx.getUserInfo({
            success: res => {
              console.log("=========================getUserInfo===========================");
              console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              //that.globalData.userMobileInfo = res;
              that.getInfo(userInfo,type,res)
            }
          })

        }else{
          that.getInfo(userInfo,type,{})
        }
    }}) */
    wx.login({
      complete: (res) => {
        console.log(res.code)
        that.code = res.code
        that.getInfo(userInfo,type,detail)
      },
    })
  },
  getInfo(userInfo,type,res){
    let that = this;
    let param = {
      nickName:userInfo.nickName,
      icon:userInfo.avatarUrl,
      type: type,
      code:that.code,
      iv: res.iv,
      encryptedData: res.encryptedData,
      signature:res.signature,
    }
    if(userInfo.usercode){
      param.usercode = userInfo.usercode;
    }
    if(userInfo.usercode){
      param.password = userInfo.password;
    }
    let url = app.globalData.url + 'visitorWMP/register/s3';//观众
    if(type==1){
      url = app.globalData.url + 'visitorWMP/register/s2';//参展商
    }
    if(that.data.userType==1){
      url = app.globalData.url + 'visitorWMP/register/s2new';//参展商切换
    }
    console.log('传入参数：',param);
    wx.request({
      method: 'post',
      url: url,
      data: param,
      header: {
        'content-type': 'application/json',
        'openId': wx.getStorageSync('openId'),
        'unionId': wx.getStorageSync('unionId'),
        'sessionId': wx.getStorageSync('sessionId'),
        'code':that.code,
        'Authorization': 'Bearer '+wx.getStorageSync('token')
      },
      success: res => {
        wx.hideToast()
        if (res.data.code == '200') {
          console.log(res.data)
          wx.setStorageSync('unionId', res.data.data.unionId);
          if(that.data.value == 1 || res.data.data.step>=4){
            wx.setStorageSync('openId', res.data.data.openId);
            wx.setStorageSync('sessionId', res.data.data.sessionId);
            wx.setStorageSync('step', res.data.data.step);
            wx.setStorageSync('token', res.data.data.token);
            wx.setStorageSync('userType', res.data.data.userProfile.userType);
            wx.setStorageSync('loginType', res.data.data.userProfile.loginType);
            app.globalData.icon = res.data.data.userProfile.icon;
            app.globalData.nickname = res.data.data.userProfile.nickName;
            app.globalData.userType = res.data.data.userProfile.userType;
            app.globalData.loginType = res.data.data.userProfile.loginType;
            // globalData 存微信头像昵称 在comps/chat/inputbar/suit/main发送消息时存入
              wx.setStorage({
                key: "myUsername",
                data: res.data.data.userProfile.imId//im登录账户
              });
              // WebIM.conn.open({
              //   apiUrl: WebIM.config.apiURL,
              //   user: res.data.data.userProfile.imId,//im登录账户
              //   pwd: 'exhibition@365me#Pwd1586',
              //   appKey: WebIM.config.appkey
              // });
              wx.showToast({
                icon:'none',
                title: '登录成功',
                duration:2000
              })
             app.onLaunch()
             wx.switchTab({
              url: '/pages/newindex/newindex',
            })
          }else{
            wx.hideLoading({ })
            wx.navigateTo({
              url: '/pages/login/login2?type='+type,
            })
          }

        }else{
          app.popTest(res.data.message);
          return;
        }
      }
    })

  }
})
