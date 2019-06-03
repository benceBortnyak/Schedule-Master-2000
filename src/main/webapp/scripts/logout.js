function onLogoutResponse() {
    if (this.status === OK) {
        setUnauthorized();
        clearMessages();
        showContents(['welcome-content']);
    } else {
        onOtherResponse(loginContentDivEl, this)
    }
}

function onLogoutButtonClicked() {
    console.log('cat');
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLogoutResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/logout');
    xhr.send();

}
