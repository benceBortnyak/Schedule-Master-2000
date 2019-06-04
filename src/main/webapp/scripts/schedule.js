function onAddScheduleResponse() {
    document.getElementById('sideNavList').remove();
    document.getElementById('taskTable').remove();
    onLoadSchedules(getAuthorization().id);

}

function newScheduleButtonClicked() {
    const scheduleFormEl = document.forms['addSchedule-content'];
    const scheduleTitleEl = scheduleFormEl.querySelector('input[name="scheduleTitle"]');
    const scheduleLengthEl = scheduleFormEl.querySelector('select[name="scheduleLength"]');
    const title = scheduleTitleEl.value;
    const length = scheduleLengthEl.value;
    let type;

    if (document.getElementById('isPublished').checked === true) {
        type = 'PUBLIC';
    } else {
        type = 'PRIVATE'
    }

    const id = getAuthorization().id;

    const params = new URLSearchParams();
    params.append('title', title);
    params.append('length', length);
    params.append('type', type);
    params.append('id', id);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAddScheduleResponse);
    xhr.open('POST', 'schedules');
    xhr.send(params);
}

function createAddScheduleForm(){
    const formEl = document.createElement('form');
    formEl.classList.add('hidden');
    formEl.setAttribute('onsubmit','return false;');
    formEl.setAttribute('id', 'addSchedule-content');

    const titleEl = document.createElement('input');
    titleEl.setAttribute('type', 'text');
    titleEl.setAttribute('placeholder', 'Type your schedule title');
    titleEl.setAttribute('name', 'scheduleTitle');

    const publishedEl = document.createElement('input');
    publishedEl.setAttribute('type', 'checkbox');
    publishedEl.setAttribute('id', 'isPublished');


    const addButtonEl = document.createElement('button');
    addButtonEl.setAttribute('id', 'newScheduleButton');
    addButtonEl.textContent = '+';

    const lengthEl = document.createElement('select');
    lengthEl.setAttribute('name', 'scheduleLength');
    lengthEl.textContent = 'Length';

    for(let i=1; i<=7; i++){
        const opEl = document.createElement('option');
        opEl.setAttribute('value', i);
        opEl.textContent = i;
        lengthEl.appendChild(opEl);
    }

    formEl.appendChild(titleEl);
    formEl.appendChild(lengthEl);
    formEl.appendChild(publishedEl);
    formEl.appendChild(addButtonEl);

    return formEl;
}

function onNewScheduleButtonClicked() {
    document.getElementById('addSchedule-button').classList.add('hidden');
    document.getElementById('addSchedule-content').classList.remove('hidden');
    const addScheduleButtonEl = document.getElementById('newScheduleButton');
    addScheduleButtonEl.addEventListener('click', newScheduleButtonClicked);
}

function createScheduleList(scheduleList) {
    const ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'sideNavList');
    for (let i = 0; i < scheduleList.length; i++) {
        const schedule = scheduleList[i];
        const pEl = document.createElement('a');
        pEl.textContent = schedule.title;
        pEl.setAttribute('href', 'javascript:void(0);');
        ulEl.appendChild(pEl);
    }

    const addSchedulePEl = document.createElement('a');
    addSchedulePEl.textContent = '+ schedule';
    addSchedulePEl.setAttribute('id', 'addSchedule-button');
    addSchedulePEl.setAttribute('href', 'javascript:void(0);');

    ulEl.appendChild(addSchedulePEl);
    ulEl.appendChild(createAddScheduleForm());
    return ulEl;
}

function onSchedulesReceived() {
    if (this.status === OK) {
        const scheduleList = JSON.parse(this.responseText);
        sideNavContentDivEl.appendChild(createScheduleList(scheduleList));
        const addScheduleButtonEl = document.getElementById('addSchedule-button');
        addScheduleButtonEl.addEventListener('click', onNewScheduleButtonClicked);
        const tableDivEl = document.getElementById('table-content');
        tableDivEl.appendChild(createTaskTable(scheduleList[0].length));
    }
}

function onLoadSchedules(id) {
    const params = new URLSearchParams();
    params.append('id', id);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSchedulesReceived);
    xhr.open('GET', 'schedules?' + params.toString());
    xhr.send();
}



