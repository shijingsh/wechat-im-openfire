import IIMHandler from "../interface/i-im-handler";
import X2JS from '../../../utils/x2js';
import ObjTree from '../../../utils/ObjTree';
import {dealChatTime} from "../../../utils/time";

/**
 * 消息格式样例
 {
  "type": "pic",
  "to": "m-tec",
  "sendTo": "m-tec@365me",
  "msg": "https://viewfiles.365me.me/picUpload/im_images/tanxin/2f534b817bab420c9cffe9d64d87f4d2.jpg",
  "pkId": "7d9d506580f9499ab15c4e2067c04934",
  "dateline": "2021-08-11T05:56:39.439Z",
  "from": "tanxin"
}

 {
  "type": "chat",
  "to": "m-tec",
  "sendTo": "m-tec@365me",
  "msg": "1111",
  "dateline": "2021-08-11T06:01:25.942Z",
  "from": "tanxin"
}
 */

const btoa = require('../../../utils/base64.min').btoa


let id = null;
var domain = "365me";
var xmlns = "urn:ietf:params:xml:ns:xmpp-framing";
var version = "1.0";
var xmllang = "zh";
var resource = "weiAppClient";

var password = "exhibition@365me#Pwd1586";

function getUserName() {
    var name = getApp().globalData.userIM.imId;
    name = name.toLowerCase();

    return name;
}

function getFrom() {
    return getUserName() + "@" + domain;
}

export default class WebSocketHandlerImp extends IIMHandler {
    constructor() {
        super();
        this._onSocketOpen();
        this._onSocketMessage();
        this._onSocketError();
        this._onSocketClose();


    }

    /**
     * 创建WebSocket连接
     */
    createConnection({options}) {
        var that = this;
        if (!this._isLogin && !this._isLogining) {
            this._isLogining = true;
            this.socketTask = wx.connectSocket({
                url: options.url,
                protocols: ['xmpp']
            });

            this.socketTask.onOpen(function (res) {
                //console.log('onOpen', res)
                connwsopen()
            })
        }

        function connwsopen() {

            var temp = {
                "open": {
                    "-to": domain,
                    "-from": getFrom(),
                    "-xmlns": xmlns,
                    "-xml:lang": xmllang,
                    "-version": version
                }
            };
            //转化为xml
            var loginXml = that.json2xml(temp)
            that.socketTask.send({data: loginXml})
        }
        //console.log("======================createConnection======================")
        if (this._isLogin){
            if(this._socketStatusChangeListener){
                this._socketStatusChangeListener(1);
            }
        }
    }

    //json转xml
    json2xml(jsonstring) {
        var xotree = new ObjTree();
        var xml = xotree.writeXML(jsonstring);
        //使用jkl-dumper.js中的formatXml方法将xml字符串格式化
        //var xmlText = formatXml(xml);
        return xml;
    }

    //xml转json
    xml2json(xmlstring) {
        //将xml字符串转为json
        var x2js = new X2JS();
        var json = x2js.xml2js(xmlstring);
        //console.log('转换成json', json)
        return json;
    }

    _sendMsgImp({content, success, fail}) {
        var friendId = "p81363497635545088ciif";
        if (content.friendId) {
            friendId = content.friendId
        }
        var msgBody = {
            "type": content.type,
            "to": content.friendId,
            "sendTo":  content.friendId+"@"+domain,
            "msg": content.content,
            "dateline": new Date().getTime(),
            "from": content.userId
          }
        if(content.duration){
            //语音时长
            msgBody.duration = content.duration
        }
        var promise = this.send(friendId,JSON.stringify(msgBody));
        content.body = content.content;
        promise.then(function () {
            success && success({content});
        }).catch(function (error) {
            fail && fail(error);
        })
    }


    /**
     * 关闭webSocket
     */
    closeConnection() {
        wx.closeSocket();
    }

    _onSocketError(cb) {
        console.log('_onSocketError 发生错误，请检查！');
        wx.onSocketError((res) => {
            //this._isLogin = false;
            //this._isLogining = false;
            console.log('WebSocket连接打开失败，请检查！', res);
        })
    }

