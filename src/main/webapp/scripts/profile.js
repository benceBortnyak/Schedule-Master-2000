function onProfileLoad(user) {
    const userforenameSpanEl = document.getElementById('user-forename');
    const userLastNameSpanEl = document.getElementById('user-lastName');
    const userEmailSpanEl = document.getElementById('user-email');

    userforenameSpanEl.textContent = user.forename;
    userLastNameSpanEl.textContent = user.lastName;
    userEmailSpanEl.textContent = user.email;

    const params = new URLSearchParams();
    params.append('id', user.id);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSchedulesReceived);
    xhr.open('POST', 'schedules');
    xhr.send(params);
}

function onProfileButtonClicked(){
    showContents(['profile-content', 'main-content']);
}

function onCloseProfileButtonClicked() {
    showContents(['main-content']);

}