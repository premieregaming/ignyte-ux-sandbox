import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { TempController } from './temp/temp.controller';
import { TempModule } from './temp/temp.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'ux'),
            exclude: ['/api*'],
        }),
        AuthModule,
        TempModule,
    ],
    controllers: [AppController, TempController],
    providers: [AppService],
})

export class AppModule {}
