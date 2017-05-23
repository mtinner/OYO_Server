import * as request from 'request';

export class EndpointRequester {
    private requestHandler = request;

    post(url, body): Promise<any> {
        return new Promise((resolve, reject) => {

            this.requestHandler.post(url, {json: body}, (error, response, body) => {
                if (error) {
                    reject(body);
                }
                else if (response) {
                    resolve(body);
                }
            })
        });
    }
}