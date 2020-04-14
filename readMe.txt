1. when we use firebase services, sometimes we need to write 
our server side code, to run some code on server side, not in the
front end, for example codes like authorization, in order to do 
so, and run codes in server side, firebase add cloud functions
to run codes on server side, and cloud functions can intearact
with other firebase services like Cloud Firestore,
Firebase Hosting, Firebase Authentication and Cloud Storage.

2. Firebase Cloud functions runs on node js environment

3. When we use firebase init, to initialize the project from 
  firebase cli, and when use different firebase services in
  firebase cli, we should already initialize these services from
  firebase console, to be able to use them in firebase cli.

4. If we use firebase cli for initializing the firebase project,
    when, we use firestore, we have to define a file for 
    firestore rules, and firebase indexes.

5. after initializing the project, you can go to setting of 
    your app in firebase console, and copy the script file, and
    also adds the services you need:

    <script src="/__/firebase/7.13.2/firebase-app.js"></script>
    <script src="/__/firebase/7.13.2/firebase-auth.js"></script>
    <script src="/__/firebase/7.13.2/firebase-firestore.js"></script>
    <script src="/__/firebase/7.13.2/firebase-functions.js"></script>
    <!-- Initialize Firebase -->
    <script src="/__/firebase/init.js"></script>

    [ATTENTION]
      because we use firebase cli we don't need to initialize the
      app like we use without cli:

      import firebaseConfig from "../config/firebase-config.js";
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

6. Then because we use firebase hosting, in this project. we can 
  use development server that is inside firebase-tools to preview
  the project:

      firebase serve -p 5000 -o 127.0.0.1

  
7. There are several types of cloud functions that triggers in 
    different way:
      a. database events
      b. auth events
      c. storage events
      d. analytics events
      e. HTTPs triggers (We use them directly by end points
          just like using api)
          There are two type of http function, callable one and
          reqest one. 
  
8. To use cloud functions, first we create them locally, then we 
    deploy them on firebase to be on server side.

9. The example of HTTPS request functions:

      exports.randomNumber = functions.https.onRequest((req, res) => {
        const number = Math.round(Math.random() * 100);
        res.send(number.toString());
      });

    Then you have to deploy this function on firebase:
        firebase deploy --only functions
  
  after deploying you can see this function in function tab 
  in firebase console, and there is end point for this function.

10. also There is Logs, Health and usage tab in firebase console,
    There are some, pre existing logs, but you can also write in
    this logs by using console.log:

    exports.toTheGoogle = functions.https.onRequest((req, res) => {
      console.log('salam');
      res.redirect('https://google.com');
    })

11. The example of https callable functions:
    // context has info about the request
    exports.sayHello = functions.https.onCall((data, context) => {
      const name = data.name;
      return `hello ghasem`;
    });

  You can call this functions from UI:
      
      button.addEventListener('click', () => {
        // get functio reference
        const sayHello = firebase.functions().httpsCallable('sayHello');
        sayHello({name: 'alireza'}).then(result => {
          console.log(result.data);
        });
      });

/// Authentication triggers functions 

12. There are some cloud functions that runs based on auth events:

    exports.newUserSignup = functions.auth.user().onCreate(user => {
      console.log('user created', user.email, user.uid);
    });

    exports.userDeleted = functions.auth.user().onDelete((user) => {
      console.log("user created", user.email, user.uid);
    });

13. To use firestore, auth, and other capablities in functions,
 we have to require firebase admin sdk:
 it is just like firebase object that we use in js files

      require('firebase-admin');
      admin.initializeApp();


[ATTENTION]
14. in these two auth functions, we don't return anything, if 
  you check the logs of functions, we get error for that, it is 
  convention to return PROMISE in these functions.

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

15. To add request to the app, we must check for the conditions of
    that request, if they are logged in or ... :
    

      exports.addRequest = functions.https.onCall((data, context) => {
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
         admin.firestore().collection('requests').add({
          text: data.text,
          upvotes: 0
        }).then((doc) => {
          console.log('The request has been created');
          
        });
      });

16. To render html based on auth status, or using onSnapshot:
      auth.onAuthStateChanged(user => {
        if (user) {
          loginModal.close();
          registerModal.close();
          ref.onSnapshot((snapshot) => {
            setupUI(snapshot.docs);
          });
          hidingModal.close();
        } else {
          setupUI(null);
          hidingModal.open();
          loginModal.open();
        }
      });

17. rendering html based on onSnapshot is not very eficient, because
    you have to render all the elements, every time there is a
    change in the database, and even if you want to add events, to
    elements it is not efficient either. instead you can use Vue 
    Component

        var app = new Vue({
          el: "#requests-list",
          data: {
            requests: [],
            as: 'salam'
          },
          mounted() {
            const ref = firebase.firestore().collection('requests');
            ref.onSnapshot(snapshot => {
              let requests = [];
              snapshot.docs.forEach(doc => {
                requests.push({...doc.data(), id: doc.id});
              });
              this.requests = requests;
            });
          },
        });

18. We can use this way to add to a value in database:
      request.update({
        upvotes: admin.firestore.FieldValue.increment(1)
      });

[ATTENTION]
19. you can return data noramlly in callable functions, or if the 
  data is going to return after async operation you can do this 
  by returning the promise:
  [ATTENTION] promise itself is somehow data, you can return
      another promise after async function.

    a.  return {
          firstNumber: firstNumber,
          secondNumber: secondNumber,
          operator: '+',
          operationResult: firstNumber + secondNumber,
        };

    b.  const sanitizedMessage = sanitizer.sanitizeText(text); 
          return admin.database().ref('/messages').push({
            text: sanitizedMessage,
            author: { uid, name, picture, email },
          }).then(() => {
            console.log('New Message written');
            // Returning the sanitized message to the client.
            return { text: sanitizedMessage };
          })

20. We can use async await in cloud functions

21. We can use firestore triggers functions: 
    
    exports.logActivities = functions.firestore.document('/{collection/{id}}')
      .onCreate((snap, cotext) => {
        const collection = context.params.collection;
        const id = context.params.id;
        console.log(snap);
      });


22. [ATTENTION]
    When we deploy the site, we deploy all of, so it is possible
    that, the rules in firestore.rules file override the rules in
    firestore rules in firebase console, so always update your 
    firestore.rules file.