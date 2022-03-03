import { Auth } from "../auth.js"
import { Net } from "../sdk/net.js"

export class GamesUX {

	static search_bar: HTMLElement 
	static filter_items: NodeListOf<HTMLElement>
	static my_game_count: HTMLElement
	static my_games_el: HTMLElement
	static pop_games_el: HTMLElement
	static all_games_el: HTMLElement

	static init() {

		GamesUX.my_game_count = document.querySelector('.my_game_count')
		GamesUX.my_games_el = document.querySelector('.my_games')
		GamesUX.pop_games_el = document.querySelector('.popular_games')
		GamesUX.all_games_el = document.querySelector('.all_games_el')

		GamesUX.search_bar = document.querySelector("main[name='games'] > .search")
		GamesUX.filter_items = document.querySelectorAll('.filter_games > span')
		GamesUX.filter_items.forEach((x) => x['onclick'] = (e: Event) => GamesUX.on_click_filter(<Element>e.target) )

		Auth.on_auth_listeners.push(() => GamesUX.retrieve_games())
	}

	static on_click_filter(el: Element) {

		GamesUX.filter_items.forEach((x) => {
			x.classList[(x != el || x.classList.contains('selected')) ? 'remove' : 'add']('selected')
		})

		GamesUX.retrieve_games()
	}

	static retrieve_games() {

		Net.get('/api/games/user/count/' + Auth.authenticated_user_id).then((res) => GamesUX.process_my_game_count(res))
		// Net.get('/api/games/user/' + Auth.authenticated_user_id).then((res) => GamesUX.process_my_games(res))
		// Net.get('/api/games/popular').then((res) => GamesUX.process_pop_games(res))
		Net.get('/api/games').then((res) => GamesUX.process_all_games(res))
	}

	static process_my_game_count(res) {

		GamesUX.my_game_count.innerHTML = 'MY GAMES (' + res + ')'
	}

	static process_my_games(res) {
		

	}

	static process_pop_games(res) {

	}

	static process_all_games(res) {

		// GamesUX.
	}
}