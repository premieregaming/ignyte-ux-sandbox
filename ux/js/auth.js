import { Net } from "./sdk/net";
class SimpleProfileInterface {
    constructor(name, image_url) {
    }
}
export class Auth {
    static get is_authenticated() { return false; }
    static on_sign_in_google(user) {
        let token = user.getAuthResponse().id_token;
        Net.post('/api/google-token', { 'idtoken': token }).then((res) => {
            debugger;
        });
    }
}
