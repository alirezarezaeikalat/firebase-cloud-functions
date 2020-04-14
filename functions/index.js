const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// auth trigger 

exports.newUserSignup = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    upvotedOn: []
  });
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection('users').doc(user.uid);
  return doc.delete();
});

/// https callable function

exports.addRequest = functions.https.onCall(async (data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Only authenticated users can add requests'
    );
  }
  if(data.text.length > 30) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Request must be no more than 30 character long'
    );
  }
  await admin.firestore().collection('requests').add({
    text: data.text,
    upvotes: 0
  });
});

// upvote callable function
exports.upvote = functions.https.onCall(async (data, context) => {
  // check the auth state
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Only authenticated users can vote'
    );
  }
  // get refs for user doc and request doc
  const user = admin.firestore().collection('users').doc(context.auth.uid);
  const request = admin.firestore().collection('requests').doc(data.id);

  const doc = await user.get();
    console.log(doc.data());
    // check user hasn't already upvoted the request
    if(doc.data().upvotedOn.includes(data.id)) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'You can only upvote something once'
      );
    }
    // update user array
     await user.update({
      upvotedOn: [...doc.data().upvotedOn, data.id]
    });
      // update vote on request
    await request.update({
        upvotes: admin.firestore.FieldValue.increment(1)
    });
});