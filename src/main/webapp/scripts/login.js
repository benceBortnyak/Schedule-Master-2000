function onLoginResponse() {
    if (this.status === OK) {
        console.log("login complete");
        loginContentDivEl.style.display = 'none';
        mainContentDivEl.style.display = 'block';
    }

}

function onLoginButtonClicked(){
    const loginFormEl = document.forms['login-form'];
    const emailInputEl = loginFormEl.querySelector('input[name="email"]');
    const passwordInputEl = loginFormEl.querySelector('input[name="psw"]');

    const email = emailInputEl.value;
    const password = passwordInputEl.value;

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoginResponse);
    xhr.open('POST', 'login');
    xhr.send(params);
}

