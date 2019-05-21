function onSignUpResponse() {
    console.log("signup ok");
}

function onSubmitButtonClicked() {
    const signUpFormEl = document.forms['signUp-form'];
    const emailInputEl = signUpFormEl.querySelector('input[name="email"]');
    const forenameInputEl = signUpFormEl.querySelector('input[name="forename"]');
    const lastNameInputEl = signUpFormEl.querySelector('input[name="lastName"]');
    const passwordInputEl = signUpFormEl.querySelector('input[name="psw"]');

    const email = emailInputEl.value;
    const forename = forenameInputEl.value;
    const lastName = lastNameInputEl.value;
    const password = passwordInputEl.value;
    
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('forename', forename);
    params.append('lastName', lastName);
    params.append('password', password);
    
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSignUpResponse);
    xhr.open('POST', 'signup');
    xhr.send(params);
}

function backToLoginButtonClicked() {
    loginContentDivEl.style.display = 'block';
    signUpContentDivEl.style.display = 'none';
}

function onSignUpButtonClicked() {
    loginContentDivEl.style.display = 'none';
    signUpContentDivEl.style.display = 'block';

    const backToLoginButtonEl = document.getElementById('backToLoginButton');
    backToLoginButtonEl.addEventListener('click', backToLoginButtonClicked);

    const submitButtonEl = document.getElementById('submitButton');
    submitButtonEl.addEventListener('click', onSubmitButtonClicked);
}