var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Auth } from "../auth.js";
import { Net } from "../sdk/net.js";
// import { PlatformGroups } from "../../../src/types/platform-groups.js"
export class PlatformGroups {
}
PlatformGroups.PlayStation = [8, 165, 38, 9, 48, 167, 7, 390];
PlatformGroups.Nintendo = [130, 159, 47, 4, 18, 37, 19, 20, 21, 137];
PlatformGroups.Xbox = [11, 49, 169, 12];
PlatformGroups.PC = [6, 14];
PlatformGroups.Mobile = [34, 74];
export var GAME_CATEGORY;
(function (GAME_CATEGORY) {
    GAME_CATEGORY[GAME_CATEGORY["MY_GAMES"] = 0] = "MY_GAMES";
    GAME_CATEGORY[GAME_CATEGORY["ALL_GAMES"] = 1] = "ALL_GAMES";
    GAME_CATEGORY[GAME_CATEGORY["POP_GAMES"] = 2] = "POP_GAMES";
})(GAME_CATEGORY || (GAME_CATEGORY = {}));
export class GamesUX {
    static init() {
        GamesUX.my_game_count = document.querySelector('.my-game-count');
        GamesUX.my_games_el = document.querySelector('.my-games');
        GamesUX.pop_games_el = document.querySelector('.popular-games');
        GamesUX.all_games_el = document.querySelector('.all-games');
        GamesUX.my_games_el.onscroll = (e) => GamesUX.on_scroll(GamesUX.my_games_el, GAME_CATEGORY.MY_GAMES);
        GamesUX.all_games_el.onscroll = (e) => GamesUX.on_scroll(GamesUX.all_games_el, GAME_CATEGORY.ALL_GAMES);
        GamesUX.pop_games_el.onscroll = (e) => GamesUX.on_scroll(GamesUX.pop_games_el, GAME_CATEGORY.POP_GAMES);
        GamesUX.search_bar = document.querySelector("main[name='games'] > .search > input");
        GamesUX.filter_items = document.querySelectorAll('.filter-games > span');
        GamesUX.filter_items.forEach((x) => x['onclick'] = (e) => GamesUX.on_click_filter(e.target));
        GamesUX.search_bar.onkeyup = () => { GamesUX.on_change_search(); };
        Auth.on_auth_listeners.push(() => GamesUX.refresh_games());
    }
    static on_change_search() { GamesUX.refresh_games(); }
    static on_click_filter(el) {
        el.classList[el.classList.contains('selected') ? 'remove' : 'add']('selected');
        GamesUX.refresh_games();
    }
    static get selected_platforms() {
        let platforms = [];
        GamesUX.filter_items.forEach((el) => {
            if (!el.classList.contains('selected'))
                return;
            let name = el.attributes.getNamedItem('name').value;
            platforms = platforms.concat(PlatformGroups[name]);
        });
        return platforms;
    }
    static get search_val() { return GamesUX.search_bar.value.length > 2 ? GamesUX.search_bar.value : ''; }
    static refresh_games() {
        GamesUX.retrieve_my_games(0, GamesUX.page_size, true);
        GamesUX.retrieve_all_games(0, GamesUX.page_size, true);
        GamesUX.retrieve_pop_games(0, GamesUX.page_size, true);
    }
    static retrieve_user_game_count() {
        let body = {
            platforms: GamesUX.selected_platforms,
            search: GamesUX.search_val,
            user_id: Auth.authenticated_user_id
        };
        let url = '/api/games/user/count/';
        Net.post(url, body).then((res) => GamesUX.my_game_count.innerHTML = 'MY GAMES (' + res + ')');
    }
    static retrieve_my_games(offset, limit, clear = false) {
        GamesUX.retrieve_user_game_count();
        let url = '/api/games/user';
        let body = {
            platforms: GamesUX.selected_platforms,
            offset: offset,
            limit: limit,
            search: GamesUX.search_val,
            user_id: Auth.authenticated_user_id
        };
        return Net.post(url, body).then((res) => GamesUX.process_my_games(JSON.parse(res), clear));
    }
    static retrieve_all_games(offset, limit, clear = false) {
        let url = '/api/games/all';
        let body = {
            platforms: GamesUX.selected_platforms,
            offset: offset,
            limit: limit,
            search: GamesUX.search_val,
            user_id: Auth.authenticated_user_id
        };
        return Net.post(url, body).then((res) => GamesUX.process_all_games(JSON.parse(res), clear));
    }
    static retrieve_pop_games(offset, limit, clear = false) {
        let url = '/api/games/popular';
        let body = {
            platforms: GamesUX.selected_platforms,
            offset: offset,
            limit: limit,
            search: GamesUX.search_val,
            user_id: Auth.authenticated_user_id
        };
        return Net.post(url, body).then((res) => GamesUX.process_pop_games(JSON.parse(res), clear));
    }
    static process_my_games(res, clear) {
        if (clear)
            GamesUX.my_games_el.innerHTML = '';
        res.forEach((game) => GamesUX.my_games_el.appendChild(GamesUX.create_game_tile(game)));
        let el = GamesUX.my_games_el;
        if (el.children.length == 1)
            el.classList.add('single-row');
        if (el.children.length == 2)
            el.classList.add('double-row');
        else {
            if (el.classList.contains('single-row'))
                el.classList.remove('single-row');
            if (el.classList.contains('double-row'))
                el.classList.remove('double-row');
        }
    }
    static process_pop_games(res, clear) {
        if (clear)
            GamesUX.pop_games_el.innerHTML = '';
        res.forEach((game) => GamesUX.pop_games_el.appendChild(GamesUX.create_game_tile(game)));
    }
    static process_all_games(res, clear) {
        if (clear)
            GamesUX.all_games_el.innerHTML = '';
        res.forEach((game) => GamesUX.all_games_el.appendChild(GamesUX.create_game_tile(game)));
    }
    static create_game_tile(game) {
        let img = document.createElement('img');
        let label = document.createElement('label');
        let container = document.createElement('div');
        img.src = game.cover_url;
        label.innerHTML = game.name;
        container.id = 'game-' + game.id;
        container.dataset.id = game.id;
        container.onclick = () => GamesUX.on_click_tile(container);
        container.appendChild(img);
        container.appendChild(label);
        return container;
    }
    static on_click_tile(el) {
        let body = {
            user_id: Auth.authenticated_user_id,
            game_id: parseInt(el.dataset.id),
            liked: el.dataset.liked != 'true'
        };
        Net.post('/api/games/like-game', body).then((res) => GamesUX.retrieve_my_games(0, GamesUX.page_size, true));
    }
    static on_scroll(el, cat) {
        return __awaiter(this, void 0, void 0, function* () {
            if (GamesUX.is_refreshing)
                return;
            try {
                // let el: HTMLElement = <HTMLElement>event.target
                let item_width = el.children[0].clientWidth;
                let distance = el.scrollWidth - (el.scrollLeft + el.clientWidth);
                if (distance < (item_width * (GamesUX.page_size / 4))) {
                    GamesUX.is_refreshing = true;
                    switch (cat) {
                        case GAME_CATEGORY.MY_GAMES:
                            yield GamesUX.retrieve_my_games(el.children.length, GamesUX.page_size, false);
                            GamesUX.is_refreshing = false;
                            break;
                        case GAME_CATEGORY.ALL_GAMES:
                            yield GamesUX.retrieve_all_games(el.children.length, GamesUX.page_size, false);
                            GamesUX.is_refreshing = false;
                            break;
                        case GAME_CATEGORY.POP_GAMES:
                            yield GamesUX.retrieve_pop_games(el.children.length, GamesUX.page_size, false);
                            GamesUX.is_refreshing = false;
                            break;
                    }
                }
            }
            catch (e) { }
        });
    }
}
GamesUX.page_size = 32;
GamesUX.is_refreshing = false;
