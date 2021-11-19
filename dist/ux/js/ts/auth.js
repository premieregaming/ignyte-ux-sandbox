class SimpleProfileInterface {
    constructor(name, image_url) {
    }
}
export class Auth {
    static get is_authenticated() { return false; }
    static on_sign_in_google(user) {
        var profile = user.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
}
