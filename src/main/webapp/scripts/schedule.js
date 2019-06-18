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
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onScheduleResponse);
    xhr.open('POST', 'delete_schedule');
    xhr.send(params);
}

function onUpdateScheduleClicked() {
    let active;
    for(let i = 0; i<scheduleList.length; i++){
        const schedule = scheduleList[i];
        if(sid == schedule.id){
            active = schedule;
        }
    }
    showContents(['main-content', 'scheduleUpdate-content']);
    const scheduleUpdateFormEl = document.forms['scheduleUpdate-form'];
    const scheduleTitleEl = scheduleUpdateFormEl.querySelector('input[name="scheduleTitle"]');
    const scheduleLenEl = scheduleUpdateFormEl.querySelector('input[name="scheduleLen"]');
    scheduleTitleEl.value = active.title;
    scheduleLenEl.value = active.length;
    const updateButtonEl = document.getElementById('updateButton');
    updateButtonEl.addEventListener('click', onUpdateScheduleButtonClicked)
}

function onUpdateScheduleButtonClicked() {
    let active;
    for(let i = 0; i<scheduleList.length; i++){
        const schedule = scheduleList[i];
        if(sid == schedule.id){
            active = schedule;
        }
    }
    const scheduleUpdateFormEl = document.forms['scheduleUpdate-form'];
    const scheduleTitleEl = scheduleUpdateFormEl.querySelector('input[name="scheduleTitle"]');
    const scheduleLenEl = scheduleUpdateFormEl.querySelector('input[name="scheduleLen"]');
    const title = scheduleTitleEl.value;
    const len = scheduleLenEl.value;
    let published;


    if (document.getElementById('published').checked === true) {
        published = 'PUBLIC';
    } else {
        published = 'PRIVATE'
    }
    const params = new URLSearchParams();
    params.append('scheduleId', sid);
    params.append('title', title);
    params.append('length', len);
    params.append('scheduleType', published);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onScheduleResponse);
    xhr.open('POST', 'update_schedule');
    xhr.send(params);

}
function onUpdateScheduleCloseClicked() {
    showContents(['main-content']);
}
