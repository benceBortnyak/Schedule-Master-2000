
function onLoginResponse() {
    if (this.status === OK) {
        const user = JSON.parse(this.responseText);
        setAuthorization(user);
        if (hasAuthorization()) {
            showContents(['main-content']);
            onLoadProfile(getAuthorization());
        }
    }else if(this.status === UNAUTHORIZED){
        alert("Your email address or password was incorrect!");
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



