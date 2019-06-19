function onTaskUpdateResponse() {
    showContents(['main-content']);
    createTaskTable();
}

function onUpdateTaskButtonClicked() {
    const id = this.getAttribute('taskId');
    const taskFormEl = document.forms['task-form'];
    const taskTitleEl = taskFormEl.querySelector('input[name="taskTitle"]');
    const taskContentEl = taskFormEl.querySelector('input[name="task-content"]');
    const title = taskTitleEl.value;
    const content = taskContentEl.value;

    const params = new URLSearchParams();
    params.append('taskId', id);
    params.append('title', title);
    params.append('content', content);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onTaskUpdateResponse);
    xhr.open('POST', 'update_task');
    xhr.send(params);

}

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
    updateButtonEl.setAttribute("taskId", task.id);
    updateButtonEl.addEventListener('click', onUpdateTaskButtonClicked);
    const deleteButtonEl = document.getElementById('taskDelete-button');
    deleteButtonEl.setAttribute('taskId', task.id);
    deleteButtonEl.addEventListener('click', onDeleteTaskButtonClicked);
}

function onLoadTasks() {
    activeTasksList = JSON.parse(this.responseText);
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