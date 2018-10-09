"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const simpleOauth2 = require("simple-oauth2");
const request = require("request");
const OAUTH_SCOPES = 'basic';
function createMeetupOAuth2Client() {
    const credentials = {
        client: {
            id: functions.config().meetup.client_id,
            secret: functions.config().meetup.client_secret
        },
        auth: {
            tokenHost: 'https://secure.meetup.com',
            tokenPath: '/oauth2/access',
            authorizePath: '/oauth2/authorize'
        }
    };
    return simpleOauth2.create(credentials);
}
exports.getRedirectURL = function (uri) {
    const oauth2Client = createMeetupOAuth2Client();
    const redirectUri = oauth2Client.authorizationCode.authorizeURL({
        redirect_uri: uri,
        scope: OAUTH_SCOPES,
        set_mobile: 'on',
    });
    return redirectUri.replace(/%2B/g, '+');
};
exports.getToken = function (code, uri) {
    const oauth2Client = createMeetupOAuth2Client();
    return new Promise((resolve, reject) => {
        try {
            oauth2Client.authorizationCode.getToken({
                code,
                redirect_uri: uri,
            }).then(result => {
                console.log('Auth code exchange result received:', result);
                request.get({ url: `https://api.meetup.com/2/member/self/?access_token=${result.access_token}` }, ((error, response, body) => {
                    if (error) {
                        throw new Error(error);
                    }
                    resolve({ meetupToken: result.access_token, body });
                }));
            }).catch(error => { throw new Error(error); });
        }
        catch (error) {
            reject(error);
        }
    });
};
//# sourceMappingURL=meetup.js.map