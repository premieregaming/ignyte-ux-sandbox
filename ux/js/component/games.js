import { Auth } from "../auth.js";
import { Net } from "../sdk/net.js";
export class GamesUX {
    static init() {
        GamesUX.my_game_count = document.querySelector('.my_game_count');
        GamesUX.search_bar = document.querySelector("main[name='games'] > .search");
        GamesUX.filter_items = document.querySelectorAll('.filter_games > span');
        GamesUX.filter_items.forEach((x) => x['onclick'] = (e) => GamesUX.on_click_filter(e.target));
        Auth.on_auth_listeners.push(() => GamesUX.retrieve_games());
    }
    static on_click_filter(el) {
        GamesUX.filter_items.forEach((x) => {
            x.classList[(x != el || x.classList.contains('selected')) ? 'remove' : 'add']('selected');
        });
        GamesUX.retrieve_games();
    }
    static retrieve_games() {
        try {
            Net.get('/api/games/user/count/' + Auth.authenticated_user_id).then((res) => GamesUX.process_my_game_count(res));
        }
        catch (e) {
            debugger;
        }
        // Net.get('/api/games/user/' + Auth.authenticated_user_id).then((res) => GamesUX.process_my_games(res))
        // Net.get('/api/games/popular').then((res) => GamesUX.process_pop_games(res))
        // Net.get('/api/games').then((res) => GamesUX.process_all_games(res))
    }
    static process_my_game_count(res) {
        GamesUX.my_game_count.innerHTML = 'MY GAMES (' + res + ')';
    }
    static process_my_games(res) {
    }
    static process_pop_games(res) {
    }
    static process_all_games(res) {
    }
}
