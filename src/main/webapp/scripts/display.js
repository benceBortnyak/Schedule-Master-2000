let sid;

function mouseOutCell() {
    const el = this;
    el.removeChild(el.firstChild);
}

function mouseOverCell(){
    const el = this;
    const addTaskButton = document.createElement('button');
    addTaskButton.setAttribute('id', 'addTaskButton');
    addTaskButton.textContent = '+';
    const cellId = el.id;
    addTaskButton.addEventListener('click', function(){onTaskButtonClicked(cellId)});
    el.appendChild(addTaskButton);
}


function createAddScheduleForm(){
    const formEl = document.createElement('form');
    formEl.classList.add('hidden');
    formEl.setAttribute('onsubmit','return false;');
    formEl.setAttribute('id', 'addSchedule-content');
    formEl.setAttribute('style', 'font-size: 30px;');

    const p1El = document.createElement('p');
    const p2El = document.createElement('p');

    const titleEl = document.createElement('input');
    titleEl.setAttribute('type', 'text');
    titleEl.setAttribute('placeholder', 'Type your schedule title');
    titleEl.setAttribute('name', 'scheduleTitle');
    titleEl.required = true;

    p1El.appendChild(titleEl);

    const checkboxEl = document.createElement('input');
    checkboxEl.setAttribute('type', 'checkbox');
    checkboxEl.setAttribute('id', 'isPublished');

    const labelEl1 = document.createElement('label');
    labelEl1.innerHTML = '&nbsp; &nbsp; &#127866;';
    labelEl1.appendChild(checkboxEl);

    const addButtonEl = document.createElement('button');
    addButtonEl.classList.add('newScheduleButton');
    addButtonEl.setAttribute("id","newScheduleButton");
    addButtonEl.textContent = ' +';

    const selectEl = document.createElement('select');
    selectEl.setAttribute('name', 'scheduleLength');

    const labelEl2 = document.createElement('label');
    labelEl2.innerHTML = '&#128197;';
    labelEl2.appendChild(selectEl);

    const labelEl3 = document.createElement('label');
    labelEl3.innerHTML = '&nbsp; &nbsp;';
    labelEl3.appendChild(addButtonEl);

    p2El.appendChild(labelEl2);
    p2El.appendChild(labelEl1);
    p2El.appendChild(labelEl3);

    for(let i=1; i<=7; i++){
        const opEl = document.createElement('option');
        opEl.setAttribute('value', i);
        opEl.textContent = i;
        selectEl.appendChild(opEl);
    }

    /*formEl.appendChild(titleEl);
    formEl.appendChild(labelEl2);
    formEl.appendChild(labelEl1);
    formEl.appendChild(addButtonEl);*/
    formEl.appendChild(p1El);
    formEl.appendChild(p2El);

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

        const pEl = document.createElement('p');
        pEl.setAttribute('id', schedule.id);
        /*pEl.appendChild(menuButton);*/
        pEl.classList.add('passive');
        pEl.classList.add('schedule');
        pEl.appendChild(aEl);
        pEl.addEventListener('click', onScheduleClicked);

        ulEl.appendChild(pEl);
    }

    const addSchedulePEl = document.createElement('a');
    const pEl = document.createElement('p');
    addSchedulePEl.textContent = '+ schedule';
    pEl.setAttribute('id', 'addSchedule-button');
    addSchedulePEl.setAttribute('href', 'javascript:void(0);');
    pEl.appendChild(addSchedulePEl);

    ulEl.appendChild(pEl);
    ulEl.appendChild(createAddScheduleForm());
    return ulEl;
}