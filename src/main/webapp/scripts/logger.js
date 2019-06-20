function onLoadLog() {



}
const listTitles = ['Date','Thread','Level','Logger','Message'];

function createLogTableHead(){
    const thead = document.createElement("thead");
    for(let i = 0; i<listTitles.length; i++){
        const title = listTitles[i];
        const tdEL = document.createElement('td');
        tdEL.textContent = title;
        thead.appendChild(tdEL);
    }
    return thead;

}

function createLogTableBody(logList) {
    const tbody = document.createElement("tbody");
    /*const logList = JSON.parse(this.responseText);*/
    for(let i = 0; i <logList.length; i++){
        const trEl = document.createElement('tr');
        const actual = logList[i];
        for(let j = 0; j<5; j++){
            const tdEl = document.createElement('td');
            if(j === 0){
                tdEl.textContent = actual.date;
            }else if(j === 1){
                tdEl.textContent = actual.root;
            }else if(j === 2){
                tdEl.textContent = actual.level;
            }else if(j === 3){
                tdEl.textContent = actual.origin;
            }else if(j === 4){
                tdEl.textContent = actual.message;
            }
            trEl.appendChild(tdEl);
        }
        tbody.appendChild(trEl);
    }
    return tbody;
}

function createLogTable() {
    let logList = JSON.parse(this.responseText);
    //document.getElementById('taskTable').style.display = 'none';
    let logTableDiv = document.getElementById("table-content");
    if (document.getElementById('taskTable') !== null) {
        document.getElementById('taskTable').remove();
    }
    if (document.getElementById('logTable') !== null) {
        document.getElementById('logTable').remove();
    }
    let table = document.createElement("table");
    table.setAttribute('id', 'logTable');
    table.setAttribute('style', 'font-size: xx-small');
    table.appendChild(createLogTableHead());
    table.appendChild(createLogTableBody(logList));
    logTableDiv.appendChild(table);

}


function onLoggerButtonClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', createLogTable);
    xhr.open('GET', 'log');
    xhr.send();
}