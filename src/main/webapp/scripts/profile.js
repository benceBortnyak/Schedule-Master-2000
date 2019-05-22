function onProfileLoad(user) {
    const userforenameSpanEl = document.getElementById('user-forename');
    const userLastNameSpanEl = document.getElementById('user-lastName');
    const userEmailSpanEl = document.getElementById('user-email');

    userforenameSpanEl.textContent = user.forename;
    userLastNameSpanEl.textContent = user.lastName;
    userEmailSpanEl.textContent = user.email;

}

function onProfileButtonClicked(){
    mainContentDivEl.style.display = "none";
    profileContentDivEl.style.display = "block";
}