function createScheduleList(scheduleList) {
    const ulEl = document.createElement('ul');
    for (let i = 0; i < scheduleList.length; i++) {
        const schedule = scheduleList[i];
        const pEl = document.createElement('a');
        pEl.textContent = schedule.title;
        pEl.setAttribute('href', 'javascript:void(0);');
        ulEl.appendChild(pEl);
    }

    const addSchedulePEl = document.createElement('a');
    addSchedulePEl.textContent = 'Add schedule';
    addSchedulePEl.setAttribute('id', 'addSchedule-button');
    addSchedulePEl.setAttribute('href', 'javascript:void(0);');
    ulEl.appendChild(addSchedulePEl);

    const addScheduleContentEl = document.getElementById('addSchedule-content');
    ulEl.appendChild(addScheduleContentEl);
    return ulEl;
}

function onSchedulesReceived() {
    if (this.status === OK) {
        const scheduleList = JSON.parse(this.responseText);
        sideNavContentDivEl.appendChild(createScheduleList(scheduleList));
        const addScheduleButtonEl = document.getElementById('addSchedule-button');
        addScheduleButtonEl.addEventListener('click', onNewScheduleButtonClicked);
    }
}

function onNewScheduleButtonClicked() {
    document.getElementById('addSchedule-button').style.display = 'none';
    document.getElementById('addSchedule-content').style.display = 'block';
}

