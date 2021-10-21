class Ignyte {

	static nav: HTMLElement
	static nav_items: NodeListOf<HTMLElement>

	static c_type_selector: HTMLElement
	static c_type_selector_items: NodeListOf<HTMLElement>

	static sections: NodeListOf<HTMLElement>

	static db: IDBDatabase

	static init_temp_db() {

		const DBOpenRequest = window.indexedDB.open("news", 1);
		DBOpenRequest.onsuccess = function (event) { Ignyte.db = DBOpenRequest.result; }
	}

	static init() {

		Ignyte.nav = document.querySelector('nav')
		Ignyte.nav_items = Ignyte.nav.querySelectorAll('span')
		Ignyte.nav_items.forEach((i) => i.onclick = Ignyte.on_click_nav.bind(Ignyte, i))

		Ignyte.c_type_selector = document.querySelector('.content-type-selector')
		Ignyte.c_type_selector_items = Ignyte.c_type_selector.querySelectorAll('span')
		Ignyte.c_type_selector_items.forEach((i) => i.onclick = Ignyte.on_click_con_type.bind(this, i))

		Ignyte.sections = document.querySelectorAll('main')
	}

	static on_click_nav(item: HTMLElement) {

		Ignyte.nav_items.forEach((item) => item.classList.remove('selected'))
		item.classList.add('selected')

		let name: String = item.attributes['name'].value
		Ignyte.sections.forEach((s) => 
			s.classList[s.attributes['name'].value == name ? 'add' : 'remove']('active'));
	}
	
	static on_click_con_type(item: HTMLElement) {
		
		Ignyte.c_type_selector_items.forEach((item) => item.classList.remove('selected'))
		item.classList.add('selected')
	}
}

Ignyte.init()