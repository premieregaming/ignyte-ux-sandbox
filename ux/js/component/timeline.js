import { Auth } from "../auth.js";
import { TimelineItem } from "../interface/timeline-item.js";
import { Net } from "../sdk/net.js";
export class Timeline {
    static get timeline_count() {
        return Timeline.timeline_el.children.length;
    }
    static init() {
        Timeline.timeline_el = document.querySelector('.timeline');
        Timeline.timeline_el.onscroll = Timeline.on_scroll;
        // Timeline.refresh()
    }
    static refresh() {
        let user_id = Auth.authenticated_user_id;
        let offset = Timeline.timeline_count;
        Net.get('/api/content/timeline/' + user_id + '/0').then((res) => {
            Timeline.timeline_el.innerHTML = '';
            res.forEach(x => Timeline.append(new TimelineItem(x)));
        });
    }
    static load_additional() {
        if (Timeline.is_loading)
            return;
        Timeline.is_loading = true;
        let user_id = Auth.authenticated_user_id;
        let offset = Timeline.timeline_count;
        Net.get('/api/content/timeline/' + user_id + '/' + offset)
            .then((res) => res.forEach(x => Timeline.append(new TimelineItem(x))))
            .then(() => Timeline.is_loading = false);
    }
    static append(item) {
        let d = new Date(item.create_timestamp);
        let d_format = d.toLocaleString().replace(',', ' at');
        let details = "Posted by " + item.first_name + " " + item.last_name + ' on ' + d_format;
        let container = document.createElement('div');
        container.classList.add('content-item');
        let content_holder = document.createElement('div');
        content_holder.classList.add('content-holder');
        let detail_holder = document.createElement('div');
        detail_holder.classList.add('detail-holder');
        let txt = document.createElement('span');
        txt.innerHTML = details;
        let img = document.createElement('img');
        img.classList.add('user-avatar-photo');
        img.src = item.profile_photo;
        content_holder.innerHTML = item.post_content;
        detail_holder.append(img);
        detail_holder.append(txt);
        container.append(content_holder);
        container.append(detail_holder);
        Timeline.timeline_el.append(container);
        console.log('item height' + container.clientHeight);
    }
    static on_scroll(event) {
        try {
            let el = event.target;
            let item_height = Timeline.timeline_el.children[0].clientHeight;
            let distance = el.scrollHeight - (el.scrollTop + el.clientHeight);
            if (distance < (item_height * 2))
                Timeline.load_additional();
        }
        catch (e) { }
    }
}
Timeline.is_loading = false;
