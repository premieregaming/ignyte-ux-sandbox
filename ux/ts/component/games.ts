import { Auth } from "../auth.js"
import { Net } from "../sdk/net.js"
// import { PlatformGroups } from "../../../src/types/platform-groups.js"

export class PlatformGroups {

	static PlayStation = [8, 165, 38, 9, 48, 167, 7, 390]
	static Nintendo = [130, 159, 47, 4, 18, 37, 19, 20, 21, 137]
	static Xbox = [11, 49, 169, 12]
	static PC = [6, 14]
	static Mobile = [34, 74]
}

export enum GAME_CATEGORY {
	MY_GAMES,
	ALL_GAMES,
	POP_GAMES
}

export class GamesUX {

	static search_bar: HTMLElement
	static filter_items: NodeListOf<HTMLElement>
	static my_game_count: HTMLElement
	static my_games_el: HTMLElement
	static pop_games_el: HTMLElement
	static all_games_el: HTMLElement

	static init() {

		GamesUX.my_game_count = document.querySelector('.my-game-count')
		GamesUX.my_games_el = document.querySelector('.my-games')
		GamesUX.pop_games_el = document.querySelector('.popular-games')
		GamesUX.all_games_el = document.querySelector('.all-games')

		GamesUX.my_games_el.onscroll = (e: MouseEvent) => GamesUX.on_scroll(GamesUX.my_games_el, GAME_CATEGORY.MY_GAMES)
		GamesUX.all_games_el.onscroll = (e: MouseEvent) => GamesUX.on_scroll(GamesUX.all_games_el, GAME_CATEGORY.ALL_GAMES)
		GamesUX.pop_games_el.onscroll = (e: MouseEvent) => GamesUX.on_scroll(GamesUX.pop_games_el, GAME_CATEGORY.POP_GAMES)

		GamesUX.search_bar = document.querySelector("main[name='games'] > .search")
		GamesUX.filter_items = document.querySelectorAll('.filter-games > span')
		GamesUX.filter_items.forEach((x) => x['onclick'] = (e: Event) => GamesUX.on_click_filter(<Element>e.target) )

		Auth.on_auth_listeners.push(() => GamesUX.refresh_games())
	}

	static on_click_filter(el: Element) {

		el.classList[el.classList.contains('selected') ? 'remove' : 'add']('selected')
		GamesUX.refresh_games()
	}

	static get selected_platforms() {

		let platforms = []
		GamesUX.filter_items.forEach((el) => {

			if (!el.classList.contains('selected')) return
			let name = el.attributes.getNamedItem('name').value
			platforms = platforms.concat(PlatformGroups[name])
		})

		return platforms
	}

	static refresh_games() {

		GamesUX.retrieve_all_games(0, 18, true)
		GamesUX.retrieve_pop_games(0, 18, true)

		Net.get('/api/games/user/count/' + Auth.authenticated_user_id).then((res) => GamesUX.process_my_game_count(res))
		// Net.get('/api/games/user/' + Auth.authenticated_user_id).then((res) => GamesUX.process_my_games(res))
		// Net.get('/api/games/popular').then((res) => GamesUX.process_pop_games(res))
	}

	static process_my_game_count(res) {

		GamesUX.my_game_count.innerHTML = 'MY GAMES (' + res + ')'
	}

	static retrieve_all_games(offset: number, limit: number, clear: boolean = false) {

		let url = '/api/games/all'
		let body = { platforms: GamesUX.selected_platforms, offset: offset, limit: limit }
		Net.post(url, body).then((res) => GamesUX.process_all_games(JSON.parse(<string>res), clear))
	}

	static retrieve_pop_games(offset: number, limit: number, clear: boolean = false) {


		let url = '/api/games/popular'
		let body = { platforms: GamesUX.selected_platforms, offset: offset, limit: limit }
		Net.post(url, body).then((res) => GamesUX.process_pop_games(JSON.parse(<string>res), clear))
	}

	static process_my_games(res) {
		
	}

	static process_pop_games(res, clear: boolean) {

		if (clear) GamesUX.pop_games_el.innerHTML = ''
		res.forEach((game) => GamesUX.add_game_to_pop(game)) 
	}

	static process_all_games(res, clear: boolean) {

		if (clear) GamesUX.all_games_el.innerHTML = ''
		res.forEach((game) => GamesUX.add_game_to_all(game)) 
	}

	static add_game_to_all(game) {

		GamesUX.all_games_el.appendChild(GamesUX.create_game_tile(game))
	}

	static add_game_to_pop(game) {

		GamesUX.pop_games_el.appendChild(GamesUX.create_game_tile(game))
	}

	static create_game_tile(game): Element {

		let container = document.createElement('div')
		let img = document.createElement('img')
		let label = document.createElement('label')

		container.id = 'game-' + game.id
		label.innerHTML = game.name
		img.src = game.cover_url

		container.appendChild(img)
		container.appendChild(label)

		return container;
	}

	static on_scroll(el: Element, cat: GAME_CATEGORY) {

		try {
			// let el: HTMLElement = <HTMLElement>event.target
			let item_width = el.children[0].clientWidth
			let distance = el.scrollWidth - (el.scrollLeft + el.clientWidth)
			if (distance < (item_width * 2)) {

				switch (cat) {

					case GAME_CATEGORY.MY_GAMES:
						break;

					case GAME_CATEGORY.ALL_GAMES:
						GamesUX.retrieve_all_games(el.children.length, 16, false)
						break;

					case GAME_CATEGORY.POP_GAMES:
						GamesUX.retrieve_pop_games(el.children.length, 16, false)
						break;
				}
			}
		}
		catch (e) { }
	}
}