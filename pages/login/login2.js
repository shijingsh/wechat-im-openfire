// pages/login/login2.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    labs: [],
    list: [
      {
        title: '请选择您感兴趣的行业（最多3个）',
        maxNum: 3,
        nowNum:0,
        list: [
          {name:'选项',value:0,flag:0},
          { name: '选项', value: 0, flag: 0 },
          { name: '选项', value: 0, flag: 0 },
          { name: '选项', value: 0, flag: 0 },
          { name: '选项', value: 0, flag: 0 },
          { name: '选项', value: 0, flag: 0 },
          { name: '选项', value: 0, flag: 0 }
        ]
      }
    ]
  },
  select (e) {
    let that = this;
    let list = that.data.list;
    let index = e.currentTarget.dataset.index;
    let inde = e.currentTarget.dataset.inde;
    if (list[index].list[inde].flag == 0){
      if(list[index].nowNum>=list[index].maxNum){
        app.popTest("最多选择"+ list[index].maxNum +"个");
      }else{
        list[index].list[inde].flag = 1;
        list[index].nowNum++;
      }

    }else{
      list[index].list[inde].flag = 0;
      list[index].nowNum--;
    }

    that.setData({
      list: list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = options.type;
    this.getList();
  },
  getList () {
  /*  let that = this;
    app.req('visitorWMP/register/labs','GET','',function(res){
      let list = [];
      res.data.data.labs.forEach(function(t){
        let list1 = [];
        t.values.forEach(function(i){
          list1.push({
            name: i, value: 0, flag: 0
          })
        })
        list.push({
          title:t.name,
          maxNum: t.maxSelectNum,
          nowNum: 0,
          list: list1
        })
      })
      that.setData({
        labs: res.data.data.labs,
        list: list
      })
    })
*/
  },
  onGotUserNumber:function(e){
    let labs=[];
    this.data.list.forEach(function(t){
      let values = [];
      t.list.forEach(function(i){
        if(i.flag == 1){
          values.push(i.name);
        }
      })
      labs.push({
        name:t.title,
        maxSelectNum: t.maxNum,
        values: values
      })
    })
    console.log(e);
    if (e.detail.iv){
      var ivObj = e.detail.iv
      var telObj = e.detail.encryptedData
      var codeObj = "";
      var that = this;
      that.saveUserInfo(this.code, ivObj, telObj, labs);

    }else{
      //用户拒绝授权
      wx.reLaunch({
        url: '/pages/chat-list/chat-list',
      })
    }

    // that.saveUserInfo('15921359796')
  },
  saveUserInfo: function (code, ivObj, telObj,labs) {
    let that = this;
    let param = {
      iv: ivObj,
      encryptedData: telObj,
      type:0, //用户类型 0 观众  1 参展商
      // labs:labs
    }
    wx.request({
      method: 'post',
      url: app.globalData.url + 'visitorWMP/register/s4',
      data: param,
      header: {
        'content-type': 'application/json',
        'openId': wx.getStorageSync('openId'),
        'unionId': wx.getStorageSync('unionId'),
        'sessionId': wx.getStorageSync('sessionId'),
        'token': wx.getStorageSync('token'),
        'code':wx.getStorageSync('code')
      },
      success: res => {
        wx.hideToast()
        if (res.data.code == '200') {
          wx.setStorageSync('token', res.data.data.token);
          app.globalData.icon = res.data.data.userProfile.icon;
          app.globalData.nickname = res.data.data.userProfile.nickName;
          app.globalData.userType = res.data.data.userProfile.userType
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
         app.onLaunch()
         wx.switchTab({
           url: '/pages/chat-list/chat-list',
         })
        }
      }
    })
  },
  //授权手机号码前login
  getCode(){
    wx.login({
      success: (res) => {
        console.log(res)
        wx.setStorageSync('code', res.code)
        this.code = res.data
      },
    })
  }
})
