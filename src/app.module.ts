import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { TempModule } from './temp/temp.module';
import { AccountModule } from './account/account.module';
import { TempController } from './temp/temp.controller';
import { AccountController } from './account/account.controller';
import { join } from 'path';
import path = require('path/posix');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'ux'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({ envFilePath: path.join(__dirname, '../../.env')}),
    AuthModule,
    TempModule,
    AccountModule,
    DatabaseModule,
  ],
  controllers: [AppController, TempController, AccountController, DatabaseController],
  providers: [AppService, DatabaseService],
})

export class AppModule { }
