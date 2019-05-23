function createScheduleList(scheduleList) {
    const hrefAttr = document.createAttribute('href');
    hrefAttr.value = 'javascript:void(0);';
    const ulEl = document.createElement('ul');
    for (let i = 0; i < scheduleList.length; i++) {
        const schedule = scheduleList[i];
        const pEl = document.createElement('p');
        pEl.textContent = schedule.title;
        /*pEl.setAttributeNode(hrefAttr);*/
        ulEl.appendChild(pEl);
    }
    const idAttr = document.createAttribute('id');
    idAttr.value = 'addSchedule-button';
    const addSchedulePEl = document.createElement('p');
    addSchedulePEl.textContent = 'Add schedule';
    addSchedulePEl.setAttributeNode(idAttr);
    addSchedulePEl.setAttributeNode(hrefAttr);
    ulEl.appendChild(addSchedulePEl);
    return ulEl;
}

function onSchedulesReceived() {
    if (this.status === OK) {
        const scheduleList = JSON.parse(this.responseText);
        sideNavContentDivEl.appendChild(createScheduleList(scheduleList));
    }
}

/*
const newScheduleButtonEl = document.getElementById('newScheduleButton');
newScheduleButtonEl.addEventListener('click', onNewScheduleButtonClicked(addSchedulePEl));

function onNewScheduleButtonClicked(newSchedule) {
    document.getElementById('addSchedule-button').style.display = 'none';
    document.getElementById('newSchedule').style.display = 'block';

}*/
