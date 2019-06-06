function onAddTaskResponse() {
    if (this.status === OK) {
        document.getElementById('addTask-form').reset();
        showContents(['main-content']);
    } else if (this.status === BAD_REQUEST) {
        alert("You've provided invalid data");
    }
}

function onNewTaskButtonClicked(cellId) {
    this.removeEventListener('click', function (){onNewTaskButtonClicked(cellId)});
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
    params.append('cellId',cellId);
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
    newTaskButtonEl.addEventListener('click', function (){onNewTaskButtonClicked(cellId)});
}