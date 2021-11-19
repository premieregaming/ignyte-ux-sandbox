import { Net } from "./sdk/net.js";
class SimpleProfileInterface {
    constructor(name, image_url) {
    }
}
class GoogleAuthData {
    constructor(profile) {
        this.id = profile.getId();
        this.email = profile.getEmail();
        this.first_name = profile.getGivenName();
        this.last_name = profile.getFamilyName();
        this.profile_photo = profile.getImageUrl();
    }
}
export class Auth {
    static get is_authenticated() { return false; }
    static on_sign_in_google(user) {
        var profile = user.getBasicProfile();
        let token = user.getAuthResponse().id_token;
        let id = profile.getId();
        Net.post('api/auth/google-token', { "idtoken": token }).then((verified_id) => {
            if (id != verified_id) {
                return false;
            }
            let auth_data = new GoogleAuthData(profile);
            Auth.auth_with_google(auth_data);
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        });
    }
    static auth_with_google(data) {
        Net.post('api/auth/google-auth', data).then((response) => {
            if (response) {
                Auth.authenticated_user_id = response;
            }
        });
    }
}
Auth.authenticated_user_id = null;
