import { WebSocket } from 'ws'
import OkexRest from './okex-rest'

/*

*/

const WS_PUBLIC = 'wss://ws.okx.com:8443/ws/v5/public'
const WS_PRIVATE = 'wss://ws.okx.com:8443/ws/v5/private'
const DEMO_WS_PUBLIC = 'wss://wspap.okx.com:8443/ws/v5/public?brokerId=9999'
const DEMO_WS_PRIVATE = 'wss://wspap.okx.com:8443/ws/v5/private?brokerId=9999'

export default class OkexWs {
    private ws_private: string;
    private ws: WebSocket;
    private rest: OkexRest;

    constructor(demo: boolean = false) {
        this.ws = new WebSocket('');
        this.rest = new OkexRest();
        if (demo) {
            this.ws_private = DEMO_WS_PRIVATE;
        } else {
            this.ws_private = DEMO_WS_PRIVATE;
        }
        this.connectWs();
    }

    private connectWs() {
        this.ws = new WebSocket(this.ws_private, { perMessageDeflate: false });
        this.ws.on('open', this.onOpen);
        this.ws.on('message', this.onMessage);
        this.ws.on('error', this.onError);
        this.ws.on('close', this.onClose);
    }

    private async onOpen() {
        try {
            const logged = await this.rest.login([{
                "apiKey": "985d5b66-57ce-40fb-b714-afc0b9787083",
                "passphrase": "123456",
                "timestamp": "1538054050",
                "sign": "7L+zFQ+CEgGu5rzCj4+BdV2/uUHGqddA9pI6ztsRRPs="
            }]);
            if (!logged) throw new Error("Could not be authenticated.")
        } catch (error) {
            console.log(error);
        }
    }

    private onMessage(payload: any) {
        console.log(payload);
    }

    private onError() {}

    private onClose() {}
}