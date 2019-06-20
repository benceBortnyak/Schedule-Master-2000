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
let sideNavContentDivEl;
let logoutContentDivEl;
let tableDivEl;
let activeSchedule;
let activeTask;
let activeTasksList;
let dropEl;

window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}


function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}


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

function newInfo(targetEl, message) {
    newMessage(targetEl, 'info', message);
}

function newError(targetEl, message) {
    newMessage(targetEl, 'error', message);
}

function newMessage(targetEl, cssClass, message) {
    clearMessages();

    const pEl = document.createElement('p');
    pEl.classList.add('message');
    pEl.classList.add(cssClass);
    pEl.textContent = message;

    targetEl.appendChild(pEl);
}

function clearMessages() {
    const messageEls = document.getElementsByClassName('message');
    for (let i = 0; i < messageEls.length; i++) {
        const messageEl = messageEls[i];
        messageEl.remove();
    }
}

function showContents(ids) {
    const contentEls = document.getElementsByClassName('content');
    for (let i = 0; i < contentEls.length; i++) {
        const contentEl = contentEls[i];
        if (ids.includes(contentEl.id)) {
            contentEl.classList.remove('hidden');
        } else {
            contentEl.classList.add('hidden');
        }
    }
}

function onNetworkError(response) {
    document.body.remove();
    const bodyEl = document.createElement('body');
    document.appendChild(bodyEl);
    newError(bodyEl, 'Network error, please try reloading the page');
}

function onOtherResponse(targetEl, xhr) {
    if (xhr.status === NOT_FOUND) {
        newError(targetEl, 'Not found');
        console.error(xhr);
    } else {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status === INTERNAL_SERVER_ERROR) {
            newError(targetEl, `Server error: ${json.message}`);
        } else if (xhr.status === UNAUTHORIZED || xhr.status === BAD_REQUEST) {
            newError(targetEl, json.message);
        } else {
            newError(targetEl, `Unknown error: ${json.message}`);
        }
    }
}

function onCloseToMainClicked() {
    showContents(['main-content']);
}

function onCloseToWelcomeClicked() {
    showContents(['welcome-content'])
}

function createDrop() {
    const adminButtonEl = document.createElement('button');
    adminButtonEl.setAttribute('id', 'adminButton');
    adminButtonEl.textContent = 'Logging';
    //adminButtonEl.addEventListener('click', onAdminButtonClicked);
    console.log(adminButtonEl);
    if(getAuthorization().userType == 'ADMIN'){
        dropEl.appendChild(adminButtonEl);
    }

}

function onLoad() {
    dropEl = document.getElementById('myDropdown');
    loginContentDivEl = document.getElementById('login-content');
    mainContentDivEl = document.getElementById('main-content');
    signUpContentDivEl = document.getElementById('signUp-content');
    profileContentDivEl = document.getElementById('profile-content');
    schedulesContentDivEl = document.getElementById('schedules-content');
    sideNavContentDivEl = document.getElementById('sidenav-content');
    logoutContentDivEl = document.getElementById('logout-content');
    tableDivEl = tableDivEl = document.getElementById('table-content');
    activeSchedule = null;

    const profileButtonEl = document.getElementById('profile-button');
    profileButtonEl.addEventListener('click', onProfileButtonClicked);

    const logoutButtonEl = document.getElementById('logout-button');
    logoutButtonEl.addEventListener('click', onLogoutButtonClicked);

    const signUpButtonEl = document.createElement('signUp-button');
    signUpButtonEl.addEventListener('click', onSignUpButtonClicked);

    const loginButtonEl = document.getElementById('login-button');
    loginButtonEl.addEventListener('click', onLoginButtonClicked);

    const toLoginButtonEl = document.getElementById('toLogin-button');
    toLoginButtonEl.addEventListener('click', backToLoginButtonClicked);

    const toSignUpButtonEl = document.getElementById('toSignUp-button');
    toSignUpButtonEl.addEventListener('click', onSignUpButtonClicked);

    const closeProfileButtonEl = document.getElementById('closeProfile-button');
    closeProfileButtonEl.addEventListener('click', onCloseProfileButtonClicked);

    const closeLoginButtonEl = document.getElementById('closeLogin-button');
    closeLoginButtonEl.addEventListener('click', onCloseToWelcomeClicked);

    const closeSignUpButtonEl = document.getElementById('closeSignUp-button');
    closeSignUpButtonEl.addEventListener('click', onCloseToWelcomeClicked);

    const closeNewTaskButtonEl = document.getElementById('closeNewTask-button');
    closeNewTaskButtonEl.addEventListener('click', onCloseToMainClicked);

    const closeUpdateScheduleButtonEl = document.getElementById('closeUpdate-button');
    closeUpdateScheduleButtonEl.addEventListener('click', onCloseToMainClicked);

    const closeTaskButtonEL = document.getElementById('closeTask-button');
    closeTaskButtonEL.addEventListener('click', onCloseToMainClicked);
}

document.addEventListener('DOMContentLoaded', onLoad);



