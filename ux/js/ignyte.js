import { Account } from "./account.js";
import { Auth } from "./auth.js";
import { GamesUX } from './component/games.js';
import { ContentCreatorUX } from "./component/content-creator.js";
import { Timeline } from "./component/timeline.js";
export class Ignyte {
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
        // Net.get('/api/ping').then((response) => { alert(response['data']) })
        Ignyte.init_components();
    }
    static init_components() {
        ContentCreatorUX.init();
        Timeline.init();
        GamesUX.init();
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
    static on_sign_in_google(user) { Auth.on_sign_in_google(user); }
    static update_avatars() {
        document.querySelectorAll('.user-avatar-photo').forEach(image => {
            image.src = Account.data.profile_photo;
        });
    }
    static render_account() {
        Ignyte.update_avatars();
        document.querySelector('#username').innerHTML = Account.data.first_name;
        Ignyte.auth_login.classList.add('hidden');
        Ignyte.progress_container.classList.remove('hidden');
        Timeline.refresh();
    }
}
Ignyte.init();
window['Ignyte'] = Ignyte;
//# sourceMappingURL=ignyte.js.map