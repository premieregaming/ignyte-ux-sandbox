"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let AccountService = class AccountService {
    constructor(db) {
        this.db = db;
    }
    async create_google_acct(g_user) {
        let user_sql = 'insert into users (email, first_name, last_name, google_account_id, profile_photo) values ($1, $2, $3, $4, $5) returning id';
        let google_sql = 'insert into google_user_accounts (user_id, google_id, email, first_name, last_name, profile_photo) values ($1, $2, $3, $4, $5, $6)';
        let user_values = [g_user.email, g_user.first_name, g_user.last_name, g_user.id, g_user.profile_photo];
        return new Promise((resolve, reject) => {
            this.db.query(user_sql, user_values).then((res) => {
                let id = res[0].id;
                let google_values = [id, g_user.id, g_user.email, g_user.first_name, g_user.last_name, g_user.profile_photo];
                this.db.query(google_sql, google_values).then((res) => { resolve(id); });
            });
        });
    }
    async get_account_data(id) {
        let sql = 'select id, email, first_name, last_name, profile_photo, google_account_id, fb_account_id, create_timestamp from users where id = $1';
        let values = [id];
        return new Promise((resolve, reject) => {
            this.db.query(sql, values).then((res) => { resolve(res[0]); });
        });
    }
};
AccountService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map