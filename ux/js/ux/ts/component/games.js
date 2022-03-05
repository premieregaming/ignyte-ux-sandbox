import { Auth } from "../auth.js";
import { Net } from "../sdk/net.js";
import { PlatformGroups } from "../../../src/types/platform-groups.js";
export class GamesUX {
    static init() {
        GamesUX.my_game_count = document.querySelector('.my_game_count');
        GamesUX.my_games_el = document.querySelector('.my_games');
        GamesUX.pop_games_el = document.querySelector('.popular_games');
        GamesUX.all_games_el = document.querySelector('.all_games_el');
        GamesUX.search_bar = document.querySelector("main[name='games'] > .search");
        GamesUX.filter_items = document.querySelectorAll('.filter_games > span');
        GamesUX.filter_items.forEach((x) => x['onclick'] = (e) => GamesUX.on_click_filter(e.target));
        Auth.on_auth_listeners.push(() => GamesUX.refresh_games());
    }
    static on_click_filter(el) {
        el.classList[el.classList.contains('selected') ? 'remove' : 'add']('selected');
        GamesUX.refresh_games();
    }
    static refresh_games() {
        let platforms = [];
        GamesUX.filter_items.forEach((el) => {
            if (!el.classList.contains('selected'))
                return;
            let name = el.attributes.getNamedItem('name').value;
            platforms += PlatformGroups[name];
        });
        GamesUX.all_games_el.innerHTML = '';
        GamesUX.retrieve_all_games(platforms, 0, 18);
        Net.get('/api/games/user/count/' + Auth.authenticated_user_id).then((res) => GamesUX.process_my_game_count(res));
        // Net.get('/api/games/user/' + Auth.authenticated_user_id).then((res) => GamesUX.process_my_games(res))
        // Net.get('/api/games/popular').then((res) => GamesUX.process_pop_games(res))
    }
    static retrieve_all_games(platforms, offset, limit) {
        let url = '/api/games';
        let body = { platforms: platforms, offset: offset, limit: limit };
        Net.post(url, body).then((res) => GamesUX.process_all_games(res));
    }
    static process_my_game_count(res) {
        GamesUX.my_game_count.innerHTML = 'MY GAMES (' + res + ')';
    }
    static process_my_games(res) {
    }
    static process_pop_games(res) {
    }
    static add_game_to_all_games(game) {
        let container = document.createElement('div');
        let img = document.createElement('img');
        let label = document.createElement('label');
        container.id = 'game_' + game.id;
        label.innerHTML = game.name;
        img.src = game.cover_url;
        container.appendChild(img);
        container.appendChild(label);
        GamesUX.all_games_el.appendChild(container);
    }
}
GamesUX.process_all_games = (res) => { res.forEach((game) => GamesUX.add_game_to_all_games(game)); };
