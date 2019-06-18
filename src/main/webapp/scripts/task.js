function onCellIdListReceived(task) {
    const cellIdList = JSON.parse(this.responseText);
    const tdList = document.getElementsByTagName('td');
    for (let i = 0; i < tdList.length; i++) {
        const tdEl = tdList[i];
        if (tdEl.id == cellIdList[0]) {
            tdEl.textContent = task.title;
            tdEl.setAttribute("rowspan", cellIdList.length);
            tdEl.removeEventListener('mouseover', mouseOverCell);
            tdEl.removeEventListener('mouseout', mouseOutCell);
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
    xhr.addEventListener('load', onCellIdListReceived);
    xhr.open('GET', 'task?' + params.toString());
    xhr.send();
}

function onLoadTasks() {
    activeTasksList = JSON.parse(this.responseText);
    for (let i = 0; i < activeTasksList.length; i++) {
        const activeTask = activeTasksList[i];
        loadCellIdList(activeTask);
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

function onNewTaskCloseClicked() {
    showContents(['main-content']);
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