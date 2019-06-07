

function createTableHead() {
    const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const theadEl = document.createElement('thead');
    const emptyTdEl = document.createElement('td');
    emptyTdEl.classList.add('timeIndicator');
    theadEl.appendChild(emptyTdEl);
    for (let i = 0; i < activeSchedule.length; i++) {
        const currentDay = daysOfTheWeek[i];
        const tdEl = document.createElement('td');
        tdEl.textContent = currentDay;
        theadEl.appendChild(tdEl);
    }
    return theadEl;
}

function createTableBody() {

    let totalLength = 0;
    for (let i = 0; i < scheduleList.length; i++) {
        if (activeSchedule.id === scheduleList[i].id) {
            break;
        }
        totalLength += parseInt(scheduleList[i].length) * 24;
    }

    let loopVar = 0;
    const tbodyEl = document.createElement('tbody');

    if (totalLength === 1) {
        loopVar = totalLength * 24 + 1;
    } else {
        loopVar = totalLength + 1;
    }

    let hour = 1;
    for (let i = loopVar; i < loopVar + 24; i++) {
        const trEl = document.createElement('tr');
        for (let j = 0; j <= activeSchedule.length; j++) {
            const tdEl = document.createElement('td');
            if (j === 0) {
                tdEl.textContent = hour;
                tdEl.classList.add('timeIndicator');
            } else if (j === 1) {
                tdEl.setAttribute('id', i);
                tdEl.addEventListener('mouseover', mouseOverCell);
                tdEl.addEventListener('mouseout', mouseOutCell);
            } else if (j > 1) {
                tdEl.setAttribute('id', (i + (j - 1) * 24));
                tdEl.addEventListener('mouseover', mouseOverCell);
                tdEl.addEventListener('mouseout', mouseOutCell);

            }
            trEl.appendChild(tdEl);
        }
        hour++;
        tbodyEl.appendChild(trEl);
    }
    return tbodyEl;
}

function createTaskTable() {
    loadTasks();
    if (document.getElementById('taskTable') !== null) {
        document.getElementById('taskTable').remove();
    }
    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'taskTable');
    tableEl.appendChild(createTableHead());
    tableEl.appendChild(createTableBody());
    tableDivEl.appendChild(tableEl);
}