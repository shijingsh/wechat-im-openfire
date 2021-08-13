const MAX_SIZE = 10400000;
let wholeSize = 0;

export default class MsgSaveManager {
    constructor() {

    }

    /**
     * 保存消息列表
     * @param key  meImId_friendImId
     * @param msg
     */
    static set(key,msg) {
        var chatItems = wx.getStorageSync(key) ||[];
        chatItems.push(msg);
        wx.setStorage({key: key, data: chatItems})
    }

    static get(key) {
        var chatItems =  wx.getStorageSync(key) || [];
        if(chatItems.length>200){
            //限制历史消息显示个数
           return chatItems.slice(200);
        }
        return chatItems;
    }

    static getUnReadNum(myImId,fromImId) {
        var unreadNumKey = myImId + "_" + fromImId+"_unreadNum";
        var unreadNum =  wx.getStorageSync(unreadNumKey) || 0;

        return unreadNum;
    }

    static clearUnReadNum(myImId,fromImId) {
        var unreadNumKey = myImId + "_" + fromImId+"_unreadNum";
        var unreadTotalNumKey = myImId +"_unreadTotalNum";

        var unreadNum =  wx.getStorageSync(unreadNumKey) || 0;
        wx.setStorage({key: unreadNumKey, data: 0});
       
        var unreadTotalNum = wx.getStorageSync(unreadTotalNumKey) ||0;
        unreadTotalNum = unreadTotalNum-unreadNum;
        if(unreadTotalNum<0){
            unreadTotalNum = 0;
        }
        wx.setStorage({key: unreadTotalNumKey, data: unreadTotalNum});

    }

    static getUnReadTotalNum(myImId) {
           var unreadTotalNumKey = myImId +"_unreadTotalNum";
           var unreadNum =  wx.getStorageSync(unreadTotalNumKey) || 0;
    
            return unreadNum;
    } 
}
