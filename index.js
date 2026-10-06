function updateTime() {
    var now = new Date();
    var year = "20XX";
    var month = String(now.getMonth()).padStart(2, "0");
    var day = String(now.getDay()).padStart(2, "0");
    var hours = String(now.getHours()).padStart(2, "0");
    var minutes = String(now.getMinutes()).padStart(2, "0");
    var seconds = String(now.getSeconds()).padStart(2, "0");

    var dateString = `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
    document.getElementById("time").textContent = dateString;
    console.log("Hello!");
}
document.addEventListener("DOMContentLoaded", updateTime);
setInterval(updateTime, 1000);