import { Controller, Get, Param } from '@nestjs/common';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {

	constructor(private readonly service: AdsService) { }

	@Get(':user_id')
	async getUserAds(@Param() param): Promise<any> {

		return this.service.getUserAds(param.user_id)
	}
}
