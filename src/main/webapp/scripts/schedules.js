function createScheduleList(scheduleList) {
    const ulEl = document.createElement('ul');
    for (let i = 0; i < scheduleList.length; i++) {
        const schedule = scheduleList[i];
        const pEl = document.createElement('p');
        pEl.textContent = schedule.title;
        pEl.setAttribute('href', 'javascript:void(0);');
        ulEl.appendChild(pEl);
    }
    const idAttr = document.createAttribute('id');
    idAttr.value = 'addSchedule-button';
    const addSchedulePEl = document.createElement('p');
    addSchedulePEl.textContent = 'Add schedule';
    addSchedulePEl.setAttributeNode(idAttr);
    addSchedulePEl.setAttribute('href', 'javascript:void(0);');
    ulEl.appendChild(addSchedulePEl);
    return ulEl;
}

function onSchedulesReceived() {
    if (this.status === OK) {
        const scheduleList = JSON.parse(this.responseText);
        sideNavContentDivEl.appendChild(createScheduleList(scheduleList));
    }
}