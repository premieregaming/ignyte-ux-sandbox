import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { TempController } from './temp/temp.controller';
import { TempModule } from './temp/temp.module';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'ux'),
            exclude: ['/api*'],
        }),
        AuthModule,
        TempModule,
        AccountModule,
        DatabaseModule,
    ],
    controllers: [AppController, TempController, AccountController],
    providers: [AppService, DatabaseService],
})

export class AppModule {}
