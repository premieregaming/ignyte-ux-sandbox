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
import { AccountService } from './account/account.service';
import { ProfileModule } from './profile/profile.module';
import { EventsModule } from './events/events.module';
import { NewsModule } from './news/news.module';
import { GamesModule } from './games/games.module';
import { ProfileController } from './profile/profile.controller';
import { NewsController } from './news/news.controller';
import { GamesController } from './games/games.controller';
import { EventsController } from './events/events.controller';
import { ProfileService } from './profile/profile.service';
import { EventsService } from './events/events.service';
import { NewsService } from './news/news.service';
import { GamesService } from './games/games.service';
import { TeamsController } from './teams/teams.controller';
import { TeamsModule } from './teams/teams.module';
import { TeamsService } from './teams/teams.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { ContentController } from './content/content.controller';
import { ContentService } from './content/content.service';
import { ContentModule } from './content/content.module';
import { AdsModule } from './ads/ads.module';
import { AdsController } from './ads/ads.controller';
import { AdsService } from './ads/ads.service';
import { ChatService } from './chat/chat.service';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsModule } from './settings/settings.module';
import { XpController } from './xp/xp.controller';
import { XpModule } from './xp/xp.module';
import { ImagesController } from './images/images.controller';
import { ImagesModule } from './images/images.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { XpService } from './xp/xp.service';
import { ImagesService } from './images/images.service';
import { join } from 'path';
import { SanitycheckModule } from './testing/sanitycheck/sanitycheck.module';
import path = require('path');

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
    ProfileModule,
    EventsModule,
    NewsModule,
    GamesModule,
    TeamsModule,
    ChatModule,
    ContentModule,
    AdsModule,
    NotificationsModule,
    SettingsModule,
    XpModule,
    ImagesModule,
    IntegrationsModule,
    SanitycheckModule
  ],
  controllers: [
    AppController,
    TempController,
    AccountController,
    DatabaseController,
    ProfileController,
    EventsController,
    NewsController,
    GamesController,
    TeamsController,
    ChatController,
    ContentController,
    AdsController,
    XpController,
    ImagesController
  ],
  providers: [
    AppService,
    AccountService,
    DatabaseService,
    ProfileService,
    EventsService,
    NewsService,
    GamesService,
    TeamsService,
    ContentService,
    AdsService,
    ChatService,
    XpService,
    ImagesService
  ],
})

export class AppModule { }