    _onSocketClose(cb) {
        wx.onSocketClose((res) => {
            this._isLogin = false;
            this._isLogining = false;
            console.log('WebSocket 已关闭！', res)
        });
        if(this._socketStatusChangeListener){
            this._socketStatusChangeListener(0);
        }
    }

    _onSocketOpen() {
        wx.onSocketOpen((res) => {
            console.log('WebSocket连接已打开！');
        });
    }

    /**
     * webSocket是在这里接收消息的
     * 在socket连接成功时，服务器会主动给客户端推送一条消息类型为login的信息，携带了用户的基本信息，如id，头像和昵称。
     * 在login信息接收前发送的所有消息，都会被推到msgQueue队列中，在登录成功后会自动重新发送。
     * 这里我进行了事件的分发，接收到非login类型的消息，会回调监听函数。
     * @private
     */
    _onSocketMessage() {
        let that = this;
        wx.onSocketMessage((res) => {
            let data = res.data;
            let jsondata = that.xml2json(data);
            //console.log("接收到的", jsondata);

            if (undefined != jsondata.message) {
                if (undefined != jsondata.message.body) {
                    //console.log("收到的消息：", jsondata.message.body);
                } else if (undefined != jsondata.message.composing) {
                    // document.getElementById("isloginsuccess").innerHTML = "对方正在输入";
                } else if (undefined != jsondata.message.gone) {
                    // document.getElementById("isloginsuccess").innerHTML = "对方已关闭和您的聊天";
                } else if (undefined != jsondata.message.file) {
                    //console.log("收到的文件：", jsondata.message);
                } else {

                }
            } else if (undefined != jsondata.open) {
                //记录id
                id = jsondata.open["_id"];
                //console.log(id);
            } else if (undefined != jsondata["features"]) {
                if (undefined != jsondata["features"].mechanisms) {
                    //获取登录验证方式
                    that.auth(jsondata["features"].mechanisms.mechanism[0]);
                } else if (undefined != jsondata["features"].bind) {
                    that.bind();
                } else {
                    //Do-nothing
                }
            } else if (undefined != jsondata.failure) {
                this._isLogin = false;
                this._isLogining = false;
                console.log("登录失败，用户名或者密码错误");
                this.closeConnection();
            } else if (undefined != jsondata.success) {
                this._isLogin = true;
                this._isLogining = false;
                console.log("登录成功！");
                //发起新的流
                that.newopen();

                if(this._socketStatusChangeListener){
                    this._socketStatusChangeListener(1);
                }
            } else if (undefined != jsondata.iq) {
                if (undefined != jsondata.iq.bind) {
                    //获取session会话
                    that.getsession();
                } else {
                    that.presence();
                }
            } else {
                //Do-nothing
            }

            if(this._receiveListener){
                this._receiveListener(jsondata);
            }else{
                //保存离线消息
                var msg = jsondata;
                if(msg && msg.message && msg.message.body){
                    console.log("=======================接收到离线消息  保存到聊天记录=======================");
                    console.log(jsondata);
                    var message = msg.message;
                    var body = message.body;
                    if(body) {
                        var bodyJson = JSON.parse(body);
                        var item = null;
                        var isMy = false;
                        var myImId = getApp().globalData.userIM.imId;

                        if(message && message._from){
                            isMy = message._from.startsWith(myImId);
                        }

                        bodyJson.body = bodyJson.msg;
                        bodyJson.isMy = isMy;
                        const currentTimestamp = Date.now();
                        const time = dealChatTime(currentTimestamp, bodyJson.dateline);

                        item = {
                            "msgId": 0,
                            "friendId": bodyJson.from,
                            "isMy": isMy,
                            "showTime": true,
                            "time": time.timeStr,
                            "timestamp": bodyJson.dateline,
                            "type": bodyJson.type,
                            "content": bodyJson.msg,
                            "headUrl": "https://mis-pv.ciif365.cn/gbhwxApp/user.gif",
                            "sendStatus": "success",
                            "isPlaying": false
                        };

                        if (bodyJson.from) {
                            console.log("====================保存离线消息记录====================");
                            var myImId = getApp().globalData.userIM.imId;
                            var key = myImId + "_" + bodyJson.from;

                            var chatItems = wx.getStorageSync(key) ||[];
                            chatItems.push(item);
                            wx.setStorage({key: key, data: chatItems})

                            //未读消息个数
                            var unreadNumKey = myImId + "_" + bodyJson.from+"_unreadNum";
                            var unreadNum = wx.getStorageSync(unreadNumKey) ||0;
                            wx.setStorage({key: unreadNumKey, data: unreadNum+1});

                            //未读消息总个数
                            var unreadTotalNumKey = myImId +"_unreadTotalNum";
                            var unreadTotalNum = wx.getStorageSync(unreadTotalNumKey) ||0;
                            wx.setStorage({key: unreadTotalNumKey, data: unreadTotalNum+1});
                        }
                        //触发未读消息监听
                        if(this._unreadListener && this._unreadListener.length){
                            this._unreadListener.forEach(function(_unreadListenerCallback, v){
                                _unreadListenerCallback(jsondata);
                            })
                        }
                    }
                }
            }

        })
    }

