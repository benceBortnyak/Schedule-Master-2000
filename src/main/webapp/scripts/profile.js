function onLoadProfile(user) {
    const userforenameSpanEl = document.getElementById('user-forename');
    const userLastNameSpanEl = document.getElementById('user-lastName');
    const userEmailSpanEl = document.getElementById('user-email');

    userforenameSpanEl.textContent = user.forename;
    userLastNameSpanEl.textContent = user.lastName;
    userEmailSpanEl.textContent = user.email;

    onLoadSchedules(user.id);
}

function onProfileButtonClicked(){
    showContents(['profile-content', 'main-content']);
}

function onCloseProfileButtonClicked() {
    showContents(['main-content']);
}