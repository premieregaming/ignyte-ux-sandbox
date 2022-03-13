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

	static tile_delay_ms = 40
	static page_size: number = 24
	static request_queued = false
	static is_refreshing = false
	static is_initial_loaded = false
	static search_debounce = 0

	static search_bar: HTMLInputElement
	static filter_items: NodeListOf<HTMLElement>
	static my_game_count: HTMLElement
	static my_games_el: HTMLElement
	static pop_games_el: HTMLElement
	static all_games_el: HTMLElement
	static in_game_user_dialog: HTMLElement

	static current_refresh: Promise<any>
	static retrigger_refresh: boolean = false

	static get user_id() { return Auth.is_authenticated ? Auth.authenticated_user_id : null }

	static init() {

		GamesUX.my_game_count = document.querySelector('.my-game-count')
		GamesUX.my_games_el = document.querySelector('.my-games')
		GamesUX.pop_games_el = document.querySelector('.popular-games')
		GamesUX.all_games_el = document.querySelector('.all-games')
		GamesUX.in_game_user_dialog = document.querySelector('dialog.in-game-username')

		GamesUX.my_games_el.onscroll = (e: MouseEvent) => GamesUX.on_scroll(GamesUX.my_games_el, GAME_CATEGORY.MY_GAMES)
		GamesUX.all_games_el.onscroll = (e: MouseEvent) => GamesUX.on_scroll(GamesUX.all_games_el, GAME_CATEGORY.ALL_GAMES)
		GamesUX.pop_games_el.onscroll = (e: MouseEvent) => GamesUX.on_scroll(GamesUX.pop_games_el, GAME_CATEGORY.POP_GAMES)

		GamesUX.search_bar = document.querySelector("main[name='games'] > .search > input")
		GamesUX.filter_items = document.querySelectorAll('.filter-games > span')
		GamesUX.filter_items.forEach((x) => x['onclick'] = (e: Event) => GamesUX.on_click_filter(<Element>e.target) )

		GamesUX.search_bar.onkeyup = () => { GamesUX.handle_search_change() }
		// Auth.on_auth_listeners.push(() => GamesUX.refresh_games())
	}

	static on_focus() {
		
		if (GamesUX.is_initial_loaded) return 

		GamesUX.is_initial_loaded = true
		GamesUX.refresh_games()
	}

	static handle_search_change() {

		debugger

		if (GamesUX.search_debounce) { window.clearTimeout(GamesUX.search_debounce) }
		GamesUX.search_debounce = window.setTimeout(() => GamesUX.refresh_games(), 320)
	}

	static on_change_search() {

		if (GamesUX.request_queued) return
		if (GamesUX.is_refreshing) return (GamesUX.request_queued = true)

		GamesUX.refresh_games()
	}

	static on_click_filter(el: Element) {

		if (GamesUX.request_queued) return
		if (GamesUX.is_refreshing) return (GamesUX.request_queued = true)

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

	static get search_val() { return GamesUX.search_bar.value }

	static refresh_games(my_games: boolean = false): Promise<any> {

		if (GamesUX.is_refreshing) { 
			GamesUX.retrigger_refresh = true
			return Promise.resolve(true) 
		}

		GamesUX.is_refreshing = true

		GamesUX.current_refresh = Promise.all([
			GamesUX.retrieve_my_games(0, GamesUX.page_size, true),
			GamesUX.retrieve_all_games(0, GamesUX.page_size, true),
			GamesUX.retrieve_pop_games(0, GamesUX.page_size, true)
		]).then(() => (GamesUX.request_queued)
			? GamesUX.refresh_games().then(() => GamesUX.request_queued = false)
			: Promise.resolve(true)
		).then(() => {
			GamesUX.is_refreshing = false
			GamesUX.current_refresh = Promise.resolve(true)
			if (GamesUX.retrigger_refresh) { 
				GamesUX.retrigger_refresh = false
				window.setTimeout(GamesUX.refresh_games, 10)
			}
		})

		return GamesUX.current_refresh
	}

	static retrieve_user_game_count() {

		let body = {
			platforms: GamesUX.selected_platforms,
			search: GamesUX.search_val,
			user_id: GamesUX.user_id
		}

		let url = '/api/games/user/count/'
		Net.post(url, body).then((res) => GamesUX.my_game_count.innerHTML = 'MY GAMES (' + res + ')')
	}

	static retrieve_my_games(offset: number, limit: number, clear: boolean = false): Promise<any> {

		GamesUX.retrieve_user_game_count()

		let url = '/api/games/user'
		let body = {
			platforms: GamesUX.selected_platforms,
			offset: offset,
			limit: limit,
			search: GamesUX.search_val,
			user_id: GamesUX.user_id
		}

		return Net.post(url, body).then((res) => GamesUX.process_my_games(JSON.parse(<string>res), clear))
	}

	static retrieve_all_games(offset: number, limit: number, clear: boolean = false): Promise<any> {

		let url = '/api/games/all'
		let body = {
			platforms: GamesUX.selected_platforms,
			offset: offset,
			limit: limit,
			search: GamesUX.search_val,
			user_id: GamesUX.user_id
		}

		return Net.post(url, body).then((res) => GamesUX.process_all_games(JSON.parse(<string>res), clear))
	}

	static retrieve_pop_games(offset: number, limit: number, clear: boolean = false): Promise<any> {

		let url = '/api/games/popular'
		let body = { 
			platforms: GamesUX.selected_platforms, 
			offset: offset, 
			limit: limit, 
			search: GamesUX.search_val,
			user_id: GamesUX.user_id
		}

		return Net.post(url, body).then((res) => GamesUX.process_pop_games(JSON.parse(<string>res), clear))
	}

	static process_my_games(res, clear: boolean) {


		if (clear) GamesUX.my_games_el.innerHTML = ''
		res.forEach((game, i) => window.setTimeout(() => 
			GamesUX.my_games_el.appendChild(GamesUX.create_game_tile(game)), i * GamesUX.tile_delay_ms))

		let el = GamesUX.my_games_el
		if (el.children.length == 1) el.classList.add('single-row')
		if (el.children.length == 2) el.classList.add('double-row')
		else { 
			if (el.classList.contains('single-row')) el.classList.remove('single-row')
			if (el.classList.contains('double-row')) el.classList.remove('double-row')
		}
	}

	static process_pop_games(res, clear: boolean) {

		if (clear) GamesUX.pop_games_el.innerHTML = ''
		res.forEach((game, i) => window.setTimeout(() =>
			GamesUX.pop_games_el.appendChild(GamesUX.create_game_tile(game, true)), i * GamesUX.tile_delay_ms))
	}

	static process_all_games(res, clear: boolean) {

		if (clear) GamesUX.all_games_el.innerHTML = ''
		res.forEach((game, i) => window.setTimeout(() =>
			GamesUX.all_games_el.appendChild(GamesUX.create_game_tile(game, true)), i * GamesUX.tile_delay_ms))
	}

	static create_game_tile(game, like_button = false): Element {

		let img = document.createElement('img')
		let label = document.createElement('label')
		let container = document.createElement('div')
		let img_button = document.createElement('img')

		img.src = game.cover_url
		img.classList.add('cover')
		label.innerHTML = game.name

		container.id = 'game-' + game.id
		container.dataset.id = game.id
		container.dataset.liked = (game.liked) ? 'true' : 'false'
		if (game.liked) container.classList.add('liked') 

		container.appendChild(img)
		container.appendChild(label)

		if (like_button) { 
			img_button.classList.add('add-game-button')
			img_button.src = './images/icons/svg/256px/promote_image_add_256.svg'
			
			container.appendChild(img_button)
			img_button.onclick = () => GamesUX.on_click_like(container)
		}

		window.setTimeout(() => container.classList.add('enabled'), GamesUX.tile_delay_ms / 4)
		return container;
	}

	static on_click_like(el) {

		el.dataset.liked = (el.dataset.liked == 'true') ? 'false' : true;
		el.classList[(el.dataset.liked == 'true') ? 'add' : 'remove']('liked')

		let body = {
			user_id: GamesUX.user_id,
			game_id: parseInt(el.dataset.id),
			liked: el.dataset.liked == 'true'
		}

		Net.post('/api/games/like-game', body).then((res) => GamesUX.retrieve_my_games(0, GamesUX.page_size, true))
	}

	static async on_scroll(el: Element, cat: GAME_CATEGORY) {

		if (GamesUX.is_refreshing) return

		try {
			// let el: HTMLElement = <HTMLElement>event.target
			let item_width = el.children[0].clientWidth
			let distance = el.scrollWidth - (el.scrollLeft + el.clientWidth)
			if (distance < (item_width * (GamesUX.page_size / 4))) {

				GamesUX.is_refreshing = true
				switch (cat) {

					case GAME_CATEGORY.MY_GAMES:
						await GamesUX.retrieve_my_games(el.children.length, GamesUX.page_size, false)
						GamesUX.is_refreshing = false
						break;

					case GAME_CATEGORY.ALL_GAMES:
						await GamesUX.retrieve_all_games(el.children.length, GamesUX.page_size, false)
						GamesUX.is_refreshing = false
						break;

					case GAME_CATEGORY.POP_GAMES:
						await GamesUX.retrieve_pop_games(el.children.length, GamesUX.page_size, false)
						GamesUX.is_refreshing = false
						break;
				}
			}
		}
		catch (e) { }
	}
}