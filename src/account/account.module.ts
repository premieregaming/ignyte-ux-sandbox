import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AccountService } from './account.service';

@Module({
  providers: [AccountService, DatabaseService]
})
export class AccountModule {

}
