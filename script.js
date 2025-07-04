import { data } from "./data.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut 
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCvg6cVrAOUTQb82Zf4XaUR_8O4D47U0Yg",
    authDomain: "first-trial-706ca.firebaseapp.com",
    projectId: "first-trial-706ca",
    storageBucket: "first-trial-706ca.firebasestorage.app",
    messagingSenderId: "503325588183",
    appId: "1:503325588183:web:20559a90d3292605b20e92"
};


const app = initializeApp(firebaseConfig);

let blogContainer = document.querySelector('.blog-container');

function renderBlogs(data) {
    data.forEach((blog) => {
        let newElem = document.createElement('div');
        newElem.className = 'blog-card';
        newElem.innerHTML = `
        <img src="${blog.cover_image}" alt="JS Info" />
        <div class="blog-content">
        <h2 class="blog-title">${blog.title}</h2>
        <p class="blog-desc">${blog.description}</p>
        <a href="${blog.link}" class="blog-link" target="_blank">Read Blog</a>
        </div>`;
        blogContainer.appendChild(newElem)
    })
}

const auth = getAuth(app);

let SignupBtn = document.querySelector('#signup-btn');
let LoginBtn = document.querySelector('#Login-btn');
let signupForm = document.querySelector('#Signup-form');
let LoginForm = document.querySelector('#Login-form');
let signupEmailInput = signupForm.querySelector('#email');
let signupPasswordInput = signupForm.querySelector('#password');
let LoginEmailInput = LoginForm.querySelector('#email');
let LoginPasswordInput = LoginForm.querySelector('#password');
let logoutBtn = document.querySelector('#logout-btn')




SignupBtn.addEventListener('click' , (e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth , signupEmailInput.value , signupPasswordInput.value)
    .then((res)=>{
        alert('You have successfully Signup!');
        signupForm.style.display = 'none';
        LoginForm.style.display = 'none';
    })
    .catch((err)=>{
        alert(err.message)
    })
});

LoginBtn.addEventListener('click' , (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth , LoginEmailInput.value , LoginPasswordInput.value)
    .then(()=>{
        alert('You have successfully Login!');
        signupForm.style.display = 'none';
        LoginForm.style.display = 'none';
    })
    .catch((err)=>{
        alert(err.message)
    })
});

onAuthStateChanged(auth , (user)=>{
    if (user) {
        renderBlogs(data);
        logoutBtn.style.display = 'block'
    } else {
        blogContainer.innerHTML = '';
        signupForm.style.display = 'block';
        logoutBtn.style.display = 'none'

    }
})


logoutBtn.addEventListener('click' , ()=>{
    signOut(auth )
    .then(()=>{
        alert('you have successfully logout!')
    })
    .then((err)=>{
        alert(err.message)
    })
})

document.querySelector('#switch-to-login').addEventListener('click' ,()=>{
    signupForm.style.display = 'none';
    LoginForm.style.display = 'block';
})
document.querySelector('#switch-to-signup').addEventListener('click' ,()=>{
    signupForm.style.display = 'block';
    LoginForm.style.display = 'none';
})
