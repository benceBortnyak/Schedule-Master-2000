
let sid;
function createScheduleDropdown(id) {
    sid = id;
    const divEl = document.createElement('div');
    divEl.classList.add('dropdown-content');
    divEl.setAttribute('id', 'scheduleDropdown');

    const updateButtonEl = document.createElement('button');
    updateButtonEl.textContent = "Update schedule";
    updateButtonEl.addEventListener('click', onUpdateScheduleClicked);

    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = "Delete schedule";

    deleteButtonEl.addEventListener('click', onDeleteScheduleClicked);
    divEl.appendChild(updateButtonEl);
    divEl.appendChild(deleteButtonEl);

    return divEl;
}

function mouseOutCell() {
    const el = this;
    el.removeChild(el.firstChild);
}

function mouseOverCell() {
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

    const titleEl = document.createElement('input');
    titleEl.setAttribute('type', 'text');
    titleEl.setAttribute('placeholder', 'Type your schedule title');
    titleEl.setAttribute('name', 'scheduleTitle');
    titleEl.required = true;

    const checkboxEl = document.createElement('input');
    checkboxEl.setAttribute('type', 'checkbox');
    checkboxEl.setAttribute('id', 'isPublished');

    const labelEl1 = document.createElement('label');
    labelEl1.textContent = 'public';
    labelEl1.appendChild(checkboxEl);

    const addButtonEl = document.createElement('button');
    addButtonEl.classList.add('newScheduleButton');
    addButtonEl.setAttribute("id","newScheduleButton");
    addButtonEl.textContent = ' +';

    const selectEl = document.createElement('select');
    selectEl.setAttribute('name', 'scheduleLength');

    const labelEl2 = document.createElement('label');
    labelEl2.textContent = 'length';
    labelEl2.appendChild(selectEl);

    for(let i=1; i<=7; i++){
        const opEl = document.createElement('option');
        opEl.setAttribute('value', i);
        opEl.textContent = i;
        selectEl.appendChild(opEl);
    }

    formEl.appendChild(titleEl);
    formEl.appendChild(labelEl2);
    formEl.appendChild(labelEl1);
    formEl.appendChild(addButtonEl);

    return formEl;
}

function createScheduleList(scheduleList) {
    const ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'sideNavList');
    for (let i = 0; i < scheduleList.length; i++) {
        const schedule = scheduleList[i];
        const aEl = document.createElement('a');
        //buttonEl.addEventListener('click',
        aEl.textContent = schedule.title;
        aEl.setAttribute('href', 'javascript:void(0);');
        aEl.setAttribute('id', schedule.id);

        aEl.addEventListener('click', onScheduleClicked);

        let menuButton = document.createElement('button');
        menuButton.textContent = 'X';
        menuButton.classList.add('newScheduleButton');
        menuButton.classList.add('dropbtn');
        menuButton.addEventListener('click', ()=>{createScheduleDropdown(schedule.id)});
        menuButton.addEventListener('click', showScheduleDropdown);
        menuButton.setAttribute('id',schedule.id);

        const pEl = document.createElement('p');
        pEl.appendChild(menuButton);
        pEl.classList.add('passive');
        pEl.appendChild(aEl);
        ulEl.appendChild(createScheduleDropdown(scheduleList));
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