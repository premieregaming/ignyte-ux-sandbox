import { Auth } from './auth.js'
import { Ignyte } from './ignyte.js'
import { AccountData } from './interface/account-data.js'
import { Net } from './sdk/net.js'

export class Account {

	static data: AccountData

	static get_account() {

		Net.get('/api/account/data/' + Auth.authenticated_user_id).then((res) => {
			Account.data = new AccountData(res)
			Ignyte.render_account()
		})
	}
}