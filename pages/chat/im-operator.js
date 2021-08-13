import {dealChatTime} from "../../utils/time";
import MsgSaveManager from "./msg-save-manager";
/**
 * 这个类是IM模拟类，作为示例仅供参考。
 */
export default class IMOperator {
    static VoiceType = 'voice';
    static TextType = 'chat';
    static ImageType = 'pic';
    static CustomType = 'custom';

    constructor(page, opts) {

        this._opts = opts;
        this._latestTImestamp = 0;//最新消息的时间戳

    }

    getFriendId() {
        return this._opts.friendId;
    }

    onSimulateReceiveMsg(cbOk) {
/*        getApp().getIMHandler().sendMsg({
            content: {
                type: 'get-history',
                userId: getApp().globalData.userIM.imId,
                friendId: this.getFriendId()
            }
        });*/
        getApp().getIMHandler().setOnReceiveMessageListener({
            listener: (msg) => {
                if (!msg) {
                    return;
                }
                if(msg && msg.message && msg.message.body){
                    console.log("=======================接收到消息=======================");
                    console.log(msg);
                }
                if(msg && msg.message){
                    var message = msg.message;
                    var isMy = false;
                    var myImId = getApp().globalData.userIM.imId;

                    if(message && message._from){
                        isMy = message._from.startsWith(myImId);
                    }
                    var body = message.body;
                    if(body){
                        var bodyJson = JSON.parse(body);
                        var item = null;
                        bodyJson.body = bodyJson.msg;
                        bodyJson.isMy = isMy;
                        item = this.createNormalChatItem(bodyJson);

                        if( bodyJson.from && item){
                            console.log("====================保存聊天记录====================");
                            var myImId = getApp().globalData.userIM.imId;
                            var key = myImId+"_"+bodyJson.from;
                           
                            MsgSaveManager.set(key,item);
                        }

                        // const item = this.createNormalChatItem({type: 'voice', content: '上传文件返回的语音文件路径', isMy: false});
                        // const item = this.createNormalChatItem({type: 'image', content: '上传文件返回的图片文件路径', isMy: false});
                        if(item){
                            if(!item.timestamp){
                                item.timestamp = new Date();
                            }
                            this._latestTImestamp = item.timestamp;
                            //这里是收到好友消息的回调函数，建议传入的item是 由 createNormalChatItem 方法生成的。
                            cbOk && cbOk(item);
                        }
                    }
                }
            }
        });

    }

    onStatusChange(cbOk) {
        getApp().getIMHandler().setOnSocketStatusChangeListener({
            listener: (status) => {
                cbOk(status)
            }
        });
    }

    async onSimulateSendMsg({content}) {
        //这里content即为要发送的数据
        //这里的content是一个对象了，不再是一个JSON格式的字符串。这样可以在发送消息的底层统一处理。
        try {
            const {content: contentSendSuccess} = await getApp().getIMHandler().sendMsg({content});
            //这个contentSendSuccess格式一样,也是一个对象
            const msg = this.createNormalChatItem(contentSendSuccess);
            this._latestTImestamp = msg.timestamp;
            return Promise.resolve({msg});
        } catch (e) {
            return Promise.reject(e);
        }
    }

    createChatItemContent({type = IMOperator.TextType, body = '', duration} = {}) {
        if (!body.replace(/^\s*|\s*$/g, '')) return;
        return {
            content:body,
            type,
            conversationId: 0,//会话id，目前未用到
            userId: getApp().globalData.userIM.imId,
            friendId: this.getFriendId(),//好友id
            duration
        };
    }

    createNormalChatItem({type = IMOperator.TextType, body = '', isMy = true, duration} = {}) {
        if (!body) return;
        const currentTimestamp = Date.now();
        const time = dealChatTime(currentTimestamp, this._latestTImestamp);
        let obj = {
            msgId: 0,//消息id
            friendId: this.getFriendId(),//好友id
            isMy,//我发送的消息？
            showTime: time.ifShowTime,//是否显示该次发送时间
            time: time.timeStr,//发送时间 如 09:15,
            timestamp: currentTimestamp,//该条数据的时间戳，一般用于排序
            type,//内容的类型，目前有这几种类型： text/voice/image/custom | 文本/语音/图片/自定义
            content:body,// 显示的内容，根据不同的类型，在这里填充不同的信息。
            //headUrl: isMy ? this._myHeadUrl : this._otherHeadUrl,//显示的头像，自己或好友的。
            sendStatus: 'success',//发送状态，目前有这几种状态：sending/success/failed | 发送中/发送成功/发送失败
            voiceDuration: duration,//语音时长 单位秒
            isPlaying: false,//语音是否正在播放
        };
        if (type !== IMOperator.TextType) {
            obj.saveKey = body;//saveKey是存储文件时的key
        }
        return obj;
    }

    static createCustomChatItem() {
        return {
            timestamp: Date.now(),
            type: IMOperator.CustomType,
            content: '会话已关闭'
        }
    }

}

