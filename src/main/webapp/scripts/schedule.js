let scheduleList;

function onLoadSchedule() {
    activeSchedule = JSON.parse(this.responseText);
    createTaskTable();
}

function setActiveClass(elId, id) {
    const scheduleEls = document.getElementById(elId).getElementsByClassName('passive');
    for (let i = 0; i < scheduleEls.length; i++) {
        const scheduleEl = scheduleEls[i];
        let menuButton = document.createElement('button');
        menuButton.innerHTML = "&#9881";
        menuButton.classList.add('newScheduleButton');
        menuButton.setAttribute('scheduleId', scheduleEl.id);
        menuButton.addEventListener('click', onUpdateScheduleClicked);
        /*menuButton.setAttribute('id',schedule.id);*/
        if (id == scheduleEl.id) {
            scheduleEl.classList.add('active');
            if(scheduleEl.childNodes.length < 2) {
                scheduleEl.insertBefore(menuButton, scheduleEl.firstChild);
            }
        } else {
            scheduleEl.classList.remove('active');
            if(scheduleEl.childNodes.length > 1) {
                scheduleEl.removeChild(scheduleEl.firstChild);
            }

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

function onAddScheduleResponse() {
    activeSchedule = JSON.parse(this.responseText);
    document.getElementById('sideNavList').remove();
    onLoadSchedules(getAuthorization().id);
}

/*function onDeleteScheduleResponse() {
    if(this.status == OK){
        for(let i = 0; i<scheduleList.length; i++){
            const schedule = scheduleList[i];
            if(activeSchedule.id == schedule.id){
                scheduleList.splice(i, 1);
            }
        }
        if(scheduleList.length > 0){
            activeSchedule = scheduleList[0];
        }else {
            activeSchedule = null;
        }
        document.getElementById('sideNavList').remove();
        onLoadSchedules(getAuthorization().id);

    }

}*/

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
    showContents(['main-content']);
    const scheduleEls = document.getElementById('sideNavList').getElementsByClassName('schedule');
    for(let i = 0; i<scheduleEls.length; i++){
        let scheduleEl = scheduleEls[i];
        if(scheduleEl.id == activeSchedule.id){
            scheduleEl.style.display= 'none';
        }
    }
    for (let i = 0; i<scheduleEls.length; i++){
        let scheduleEL = scheduleEls[i];
        if(!scheduleEL.hasAttribute('style')){
            for(let j = 0; j<scheduleList.length; j++){
                if(scheduleEL.id == scheduleList[j].id){
                    activeSchedule = scheduleList[j];
                    setActiveClass('sideNavList', activeSchedule.id);
                    createTaskTable();
                }
            }
            break;
        }
    }
    /*const params = new URLSearchParams();
    params.append('id', sid);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onDeleteScheduleResponse);
    xhr.open('POST', 'delete_schedule');
    xhr.send(params);*/

}

function onUpdateScheduleClicked() {
    sid = this.getAttribute('scheduleId');
    showContents(['main-content', 'scheduleUpdate-content']);
    const scheduleUpdateFormEl = document.forms['scheduleUpdate-form'];
    const scheduleTitleEl = scheduleUpdateFormEl.querySelector('input[name="scheduleTitle"]');
    const scheduleLenEl = scheduleUpdateFormEl.querySelector('input[name="scheduleLen"]');
    scheduleTitleEl.value = activeSchedule.title;
    scheduleLenEl.value = activeSchedule.length;

    const updateButtonEl = document.getElementById('updateButton');
    updateButtonEl.addEventListener('click', onUpdateScheduleButtonClicked);

    const deleteButtonEl = document.getElementById('deleteButton');
    deleteButtonEl.addEventListener('click', onDeleteScheduleClicked);
}

function onUpdateScheduleButtonClicked() {
    showContents(['main-content']);
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
    xhr.addEventListener('load', onAddScheduleResponse);
    xhr.open('POST', 'update_schedule');
    xhr.send(params);

}
