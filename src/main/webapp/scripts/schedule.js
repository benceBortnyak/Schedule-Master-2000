function onAddScheduleResponse() {

}

function createAddScheduleContent(){
    const divEl = document.getElementById('addSchedule-content');
    const titleEl = document.createElement('input');
    const publishedEl = document.createElement('input');
    const addButtonEl = document.createElement('button');
    const lengthEl = document.createElement('select');

    titleEl.setAttribute('type', 'text');
    titleEl.setAttribute('placeholder', 'Type your schedule title');
    titleEl.setAttribute('name', 'scheduleTitle');

    lengthEl.setAttribute('name', 'scheduleLength');
    lengthEl.textContent = 'Length';

    for(let i=1; i<=7; i++){
        const opEl = document.createElement('option');
        opEl.setAttribute('value', i);
        opEl.textContent = i;
        lengthEl.appendChild(opEl);
    }

    publishedEl.setAttribute('type', 'checkbox');
    publishedEl.textContent = 'Public?';

    addButtonEl.setAttribute('id', 'addScheduleButton');
    addButtonEl.textContent = '+';

    divEl.appendChild(titleEl);
    divEl.appendChild(lengthEl);
    divEl.appendChild(publishedEl);
    divEl.appendChild(addButtonEl);

    return divEl;
}

function addScheduleButtonClicked() {
    const el = this;
    const title = el.getAttribute('title');
    const length = el.getAttribute('length');
    const type = el.getAttribute('type');
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

function onNewScheduleButtonClicked() {
    document.getElementById('addSchedule-button').style.display = 'none';
    document.getElementById('addSchedule-content').style.display = 'block';

    const scheduleTitleEl = document.querySelector('input[name="scheduleTitle"]');
    const scheduleLengthEl = document.querySelector('select[name="scheduleLength"]');
    const scheduleTypeEl = document.querySelector('input[name="isPublished"]');
    const title = scheduleTitleEl.value;
    const length = scheduleLengthEl.value;
    let type;
    if (scheduleTypeEl) {
        type = 'PUBLIC';
    } else {
        type = 'PRIVATE'
    }

    const addScheduleButtonEl = document.getElementById('addScheduleButton');
    addScheduleButtonEl.setAttribute('title', title);
    addScheduleButtonEl.setAttribute('length', length);
    addScheduleButtonEl.setAttribute('type', type);

    addScheduleButtonEl.addEventListener('click', addScheduleButtonClicked);
}

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
    ulEl.appendChild(createAddScheduleContent());
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



