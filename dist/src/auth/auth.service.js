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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const database_service_1 = require("../database/database.service");
const account_service_1 = require("../account/account.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(database, account) {
        this.database = database;
        this.account = account;
    }
    async googleTokenVerify(token) {
        try {
            const ticket = await AuthService_1.client.verifyIdToken({
                idToken: token,
                audience: AuthService_1.google_client_id,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            return userid;
        }
        catch (e) {
            debugger;
        }
    }
    async googleAuth(data) {
        return new Promise((resolve, reject) => {
            try {
                let sql = 'select user_id from google_user_accounts where google_id = $1';
                this.database.query(sql, [data.id]).then((res) => {
                    if (res.length == 0) {
                        this.account.create_google_acct(data).then((res) => resolve(res));
                    }
                    else {
                        resolve(res[0].user_id);
                    }
                });
            }
            catch (e) {
                return false;
            }
        });
    }
};
AuthService.google_client_id = '1048890093326-a8kisu4dulmt0hu5606s9r0hhs4847ci.apps.googleusercontent.com';
AuthService.client = new google_auth_library_1.OAuth2Client(AuthService_1.google_client_id);
AuthService = AuthService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService, account_service_1.AccountService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map