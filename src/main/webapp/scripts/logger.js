function modifyHeader() {
    document.documentURI = "${catalina.base}/logs/SM2000.html";
    $('<c:url value="/scripts/logger.js" var="logger">').appendTo(document.head);
    $('<script src="${logger}"></script>').appendTo(document.head);

}
function modifyOnLoad() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load',modifyHeader);
    xhr.open('POST',"log");
    xhr.send();


}