    auth(authentication) {
        //字符串格式是：jid+password，以\0作为分隔符
        var temp = getUserName() + "@" + domain + "\0" + password;
        //Base64编码
        var token = btoa(temp);
        //console.log("==================登陆openfire==================")
        //console.log(getUserName(), 'im')
        //console.log(password, 'password')
        //console.log(token, 'token')
        // var message = "<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='PLAIN'>" + token + "</auth>";
        var message = {
            "auth": {
                "-xmlns": "urn:ietf:params:xml:ns:xmpp-sasl",
                "-mechanism": authentication,
                "#text": token
            }
        };
        var steam = this.json2xml(message);
        this.socketTask.send({
            data: steam
        })
    }

    //bind操作
    bind() {
        //console.log('bind')
        var temp = {
            "iq": {
                "-id": id,
                "-type": "set",
                "bind": {
                    "-xmlns": "urn:ietf:params:xml:ns:xmpp-bind",
                    "resource": resource
                }
            }
        };
        //转化为xml
        var steam = this.json2xml(temp);
        this.socketTask.send({data: steam})

    }

    //获取session
    getsession() {
        //<iq xmlns="jabber:client" id="ak014gz6x7" type="set"><session xmlns="urn:ietf:params:xml:ns:xmpp-session"/></iq>
        var temp = {
            "iq": {
                "-xmlns": "jabber:client",
                "-id": id,
                "-type": "set",
                "session": {"-xmlns": "urn:ietf:params:xml:ns:xmpp-session"}
            }
        };
        //转化为xml
        var steam = this.json2xml(temp);
        this.socketTask.send({data: steam})
    }

    //上线
    presence() {
        //<presence id="ak014gz6x7"><status>Online</status><priority>1</priority></presence>
        var temp = {
            "presence": {
                "-id": id,
                "status": "online",
                "priority": "1"
            }
        };
        //转化为xml
        var steam = this.json2xml(temp);
        this.socketTask.send({data: steam})

        /*var message = {
          "type": "chat",
          "to": "orlfk5bdc19pbizsw8oecf9nzhyyciif",
          "sendTo": "orlfk5bdc19pbizsw8oecf9nzhyyciif@365me",
          "msg": "小程序发送的消息",
          "dateline": new Date(),
          "from": getUserName() + "@" + domain
        }*/
        //this.send("orlfk5bdc19pbizsw8oecf9nzhyyciif",message);
    }

    //发起新的流
    newopen() {
        // <open xmlns='jabber:client' to='127.0.0.1' version='1.0' from='wuxinzhe@127.0.0.1' id='70tvu3ooiu' xml:lang='zh'/>
        var temp = {
            "open": {
                "-xmlns": "jabber:client",
                "-to": domain,
                "-version": version,
                "-from": getFrom(),
                "-id": id,
                "-xml:lang": xmllang
            }
        };
        //转化为xml
        var steam = this.json2xml(temp);
        this.socketTask.send({data: steam})
    }

    //发消息
    send(toImId, message) {
        var f = getUserName() + "@" + "365me";
        var t = toImId + "@" + "365me";
        //type="chat"
        var xml = '<message  xmlns="jabber:client" to="' + t + '" from="' + f + '/' + resource + '"><body>' + message + '</body></message>'

        return this.socketTask.send({data: xml});
    }
}
