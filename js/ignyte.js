var Ignyte = /** @class */ (function () {
    function Ignyte() {
    }
    Ignyte.init_temp_db = function () {
        var DBOpenRequest = window.indexedDB.open("news", 1);
        DBOpenRequest.onsuccess = function (event) { Ignyte.db = DBOpenRequest.result; };
    };
    Ignyte.init = function () {
        var _this = this;
        Ignyte.nav = document.querySelector('nav');
        Ignyte.nav_items = Ignyte.nav.querySelectorAll('span');
        Ignyte.nav_items.forEach(function (i) { return i.onclick = Ignyte.on_click_nav.bind(Ignyte, i); });
        Ignyte.c_type_selector = document.querySelector('.content-type-selector');
        Ignyte.c_type_selector_items = Ignyte.c_type_selector.querySelectorAll('span');
        Ignyte.c_type_selector_items.forEach(function (i) { return i.onclick = Ignyte.on_click_con_type.bind(_this, i); });
        Ignyte.sections = document.querySelectorAll('main');
    };
    Ignyte.on_click_nav = function (item) {
        Ignyte.nav_items.forEach(function (item) { return item.classList.remove('selected'); });
        item.classList.add('selected');
        var name = item.attributes['name'].value;
        Ignyte.sections.forEach(function (s) {
            return s.classList[s.attributes['name'].value == name ? 'add' : 'remove']('active');
        });
    };
    Ignyte.on_click_con_type = function (item) {
        Ignyte.c_type_selector_items.forEach(function (item) { return item.classList.remove('selected'); });
        item.classList.add('selected');
    };
    return Ignyte;
}());
Ignyte.init();
