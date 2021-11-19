import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

	constructor(private readonly service: AccountService) {}

	@Get('data/:id')
	getAccountData(@Param() params): any {

		return this.service.get_account_data(params.id);
	}
}
