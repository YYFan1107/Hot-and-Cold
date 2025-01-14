/* === Imports === */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"

/* === Firebase Setup === */

const firebaseConfig = {
    apiKey: "AIzaSyAWgEQ3wdB6JCwYmB4-eOHdQs8STcxq6GQ",
    authDomain: "hot-and-cold-4d10e.firebaseapp.com",
    projectId: "hot-and-cold-4d10e",
    storageBucket: "hot-and-cold-4d10e.firebasestorage.app",
    messagingSenderId: "576669163269",
    appId: "1:576669163269:web:9792a16c27cd100401e16c"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth)
console.log(app.options.projectId)

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")

// for displaying the name
const userGreetingEl = document.getElementById("user-greeting")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user)
        showUserGreeting(userGreetingEl, user)
    } else {
        // User is signed out
        showLoggedOutView()
    }
})

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")

    const email = emailInputEl.value
    const password = passwordInputEl.value
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        showLoggedInView()
    })
    .catch((error) => {
        console.error(error.message)
    })
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")

    const email = emailInputEl.value
    const password = passwordInputEl.value
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up
        showLoggedInView()
    })
    .catch((error) => {
        console.error(error.message)
    })
}

function authSignOut() {
    signOut(auth).then(() => {
        // Sign-out successful.
        showLoggedOutView()
    }).catch((error) => {
        // An error happened.
        console.error(error.message)
    })
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
    view.style.display = "flex"
}

function hideView(view) {
    view.style.display = "none"
}

function showProfilePicture(imgElement, user) {
    if (user.photoURL) {
        imgElement.src = user.photoURL
    } else {
        imgElement.src = "assets/images/defaultPic.jpg"
    }
}

function showUserGreeting(element, user) {
    if (user.displayName) {
        element.textContent = "Hi " + user.displayName
    } else {
        element.textContent = "Hey friend, how are you?"
    }
}

//credit: coursera