import { Auth } from "../auth.js";
import { TimelineItem } from "../interface/timeline-item.js";
import { Net } from "../sdk/net.js";
export class Timeline {
    static init() {
        Timeline.timeline_el = document.querySelector('.timeline');
        // Timeline.refresh()
    }
    static refresh() {
        let user_id = Auth.authenticated_user_id;
        Net.get('/api/content/timeline/' + user_id).then((res) => {
            Timeline.timeline_el.innerHTML = '';
            res.forEach(x => {
                let item = new TimelineItem(x);
                let d = new Date(item.create_timestamp);
                let details = "Posted by " + item.first_name + " " + item.last_name + ' on ' + d.toString();
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
                // Timeline.
            });
        });
    }
}
