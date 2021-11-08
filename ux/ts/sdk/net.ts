export class Net {

	static get(url: string): Promise<any> {
		
		return new Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest()
			xhr.open('GET', url)

			xhr.responseType = 'json'
			xhr.setRequestHeader('Content-Type', 'application/json')
			xhr.onload = () => {
				resolve(xhr.response)
			}
			xhr.send()
		})
	}

	static post(url: string, data: Object) {

		return new Promise((resolve, reject) => {

			var xhr = new XMLHttpRequest();
			xhr.open('POST', url);
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.send(JSON.stringify(data));
		})
	}
}