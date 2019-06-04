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

function createScheduleList(scheduleList) {
    const ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'sideNavList');
    for (let i = 0; i < scheduleList.length; i++) {
        const schedule = scheduleList[i];
        const aEl = document.createElement('a');
        aEl.textContent = schedule.title;
        aEl.setAttribute('href', 'javascript:void(0);');
        aEl.setAttribute('id', schedule.id);
        aEl.addEventListener('click', onScheduleClicked);
        ulEl.appendChild(aEl);
    }

    const addSchedulePEl = document.createElement('a');
    addSchedulePEl.textContent = '+ schedule';
    addSchedulePEl.setAttribute('id', 'addSchedule-button');
    addSchedulePEl.setAttribute('href', 'javascript:void(0);');

    ulEl.appendChild(addSchedulePEl);
    ulEl.appendChild(createAddScheduleForm());
    return ulEl;
}