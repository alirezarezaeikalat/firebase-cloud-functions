const options = {
  dismissible: false,
  opacity: 0.8,
  inDuration: 400,
  outDuration: 400
};
const hidingOptions = { opacity: 1 };
const auth = firebase.auth();
var hidingModal = document.querySelector("#hiding-modal");
var loginModal = document.querySelector("#login-modal");
var registerModal = document.querySelector("#register-modal");
const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");
const signOuts = document.querySelectorAll('.sign-out')
// hiding modal
M.Modal.init(hidingModal, hidingOptions);
hidingModal = M.Modal.getInstance(hidingModal);
hidingModal.open();

// login modal initializing
M.Modal.init(loginModal, options);
loginModal = M.Modal.getInstance(loginModal);


// register modal initializing
M.Modal.init(registerModal, options);
registerModal = M.Modal.getInstance(registerModal);

// closing the login modal and showing register modal
var noAccount = document.querySelector('.no-account');
noAccount.addEventListener('click', (e) => {
  loginModal.close();
});

// closing the register modal and showing login modal
var gotAccount = document.querySelector('.got-account');
gotAccount.addEventListener('click', (e) => {
  registerModal.close();
});


//  register form //
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = registerForm['register-email'].value;
  const password = registerForm['register-password'].value;
   auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      registerForm.reset();
    }).catch(err => {
      registerForm.querySelector('.error').textContent = err.message;
    });
});

// Login form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      loginForm.reset();
    })
    .catch((err) => {
      loginForm.querySelector(".error").textContent = err.message;
    });
});

/// Create request form 

// Sign out 
signOuts.forEach(signOut => { 
  signOut.addEventListener('click', () => {
    auth.signOut().then(() => {
      console.log('user has signed out');
    });
  });
});

// Set up for auth listener

auth.onAuthStateChanged(user => {
  if (user) {
    loginModal.close();
    registerModal.close();
    hidingModal.close();
  } else {
    hidingModal.open();
    loginModal.open();
  }
});