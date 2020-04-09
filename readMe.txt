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

6. Then because we use firebase hosting, in this project. we can 
  use development server that is inside firebase-tools to preview
  the project:

      firebase serve -p 5000 -o 127.0.0.1

  


