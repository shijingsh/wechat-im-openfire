# 微信小程序即时通讯 wechat-im-openfire

wechat-im-openfire 是一个小程序链接openfire通讯实例。

你需要一个openfire客户端，后台接口实现联系人管理。

### 感谢

本项目基于：https://github.com/unmagic/wechat-im  开发，特此感谢！


## 特性：
- [x] 目前项目中已使用webSocket，实现了IM的通信功能！目前包括会话列表页面、会话页面及好友页面。支持使用nodejs开启本地WebSocket服务。
- [x] 支持发送文本、图片、语音，支持输入法的emoji表情
- [x] 支持拍照，图库选择图片、图片预览
- [x] 支持切换到文本输入时，显示发送按钮。
- [x] 支持语音播放及播放动画。
- [x] 支持配置录制语音的最短及最长时间。
- [x] 支持配置自定义事件。
- [x] 支持聊天消息按时间排序。
- [x] 支持发送消息后，页面回弹到最底部。
- [x] 使用了最新的语音播放接口，同时兼容了低版本的语音播放接口。
- [x] 消息发送中、发送成功、发送失败的状态更新
- [x] 支持消息发送失败情况下，点击重发按钮重新发送
- [x] 优化时间气泡显示逻辑，相邻信息大于5分钟显示后者信息的时间
- [x] 在页面最上方增加了会话状态的UI展示
- [x] 自定义功能，显示自定义气泡。
- [x] 通过解析语音或图片消息信息，优先读取本地文件。
- [x] 实现了文件存储算法，保证10M存储空间内的语音和图片文件均为最新。
- [x] 各消息类型和各功能均已模块化，让你在浏览代码时愉悦轻松。（其实这算不上组件特性。。。）


## 如何安装使用

#### 1. 开发者工具导入项目
```
修改app.js文件中下面配置的url为你本地网络ip及固定的端口号8001，即ws://xx.xx.xx.xx:8001
this.imWebSocket.createSocket({url: 'ws://10.4.97.87:8001'});
```

#### 2. 使用微信开发者工具运行项目

### 3. 添加好友

getApp().toAddFriend({your:"vt2107077tcy3qciif"},{nickName:"刘克付"})

### LINK

[LICENSE](https://github.com/shijingsh/wechat-im-openfire/blob/master/LICENSE)



