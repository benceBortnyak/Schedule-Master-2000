function onLogoutResponse() {
    if (this.status === OK) {
        setUnauthorized();
        clearMessages();
        showContents(['welcome-content']);
        document.getElementById('sideNavList').remove();
    } else {
        onOtherResponse(loginContentDivEl, this)
    }
}

function onLogoutButtonClicked() {
    activeSchedule = null;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLogoutResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/logout');
    xhr.send();

}
