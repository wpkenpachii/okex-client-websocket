import axios, { AxiosError, AxiosInstance } from 'axios'

const BASE_URL = 'https://www.okx.com/'

export type Credentials = {
    apiKey: string;
    passphrase: string;
    timestamp: string;
    sign: string;
}

interface RequestLogin {
    ops: "login";
    args: Credentials[];
}

export default class OkexRest {
    private rest: AxiosInstance;

    constructor() {
        this.rest = axios.create({
            baseURL: BASE_URL,
            timeout: 2000,
            headers: {
                'OK-ACCESS-KEY': '',
                'OK-ACCESS-SIGN': '',
                'OK-ACCESS-TIMESTAMP': '',
                'OK-ACCESS-PASSPHRASE': '',
                'Content-Type': 'application/json'
            }
        })
    }

    public async login(credentials: Credentials[]): Promise<boolean> {
        const body: RequestLogin = {
            ops: "login",
            args: credentials
        }
        try {
            const { data } = await this.rest.post("", body);
            switch(data.event) {
                case "login":
                    return true;
                    break;
                case "error":
                    return false;
                    break;
                default:
                    return false;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            } else {
                console.log(error);
            }
            return false;
        }
    }
}