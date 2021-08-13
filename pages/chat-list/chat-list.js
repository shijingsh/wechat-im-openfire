// pages/chat-list/chat-list.js
import MsgSaveManager from "../chat/msg-save-manager";
/**
 * 会话列表页面
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        conversations: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //添加好友
        getApp().toAddFriend({your:"vt2107077tcy3qciif"},{nickName:"刘克付"})
        var that = this;
        var myImId = getApp().globalData.userIM.imId;
        getApp().getIMHandler().addUnReadMessageListener({
            listener: (msg) => {
                var list = that.data.conversations;
                list.forEach(function (i, v) {
                    var unread = MsgSaveManager.getUnReadNum(myImId,i.imId);
                    i.unread = unread;
                });
                that.setData({conversations:list});
            }
        });
    },
    onShow() {
        getApp().reInitIM();
    },
    toChat(e) {
        let item = e.currentTarget.dataset.item;
        console.log(`${JSON.stringify(item)}`)
        //delete item.latestMsg;
        //delete item.unread;
        //delete item.content;
        wx.navigateTo({
            url: `../chat/chat?friend=${JSON.stringify(item)}`
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        //获取好友列表
        this.getRoster();
    },
    getConversationsItem(item) {
        let {latestMsg, ...msg} = item;
        return Object.assign(msg, JSON.parse(latestMsg));
    },
    getRoster(notReload) {
        let _this = this;
        var myImId = getApp().globalData.userIM.imId;
        getApp().req("im/friends", 'GET', {},
           function (json) {
            //console.log(json);

            if(json.data.code == 200){
                var list = [];
                if(json.data &&  json.data.data &&  json.data.data.length){
                    list = json.data.data||[];
                }
                list.forEach(function (i, v) {
                    if(!i.icon){
                        i.icon = "https://mis-pv.ciif365.cn/gbhwxApp/user.gif"
                    }
                    if(i.eorName){
                        i.nickName = i.eorName;
                    }
                    var unread = MsgSaveManager.getUnReadNum(myImId,i.imId);
                    i.friendId = i.imId;
                    i.unread = unread;
                });
                _this.setData({conversations:list});
            }
            
        });
    },
    loadUnReadMsg() {

        getApp().req("https://im.365me.me/im/getImUnReadMsgUser.do" , 'GET', {im_user:"zhuban1"},
            function (json) {
                if (json.execResult && json.execDatas) {

                }
            }
        );
    },
});
