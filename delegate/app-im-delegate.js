import {getIMHandlerFactory} from "../libs/im-sdk/im-factory";

export default class AppIMDelegate {
    constructor(app) {
        this._app = app;
    }

    onLaunch(options) {
        this.iIMHandler = getIMHandlerFactory;
    }

    onShow(options) {
       // this.iIMHandler.createConnection({options: {url: 'ws://192.168.15.153:8001'}});
       // this.iIMHandler.createConnection({options: {url: 'ws://192.168.29.15:7070/ws/'}});
        this.iIMHandler.createConnection({options: {url: 'wss://im.365me.me/ws/'}});
    }

    onHide() {

    }

    getIMHandlerDelegate() {
        return this.iIMHandler;
    }
}
