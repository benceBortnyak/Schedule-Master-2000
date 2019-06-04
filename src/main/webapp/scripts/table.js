function createTableHead(length) {
    const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const theadEl = document.createElement('thead');
    const emptyTdEl = document.createElement('td');
    emptyTdEl.classList.add('timeIndicator');
    theadEl.appendChild(emptyTdEl);
    for (let i = 0; i < length; i++) {
        const currentDay = daysOfTheWeek[i];
        const tdEl = document.createElement('td');
        tdEl.textContent = currentDay;
        theadEl.appendChild(tdEl);
    }
    return theadEl;
}

function createTableBody(length) {
    const tbodyEl = document.createElement('tbody');
    for (let i = 1; i <= 24; i++) {
        const trEl = document.createElement('tr');
        for (let j = 0; j <= length; j++) {
            const tdEl = document.createElement('td');
            if (j === 0) {
                tdEl.textContent = i;
                tdEl.classList.add('timeIndicator');
            } else if (j === 1) {
                tdEl.setAttribute('id', i);
            } else {
                tdEl.setAttribute('id', i + (j - 1) * 24);
            }
            trEl.appendChild(tdEl);
        }
        tbodyEl.appendChild(trEl);
    }
    return tbodyEl;
}

function createTaskTable(length) {
    if(document.getElementById('taskTable') !== null) {
        document.getElementById('taskTable').remove();
    }

    const tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'taskTable');
    tableEl.appendChild(createTableHead(length));
    tableEl.appendChild(createTableBody(length));
    return tableEl;
}