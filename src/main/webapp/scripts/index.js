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
    /*
        const loginGuestButtonEl = document.getElementById('loginGuest-button');
        loginGuestButtonEl.addEventListener('click', onLoginGuestButtonClicked);
    */

}
document.addEventListener('DOMContentLoaded', onLoad);


