import * as admin from 'firebase-admin';

const serviceAccount = require("./../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gdgPuraVida.firebaseio.com',
});

admin.firestore().settings({timestampsInSnapshots: true});

export const createAccount = function(id, link, name, photo, token) {
  const uid = `meetup:${id}`;
  
  const databaseTask = admin.firestore().collection('meetupTokens').doc(uid).set({token, link, name});

  const userCreationTask = admin.auth().updateUser(uid, {
    displayName: name,
    photoURL: photo,
  }).catch(error => {
    if (error.code === 'auth/user-not-found') {
      return admin.auth().createUser({
        uid: uid,
        displayName: name,
        photoURL: photo,
      });
    }
    throw error;
  });

  return Promise.all([userCreationTask, databaseTask]).then(() => {
    return admin.auth().createCustomToken(uid).then((firebaseToken: string) => {
      console.log('Created Custom token for UID "', uid, '" Token:', firebaseToken);
      return firebaseToken;
    });
  });
}