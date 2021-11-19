import { Global, Module } from '@nestjs/common';
import { GoogleAuthDto } from '../auth/dto/google-auth.dto';
import { DatabaseService } from '../database/database.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Global()
@Module({
  imports: [GoogleAuthDto],
  controllers: [AccountController],
  providers: [AccountService, DatabaseService]
})
export class AccountModule {

}
