import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

	constructor(private readonly service: ProfileService) { }

	@Get(':id/profilepic')
	getProfilePic(@Param() param): any {

		return this.service.getProfilePic(param.id)
	}

	@Put(':id/profilepic')
	uploadProfilePic(@Param() param): any {

	}

	@Get(':id/wallpaper')
	getWallpaper(@Param() param): any {
		
		return this.service.getWallpaper(param.id)
	}

	@Put(':id/wallpaper')
	uploadWallpaper(@Param() param): any {

		
	}

	@Get(':id/posts/:start/:length')
	getPosts(@Param() param): any {

		return this.service.getPosts(param.id, param.start, param.length)
	}

	@Get(':id/bio')
	getBio(@Param() param): any {

		return this.service.getBio(param.id)
	}

	@Get(':id/platforms/:start/:length')
	getPlatforms(@Param() param): any {

		return this.service.getPlatforms(param.id, param.start, param.length)
	}

	@Get(':id/devices')
	getDevices(@Param() param): any {

		return this.service.getDevices(param.id)
	}

	@Get(':id/education')
	getEducation(@Param() param): any {

		return this.service.getEducation(param.id)
	}

	@Post(':id/education')
	postEducation(@Body() data): any {

		return this.service.postEducation(data)
	}

	@Delete(':id/education')
	deleteEducation(@Param() param): any {

		return this.service.deleteEducation(param.id)
	}
	
	@Get(':id/skills')
	getSkills(@Param() param): any {

		return this.service.getSkills(param.id)
	}

	@Get(':id/photos/:start/:length')
	getPhotos(@Param() param): any {

		return this.service.getPhotos(param.id, param.start, param.length)
	}

	@Get(':id/exportcv')
	exportCV(@Param() param): any {

		return this.service.exportCV(param.id)
	}

	@Get(':id/friends')
	getFriends(@Param() param): any {

		return this.service.getFriends(param.id)
	}

	@Post(':id/friendrequest/:friend_id')
	requestFriend(@Param() param): any {

		return this.service.requestFriend(param.id, param.friend_id)
	}

	@Post(':id/follow/:follow_id')
	followUser(@Param() param): any {

		return this.service.followUser(param.id, param.follow_id)
	}

	@Get(':id/bank-total')
	getBankTotal() {

	}

	@Post(':id/add-funds')
	addFunds() {}

	@Post(':id/withdraw-funds')
	withdrawFunds() {}

	@Post(':id/transfer-funds')
	transferFunds() {}
	
}