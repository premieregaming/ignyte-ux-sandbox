export class Net {
    static get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.responseType = 'json';
            xhr.open('GET', url);
            xhr.onload = () => {
                resolve(xhr.response);
            };
        });
    }
    static post(url, data) {
        throw "not implemented";
    }
}
