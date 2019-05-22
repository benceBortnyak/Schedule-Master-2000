const OK = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

let loginContentDivEl;
let signUpContentDivEl;
let mainContentDivEl;
let profileContentDivEl;
let schedulesContentDivEl;

function hasAuthorization() {
    return localStorage.getItem('user') !== null;
}

function setAuthorization(user) {
    return localStorage.setItem('user', JSON.stringify(user));
}

function getAuthorization() {
    return JSON.parse(localStorage.getItem('user'));
}

function setUnauthorized() {
    return localStorage.removeItem('user');
}

function onLoad() {
    loginContentDivEl = document.getElementById('login-content');
    mainContentDivEl = document.getElementById('main-content');
    signUpContentDivEl = document.getElementById('signUp-content');
    profileContentDivEl = document.getElementById('profile-content');
    schedulesContentDivEl = document.getElementById('schedules-content');

    const signUpButtonEl = document.getElementById('signUp-button');
    signUpButtonEl.addEventListener('click', onSignUpButtonClicked);

    const loginButtonEl = document.getElementById('login-button');
    loginButtonEl.addEventListener('click', onLoginButtonClicked);

    const profileButtonEl = document.getElementById('profile-button');
    profileButtonEl.addEventListener('click', onProfileButtonClicked);

    if(hasAuthorization()) {
        onProfileLoad(getAuthorization());
    }

}
document.addEventListener('DOMContentLoaded', onLoad);

function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}
