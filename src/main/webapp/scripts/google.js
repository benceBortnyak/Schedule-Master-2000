function onSignIn(googleUser) {

    // Useful data for your client-side scripts:
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onGoogleResponse);
    xhr.open('POST', 'GoogleSignIn');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('idtoken=' + id_token);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function onGoogleResponse() {
    if (this.status === OK) {
        const user = JSON.parse(this.responseText);
        setAuthorization(user);
        if (hasAuthorization()) {
            showContents(['main-content']);
            createDrop();
            onLoadProfile(getAuthorization());

        }
    }else if(this.status === UNAUTHORIZED){
        alert("Your email address or password was incorrect!");
    }
}
