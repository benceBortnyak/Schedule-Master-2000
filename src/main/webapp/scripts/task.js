function onTaskDeleted() {
    showContents(['main-content']);
    createTaskTable();
}

function onDeleteTaskButtonClicked() {
    const id = this.getAttribute('taskId');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'update_task?id='+id);
    xhr.addEventListener('load', onTaskDeleted);
    xhr.send();
}

function showTaskPopUp(task) {
    showContents(['main-content', 'taskContent']);
    const taskFormEl = document.forms['task-form'];
    const taskTitleEl = taskFormEl.querySelector('input[name="taskTitle"]');
    const taskContentEl = taskFormEl.querySelector('input[name="task-content"]');
    taskTitleEl.value = task.title;
    taskContentEl.value = task.content;
    const updateButtonEl = document.getElementById('taskSave-button');
    //updateButtonEl.addEventListener('click', onUpdateTaskButtonClicked);
    const deleteButtonEl = document.getElementById('taskDelete-button');
    deleteButtonEl.setAttribute('taskId', task.id);
    deleteButtonEl.addEventListener('click', onDeleteTaskButtonClicked);
}

function onCellClicked() {
    const id = this.getAttribute('taskId');
    for (let i = 0; i<activeTasksList.length; i++) {
        if(id == activeTasksList[i].id){
            showTaskPopUp(activeTasksList[i]);
        }
    }
}

function onCellIdListReceived() {
    const cellIdList = JSON.parse(this.responseText);
    const tdList = document.getElementsByTagName('td');
    for (let i = 0; i < tdList.length; i++) {
        const tdEl = tdList[i];
        if (tdEl.id == cellIdList[0]) {
            tdEl.textContent = activeTask.title;
            tdEl.setAttribute("rowspan", cellIdList.length);
            tdEl.removeEventListener('mouseover', mouseOverCell);
            tdEl.removeEventListener('mouseout', mouseOutCell);
            tdEl.setAttribute('href', 'javascript:void(0);');
            tdEl.setAttribute('taskId', activeTask.id);
            tdEl.addEventListener('click', onCellClicked);
            tdEl.classList.add('activeTaskBg');
            for (let j = 1; j <= cellIdList.length; j++) {
                let cellIdToRemove = cellIdList[j];
                for (let k = 0; k < tdList.length; k++) {
                    const cell = tdList[k];
                    if (cell.id == cellIdToRemove) {
                        cell.remove();
                        delete tdList[k];
                    }
                }
            }
        }
    }
}

function loadCellIdList(task) {
    const id = task.id;
    const params = new URLSearchParams();
    params.append('id', id);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {activeTask = task;});
    xhr.addEventListener('load', onCellIdListReceived);
    xhr.open('GET', 'task?' + params.toString());
    xhr.send();
}

function onLoadTasks() {
    activeTasksList = JSON.parse(this.responseText);
    console.log(activeTasksList);
    for (let i = 0; i < activeTasksList.length; i++) {
        loadCellIdList(activeTasksList[i]);
    }
}

function loadTasks() {
    const id = activeSchedule.id;

    const params = new URLSearchParams();
    params.append('id', id);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoadTasks);
    xhr.open('GET', 'tasks?' + params.toString());
    xhr.send();
}

function onAddTaskResponse() {
    if (this.status === OK) {
        document.getElementById('addTask-form').reset();
        showContents(['main-content']);
    } else if (this.status === BAD_REQUEST) {
        alert("You've provided invalid data");
    }
    createTaskTable();
}

function onNewTaskButtonClicked(cellId) {

    const addTaskFormEl = document.forms['addTask-form'];
    const taskTitleEl = addTaskFormEl.querySelector('input[name="taskTitle"]');
    const taskContentEl = addTaskFormEl.querySelector('input[name="taskContent"]');
    const taskLenEl = addTaskFormEl.querySelector('input[name="taskLen"]');

    const title = taskTitleEl.value;
    const content = taskContentEl.value;
    const len = taskLenEl.value;
    const params = new URLSearchParams();

    params.append('title', title);
    params.append('content', content);
    params.append('len', len);
    params.append('cellId', cellId);
    params.append('user_id', getAuthorization().id);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAddTaskResponse);
    xhr.open('POST', 'task');
    xhr.send(params);
}

function onTaskButtonClicked(cellId) {
    showContents(['main-content', 'newTask-content']);
    const newTaskButtonEl = document.getElementById('newTaskButton');
    const tableEl = document.getElementById('table-content');
    newTaskButtonEl.addEventListener('click', function callback() {
        onNewTaskButtonClicked(cellId);
        newTaskButtonEl.removeEventListener('click', callback)
    });
}