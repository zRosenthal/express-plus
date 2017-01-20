import requestPromise = require('request-promise');

interface IAccessToken {

    access_token: string;
    token_type: string;
    expires_in: number;
}

class FacebookAuthProvider {

    static CLIENT_ID = '';
    static REDIRECT_URI = '';
    static CLIENT_SECRET = '';
    static URI = '';

    public registerUser(code: string): any {
        return new Promise<any>((resolve, reject) => {
            FacebookAuthProvider.getRegisterData(code)
                .then(
                    res => resolve(res),
                    error => reject(error)
                );
        });
    }

    private static getRegisterData(token: string): Promise<Object> {
        let options = {
            uri: `${FacebookAuthProvider.URI}me`,
            qs: {
                access_token: token,
                fields: 'name,picture,email'
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };


        return requestPromise(options).then(
            res => res,
            error => error
        );
    }


}

export = FacebookAuthProvider;
