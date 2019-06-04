function onLoadSchedule() {
    const schedule = JSON.parse(this.responseText);
    tableDivEl.appendChild(createTaskTable(schedule.length));
}

function onScheduleClicked() {
    const el = this;
    const id = el.id;

    const params = new URLSearchParams();
    params.append('id', id);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoadSchedule);
    xhr.open('GET', 'schedule?' + params.toString());
    xhr.send();
}

function onAddScheduleResponse() {
    document.getElementById('sideNavList').remove();
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

function onNewScheduleButtonClicked() {
    document.getElementById('addSchedule-button').classList.add('hidden');
    document.getElementById('addSchedule-content').classList.remove('hidden');
    const addScheduleButtonEl = document.getElementById('newScheduleButton');
    addScheduleButtonEl.addEventListener('click', newScheduleButtonClicked);
}

function onSchedulesReceived() {
    if (this.status === OK) {
        const scheduleList = JSON.parse(this.responseText);
        sideNavContentDivEl.appendChild(createScheduleList(scheduleList));
        const addScheduleButtonEl = document.getElementById('addSchedule-button');
        addScheduleButtonEl.addEventListener('click', onNewScheduleButtonClicked);
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



