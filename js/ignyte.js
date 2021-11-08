import { Auth } from "./auth.js";
class Ignyte {
    static init_temp_db() {
        const DBOpenRequest = window.indexedDB.open("news", 1);
        DBOpenRequest.onsuccess = function (event) { Ignyte.db = DBOpenRequest.result; };
    }
    static init() {
        Ignyte.nav = document.querySelector('nav');
        Ignyte.nav_items = Ignyte.nav.querySelectorAll('span');
        Ignyte.nav_items.forEach((i) => i.onclick = Ignyte.on_click_nav.bind(Ignyte, i));
        Ignyte.c_type_selector = document.querySelector('.content-type-selector');
        Ignyte.c_type_selector_items = Ignyte.c_type_selector.querySelectorAll('span');
        Ignyte.c_type_selector_items.forEach((i) => i.onclick = Ignyte.on_click_con_type.bind(this, i));
        Ignyte.sections = document.querySelectorAll('main');
        Ignyte.auth_login = document.querySelector('.auth-login');
        Ignyte.progress_container = document.querySelector('.xp-progress');
        Ignyte.avatar = document.querySelector('.avatar');
        if (!Auth.is_authenticated) {
            Ignyte.progress_container.classList.add('hidden');
            Ignyte.auth_login.classList.remove('hidden');
        }
    }
    static on_click_nav(item) {
        Ignyte.nav_items.forEach((item) => item.classList.remove('selected'));
        item.classList.add('selected');
        let name = item.attributes['name'].value;
        Ignyte.sections.forEach((s) => s.classList[s.attributes['name'].value == name ? 'add' : 'remove']('active'));
    }
    static on_click_con_type(item) {
        Ignyte.c_type_selector_items.forEach((item) => item.classList.remove('selected'));
        item.classList.add('selected');
    }
    static on_sign_in_google(user) {
        var profile = user.getBasicProfile();
        debugger;
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
    static update_avatars() {
        let profile = localStorage.getItem('gprofile');
        document.querySelectorAll('avatar > img').forEach(image => {
            image.src = Ignyte.profile_img_url;
        });
    }
}
Ignyte.init();
window['Ignyte'] = Ignyte;
