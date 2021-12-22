import { Auth } from "../auth.js";
import { Net } from "../sdk/net.js";
import { Timeline } from "./timeline.js";
export class ContentCreatorUX {
    static init() {
        ContentCreatorUX.content_creator_el = document.querySelector('.content-creator');
        ContentCreatorUX.content_box_el = ContentCreatorUX.content_creator_el.querySelector('textarea');
        let send_button = ContentCreatorUX.content_creator_el.querySelector('.button.content-send');
        send_button.onclick = ContentCreatorUX.on_click_send;
    }
    static on_click_send() {
        let data = { user_id: Auth.authenticated_user_id, post_content: ContentCreatorUX.content_box_el.value };
        Net.post('/api/content/posts', data).then((result) => {
            ContentCreatorUX.content_box_el.value = '';
            Timeline.refresh();
        });
    }
}
