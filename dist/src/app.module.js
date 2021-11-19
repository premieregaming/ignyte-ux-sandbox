"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_controller_1 = require("./database/database.controller");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const database_service_1 = require("./database/database.service");
const serve_static_1 = require("@nestjs/serve-static");
const auth_module_1 = require("./auth/auth.module");
const temp_module_1 = require("./temp/temp.module");
const account_module_1 = require("./account/account.module");
const temp_controller_1 = require("./temp/temp.controller");
const account_controller_1 = require("./account/account.controller");
const account_service_1 = require("./account/account.service");
const path_1 = require("path");
const path = require("path/posix");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'ux'),
                exclude: ['/api*'],
            }),
            config_1.ConfigModule.forRoot({ envFilePath: path.join(__dirname, '../../.env') }),
            auth_module_1.AuthModule,
            temp_module_1.TempModule,
            account_module_1.AccountModule,
            database_module_1.DatabaseModule,
        ],
        controllers: [app_controller_1.AppController, temp_controller_1.TempController, account_controller_1.AccountController, database_controller_1.DatabaseController],
        providers: [app_service_1.AppService, account_service_1.AccountService, database_service_1.DatabaseService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map