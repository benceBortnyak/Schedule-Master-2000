let scheduleList;

function onLoadSchedule() {
    activeSchedule = JSON.parse(this.responseText);
    createTaskTable();
}

function setActiveClass(elId, id) {
    const scheduleEls = document.getElementById(elId).getElementsByClassName('passive');
    for (let i = 0; i < scheduleEls.length; i++) {
        const scheduleEl = scheduleEls[i];
        if (id == scheduleEl.id) {
            scheduleEl.classList.add('active');
        } else {
            scheduleEl.classList.remove('active');
        }
    }
}

function onScheduleClicked() {
    const el = this;
    const id = el.id;
    setActiveClass('sideNavList', id);

    const params = new URLSearchParams();
    params.append('id', id);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoadSchedule);
    xhr.open('GET', 'schedule?' + params.toString());
    xhr.send();
}

function onScheduleResponse() {
    activeSchedule = JSON.parse(this.responseText);
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
    xhr.addEventListener('load', onScheduleResponse);
    xhr.open('POST', 'schedules');
    xhr.send(params);
}

function onNewScheduleButtonClicked() {
    document.getElementById('addSchedule-button').style.display = 'none';
    document.getElementById('addSchedule-content').classList.remove('hidden');
    const addScheduleButtonEl = document.getElementById('newScheduleButton');
    addScheduleButtonEl.addEventListener('click', newScheduleButtonClicked);
}

function onSchedulesReceived() {
    if (this.status === OK) {
        scheduleList = JSON.parse(this.responseText);
        sideNavContentDivEl.appendChild(createScheduleList(scheduleList));
        if (activeSchedule === null) {
            if (scheduleList.length === 0) {
                activeSchedule = sideNavContentDivEl.firstChild;
            } else {
                activeSchedule = scheduleList[0];
                createTaskTable();
            }
            setActiveClass('sideNavList', activeSchedule.id);
            const addScheduleButtonEl = document.getElementById('addSchedule-button');
            addScheduleButtonEl.addEventListener('click', onNewScheduleButtonClicked);
        } else {
            setActiveClass('sideNavList', activeSchedule.id);
            const addScheduleButtonEl = document.getElementById('addSchedule-button');
            addScheduleButtonEl.addEventListener('click', onNewScheduleButtonClicked);
            createTaskTable();
        }
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

function onDeleteScheduleClicked() {
    const params = new URLSearchParams();
    params.append('id', sid);
    console.log(sid);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onScheduleResponse);
    xhr.open('POST', 'delete_schedule');
    xhr.send(params);
}
