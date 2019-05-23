function createScheduleList(scheduleList) {
    const ulEl = document.createElement('ul');
    for (let i = 0; i < scheduleList.length; i++) {
        const schedule = scheduleList[i];
        const pEl = document.createElement('p');
        pEl.textContent = schedule.title;
        ulEl.appendChild(pEl);
    }
    return ulEl;
}

function onSchedulesReceived() {
    if (this.status === OK) {
        const scheduleList = JSON.parse(this.responseText);
        sideNavContentDivEl.appendChild(createScheduleList(scheduleList));
    }
}