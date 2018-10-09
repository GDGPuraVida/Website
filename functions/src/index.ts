import * as functions from 'firebase-functions';
import * as meetup from './meetup';
import * as firebase from './firebase';

const OAUTH_REDIRECT_URI = `https://${process.env.GCLOUD_PROJECT}.xyz/profile`;

export const meetupLogin = functions.https.onCall(() => {
  const url = meetup.getRedirectURL(OAUTH_REDIRECT_URI);
  console.log(`redirecting to meetup for login: ${url}`);
  return { url };
});

export const exchangeToken = functions.https.onCall((data) => {
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
  }).catch(error => { throw new Error(error) });
});
