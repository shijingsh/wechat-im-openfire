const CONFIG = require('config.js')


import AppIMDelegate from "./delegate/app-im-delegate";

App({
    //ToastPannel,
    globalData: {
        statusHeight: 0,
        sharePosition: {
            x: wx.getSystemInfoSync().windowWidth - 30 / wx.getSystemInfoSync().pixelRatio - 70,
            y: wx.getSystemInfoSync().windowHeight - 140 / wx.getSystemInfoSync().pixelRatio - 70
        },
        navHeight: 0,
        unReadMessageNum: 0,
        userInfo: null,
        saveFriendList: [],
        saveGroupInvitedList: [],
        isIPX: false, //是否为iphone X
        imgUrl: CONFIG.imgUrl,
        url: CONFIG.url,
        first: 1,
        bigIphone: false,
        nickname: '',
        icon: '',
        userType: 0,
        checkLogin: false,
        loginType: 0,
        exhibitionCode: 'A84710411865161728',
        userMobileInfo: {},
        loginCallbackList: [],
        isAuthing: false,
        userIM: {
            imId: ""
        },
    },

    getIMHandler() {
        if(this.appIMDelegate)
            return this.appIMDelegate.getIMHandlerDelegate();
        else
            return {}
    },
    onLaunch(options) {
        wx.setStorageSync('firstAdv', true)

        var me = this;
        let that = this,
            sysinfo = wx.getSystemInfoSync(),

            statusHeight = sysinfo.statusBarHeight,
            isiOS = sysinfo.system.indexOf('iOS') > -1,
            navHeight;

        isiOS ? (navHeight = 48) : (navHeight = 44);
        that.globalData.statusHeight = statusHeight;
        that.globalData.navHeight = navHeight;
        //
        //console.log(sysinfo)
        if (sysinfo.model.indexOf('iPhone X') > -1 || sysinfo.model.indexOf('iPhone 11') > -1) {
            that.globalData.bigIphone = true;
        }


        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {

                            that.globalData.userMobileInfo = res;
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            that.doLogin(function () {

                            })
                        }
                    })
                } else {
                    that.globalData.userMobileInfo = {};
                    that.doLogin(function () {

                    })
                }
            }
        })


        this.checkIsIPhoneX();


    },
    onShow(){
        this.isLogin();
    },
    reInitIM: function () {
        //im 重连，判断是否断线
        let options = {};
        if (this.appIMDelegate) {
            this.appIMDelegate.onShow(options);
        } else {
            this.appIMDelegate = new AppIMDelegate(this);
            this.appIMDelegate.onLaunch(options);
            this.appIMDelegate.onShow(options);
        }
    },

    checkIsIPhoneX: function () {
        const me = this
        wx.getSystemInfo({
            success: function (res) {
                // 根据 model 进行判断
                if (res.model.search('iPhone X') != -1) {
                    me.globalData.isIPX = true
                }
            }
        })
    },
    login: function (code, userType, callback) {
        let that = this;
        wx.request({
            method: 'POST',
            url: CONFIG.url + 'visitorWMP/auth1?code=' + code + "&loginType=" + userType,
            data: {
                iv: that.globalData.userMobileInfo.iv,
                encryptedData: that.globalData.userMobileInfo.encryptedData,
                signature: that.globalData.userMobileInfo.signature,
            },
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                wx.hideToast()
                console.log("登录：：", res);
                if (res.data.code == '200') {
                    wx.setStorageSync('userCode', res.data.data.userCode);
                    wx.setStorageSync('unionId', res.data.data.unionId);
                    wx.setStorageSync('openId', res.data.data.openId);
                    wx.setStorageSync('sessionId', res.data.data.sessionId);
                    wx.setStorageSync('step', res.data.data.step);
                    wx.setStorageSync('token', res.data.data.token);
                    // globalData 存微信头像昵称 在comps/chat/inputbar/suit/main发送消息时存入
                    wx.setStorageSync('userType', res.data.data.userProfile.userType);
                    wx.removeStorageSync('loginType');
                    if (res.data.data.step >= 4) {

                        wx.setStorageSync('loginType', res.data.data.userProfile.loginType);
                        wx.setStorageSync('userCode', res.data.data.userProfile.userCode);
                        that.globalData.icon = res.data.data.userProfile.icon;
                        that.globalData.nickname = res.data.data.userProfile.nickName;
                        that.globalData.userType = res.data.data.userProfile.userType;
                        that.globalData.loginType = res.data.data.userProfile.loginType;
                        //console.log(res.data.data.userProfile.imId, res.data.data.userProfile.userType);
                        // res.data.data.userProfile.imId = 'p81363510524641280';
                        that.globalData.userIM = res.data.data.userProfile;
                        wx.setStorage({
                            key: "myUsername",
                            data: res.data.data.userProfile.imId //im登录账户
                        });
                        that.reInitIM();
                        //console.log("mid::::", res.data.data.userProfile.imId, WebIM.config.apiURL);
                        // WebIM.conn.open({
                        //   apiUrl: WebIM.config.apiURL,
                        //   user: res.data.data.userProfile.imId, //im登录账户
                        //   pwd: 'exhibition@365me#Pwd1586',
                        //   appKey: WebIM.config.appkey
                        // });
                    }
                }
            },
            complete() {
                callback && callback();
            }
        })
    },
    doLogin(callback) {
        var that = this;
        if (!that.globalData.isAuthing) {
            that.globalData.isAuthing = true;
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    wx.setStorageSync('code', res.code);
                    wx.removeStorageSync('openId');
                    wx.removeStorageSync('unionId');

                    let userType = wx.getStorageSync('loginType') || 0;
                    that.login(res.code, userType, function () {
                        that.globalData.isAuthing = false;
                        if (callback) {
                            callback();
                        }
                        that.globalData.loginCallbackList.forEach(function (itemCallback, index) {
                            if (itemCallback) {
                                itemCallback()
                            }
                        })

                        that.globalData.loginCallbackList = [];
                    });
                }
            })
        } else {
            that.globalData.loginCallbackList.push(callback);
        }

    },
    req: function (url, method, data, callBack, noExhi) {
        let that = this;
        let timerNum = 0;
        let dataAll = data || {};
        if (!noExhi) {
            let key = 'exhibitionCode'
            dataAll[key] = that.globalData.exhibitionCode
        }

        that.popLoading();
        //console.log("OpendID::::", wx.getStorageSync('openId'));
        //console.log('Bearer '+wx.getStorageSync('token'))
        if (wx.getStorageSync('openId')) {
            wx.request({
                method: method,
                url: CONFIG.url + url,
                data: dataAll,
                header: {
                    'unionId': wx.getStorageSync('unionId'),
                    'openId': wx.getStorageSync('openId'),
                    'userCode': wx.getStorageSync('userCode'),
                    'sessionId': wx.getStorageSync('sessionId'),
                    'Authorization': 'Bearer ' + wx.getStorageSync('token')
                },
                complete: function (res) {
                    wx.hideLoading();
                    //console.log("3:", res);
                    //let msg = res.data.msg;
                    if (res.data && res.data.code != '200') {
                        // that.popTest(res.data.message);
                    }
                },
                success: callBack
            })
        } else {

            that.doLogin(function () {
                wx.request({
                    method: method,
                    url: CONFIG.url + url,
                    data: dataAll,
                    header: {
                        'unionId': wx.getStorageSync('unionId'),
                        'openId': wx.getStorageSync('openId'),
                        'sessionId': wx.getStorageSync('sessionId'),
                        'Authorization': 'Bearer ' + wx.getStorageSync('token')
                    },
                    complete: function (res) {
                        wx.hideLoading();

                        //let msg = res.data.msg;
                        if (res.data.code != '200') {
                            that.popTest(res.data.message);
                            // reject()
                        }
                    },
                    success: callBack
                })
            })

            // let timer = setInterval(function () {
            //   timerNum++;
            //   if (wx.getStorageSync('openId') || timerNum >= 10) {
            //     clearInterval(timer);
            //     wx.request({
            //       method: method,
            //       url: CONFIG.url + url,
            //       data: dataAll,
            //       header: {
            //         'openId': wx.getStorageSync('openId'),
            //         'sessionId': wx.getStorageSync('sessionId'),
            //         'token': wx.getStorageSync('token')
            //       },
            //       complete: function (res) {
            //         console.log("登录：：：", res);
            //         wx.hideLoading();
            //         console.log("2:", res);
            //         let msg = res.data.msg;
            //         if (res.data.code != '200') {
            //           // that.popTest(res.data.message);
            //         }
            //       },
            //       success: callBack
            //     })
            //   }
            // }, 500)
        }


    },
    uploadImgs: function (src, callback) {
        let that = this;
        that.popLoading();
        wx.uploadFile({
            url: CONFIG.url + 'fileWMP/upload', //仅为示例，非真实的接口地址
            filePath: src,
            name: 'file',
            header: {
                'unionId': wx.getStorageSync('unionId'),
                'openId': wx.getStorageSync('openId'),
                'userCode': wx.getStorageSync('userCode'),
                'sessionId': wx.getStorageSync('sessionId'),
                'Authorization': 'Bearer ' + wx.getStorageSync('token')
            },
            formData: {
                type: ''
            },
            success: callback,
            complete: function () {
                wx.hideLoading();
            }
        })
    },

    //纯文字弹窗
    popTest: function (txt) {
        wx.showToast({
            title: txt,
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            duration: 2000
        })
    },

    popLoading: function () {
        wx.showLoading({
            title: '中国工博会在线',
            mask: true
        });
    },
    // 连线开关
    openLive() {
        new Promise((reslove, reject) => {
            this.req('exhibitorLiveBroadcast/getLiveSwitch', 'GET', {}, function (res) {
                let cur = getCurrentPages()[getCurrentPages().length - 1]
                //console.log(res, "环信连线开关");
                cur.setData({
                    openLive: res.data.data.status
                })
                reslove();
            })
        })
    },
    // 判断是否需要登录
    isLogin() {
        let that = this
        if (!wx.getStorageSync('token') && wx.getStorageSync('step') < 4) {
            wx.showModal({
                title: '提示',
                content: '登录失效，请登录！',
                success: function (res) {
                    if (res.confirm) {
                        that.judgeLogin()
                    }
                }
            })
            return
        } else {
            return true
        }
    },
    judgeLogin() {
        if (wx.getStorageSync('step') == 3) {
            wx.redirectTo({
                url: '../login/login2',
            })
        } else {
            wx.redirectTo({
                url: '../login/login1',
            })
        }
    },

    onUnload() {
        if (this.appIMDelegate) {
            this.appIMDelegate.onHide();
        }
    },

    toChat(friendObject) {
        var that = this;
        if (friendObject.your) {
            //"p81363737923026944ciif"
            this.req('im/friends/' + friendObject.your, 'GET', {openId: wx.getStorageSync('openId')}, function (res) {
                console.log("获取IM用户信息：", res);
                var imUser = res.data.data;
                imUser.friendId = imUser.imId;
                if (imUser.isFriend) {

                    wx.navigateTo({
                        url: `/packageC/pages/chat/chat?friend=${JSON.stringify(imUser)}`
                    });
                } else {
                    that.toAddFriend(friendObject, imUser);
                }
                // debugger
            })
        }

    },
    toAddFriend(friendObject, imUser) {
        var imId = friendObject.your
        var param = {
            openId: wx.getStorageSync('openId'),
            friendImId: imId,
            friendName: imUser.nickName
        }
        this.req('im/addFriend', 'GET', param, function (res) {
            console.log("im添加 好友：", res);
            if (res.data.code = 200) {
                wx.navigateTo({
                    url: `/packageC/pages/chat/chat?friend=${JSON.stringify(imUser)}`
                });
            } else {
                wx.showToast({
                    title: "添加好友失败！"
                });
            }
        })
    }
});

