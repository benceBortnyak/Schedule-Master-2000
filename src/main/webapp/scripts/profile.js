function onProfileLoad(user) {
    const userforenameSpanEl = document.getElementById('user-forename');
    const userLastNameSpanEl = document.getElementById('user-lastName');
    const userEmailSpanEl = document.getElementById('user-email');

    userforenameSpanEl.value = user.forename;
    userLastNameSpanEl.value = user.lastName;
    userEmailSpanEl.value = user.email;

}