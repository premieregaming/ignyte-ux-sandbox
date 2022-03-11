import { Auth } from "../auth.js";
import { Net } from "../sdk/net.js";
import { Timeline } from "./timeline.js";
export class ContentCreatorUX {
    static init() {
        ContentCreatorUX.content_creator_el = document.querySelector('.content-creator');
        ContentCreatorUX.content_box_el = ContentCreatorUX.content_creator_el.querySelector('textarea');
        ContentCreatorUX.image_upload_dialog = document.querySelector('.image-upload');
        ContentCreatorUX.image_select_preview = ContentCreatorUX.image_upload_dialog.querySelector('img');
        ContentCreatorUX.image_preview_container = ContentCreatorUX.content_creator_el.querySelector('.content-image-preview-container');
        ContentCreatorUX.image_preview = ContentCreatorUX.content_creator_el.querySelector('.content-image-preview');
        let send_button = ContentCreatorUX.content_creator_el.querySelector('.button.content-send');
        send_button.onclick = ContentCreatorUX.on_click_send;
        let img_button = ContentCreatorUX.content_creator_el.querySelector('.button[name="add-item"]');
        img_button.onclick = ContentCreatorUX.on_click_add_img;
        ContentCreatorUX.image_upload_dialog.querySelector('input').onchange = ContentCreatorUX.on_change_input;
        ContentCreatorUX.image_upload_dialog.onclick = ContentCreatorUX.close_dialog;
        let submit_button = ContentCreatorUX.image_upload_dialog.querySelector('.button.image-submit');
        submit_button.onclick = ContentCreatorUX.on_click_submit_image;
    }
    static on_click_send() {
        let data = {
            user_id: Auth.authenticated_user_id,
            post_content: ContentCreatorUX.content_box_el.value,
        };
        Net.post('/api/content/posts', data).then((result) => {
            ContentCreatorUX.content_box_el.value = '';
            Timeline.refresh();
        });
    }
    static on_click_add_img() {
        ContentCreatorUX.image_upload_dialog.setAttribute('open', '1');
    }
    static on_change_input(event) {
        var src = URL.createObjectURL(event.target.files[0]);
        ContentCreatorUX.image_select_preview.src = src;
        ContentCreatorUX.image_preview_container.classList.remove('inactive');
    }
    static close_dialog(event) {
        if (event.target != event.currentTarget)
            return;
        ContentCreatorUX.image_upload_dialog.removeAttribute('open');
    }
    static on_click_submit_image() {
        ContentCreatorUX.image_preview_container.classList.remove('inactive');
        ContentCreatorUX.image_preview.src = ContentCreatorUX.image_select_preview.src;
        ContentCreatorUX.image_upload_dialog.removeAttribute('open');
    }
}
