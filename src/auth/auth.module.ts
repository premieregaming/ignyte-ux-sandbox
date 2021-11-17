import { Module } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseController } from '../database/database.controller';
import { DatabaseService } from '../database/database.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({

  controllers: [AuthController],
  providers: [AuthService, DatabaseService, AccountService],
})
export class AuthModule {}
