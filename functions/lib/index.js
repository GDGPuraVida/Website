"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const meetup = require("./meetup");
const firebase = require("./firebase");
const OAUTH_REDIRECT_URI = `https://${process.env.GCLOUD_PROJECT}.xyz/profile`;
exports.meetupLogin = functions.https.onCall(() => {
    const url = meetup.getRedirectURL(OAUTH_REDIRECT_URI);
    console.log(`redirecting to meetup for login: ${url}`);
    return { url };
});
exports.exchangeToken = functions.https.onCall((data) => {
    console.log('Received auth code:', data.code);
    return meetup.getToken(data.code, OAUTH_REDIRECT_URI).then(result => {
        const body = JSON.parse(result.body);
        return firebase.createAccount(body.id, body.link, body.name, body.photo.photo_link, result.meetupToken).then(firebaseToken => {
            console.log(`Returning firebaseToken ${firebaseToken}`);
            return { token: firebaseToken };
        }).catch(error => {
            console.error(error);
            throw new Error(error);
        });
    }).catch(error => { throw new Error(error); });
});
//# sourceMappingURL=index.js.map