

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

function createDeleteScheduleForm() {

    const formEl = document.createElement('form');
    formEl.setAttribute('onsubmit','return false;');

    const inputEl = document.createElement('input');
    inputEl.setAttribute('type','text');
    inputEl.setAttribute()

}

function createScheduleList(scheduleList) {
    const ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'sideNavList');
    for (let i = 0; i < scheduleList.length; i++) {
        const schedule = scheduleList[i];
        const aEl = document.createElement('a');
        const buttonEl = document.createElement('button');
        buttonEl.textContent = "X";
        buttonEl.classList.add('deleteButton');
        buttonEl.setAttribute('id',schedule.id);
        //buttonEl.addEventListener('click',
        aEl.textContent = schedule.title;
        aEl.setAttribute('href', 'javascript:void(0);');
        aEl.setAttribute('id', schedule.id);

        aEl.addEventListener('click', onScheduleClicked);

        const deleteButtonEl = document.createElement('button');
        deleteButtonEl.textContent = 'X';
        deleteButtonEl.classList.add('newScheduleButton');
        deleteButtonEl.setAttribute('id',schedule.id);

        const pEl = document.createElement('p');
        pEl.setAttribute('id', schedule.id);
        pEl.appendChild(deleteButtonEl);
        pEl.classList.add('passive');
        pEl.appendChild(aEl);


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