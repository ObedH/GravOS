function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

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
}
var bottombarheight = 0;
const windowpadding = 5;
var idx = 1;
var dialogueLines = [
  "Welcome to GravOS! This is a webpage that lets you take a look at the operating system I run on.",
  "I'm Grav, a robot assistant to help your space travel!",
  "On the bottom of the screen, there's a bar with a few apps.",
  "Click on any of them to check them out."
];
document.addEventListener("DOMContentLoaded", function() {
    updateTime();
    dragElement(document.getElementById("welcome"));
    dragElement(document.getElementById("superorbital"));
    dragElement(document.getElementById("todo"));
    bottombarheight = document.getElementsByClassName("topbar")[0].offsetHeight;

    var welcomeScreenClose = document.querySelector("#welcomeclose");
    var welcomeScreenOpen = document.querySelector("#welcomeopen");
    var welcomeScreen = document.querySelector("#welcome");
    welcomeScreenClose.addEventListener("click", function() {
        closeWindow(welcomeScreen);
    });
    welcomeScreenOpen.addEventListener("click", function() {
        openWindow(welcomeScreen);
        idx = 0;
    });

    var supClose = document.querySelector("#superorbitalclose");
    var supOpen = document.querySelector("#superorbitalopen");
    var supScreen = document.querySelector("#superorbital");
    supClose.addEventListener("click", function() {
        closeWindow(supScreen);
    });
    supOpen.addEventListener("click", function() {
        openWindow(supScreen);
    });

    var gClose = document.querySelector("#todoclose");
    var gOpen = document.querySelector("#todoopen");
    var gScreen = document.querySelector("#todo");
    gClose.addEventListener("click", function() {
        closeWindow(gScreen);
    });
    gOpen.addEventListener("click", function() {
        openWindow(gScreen);
    });

  document.getElementById("next").addEventListener("click", function() {
    if(idx >= 4) {
      closeWindow(welcomeScreen);
      return;
    }
    document.getElementById("dialoguebox").textContent = dialogueLines[idx];
    idx ++;
  });

  var add = document.getElementById("add");
  var clear = document.getElementById("clear");
  var tasks = document.getElementById("tasks");
  add.addEventListener("click", function() {
    var che = document.createElement("input");
    che.setAttribute("type", "checkbox");
    var tex = document.createElement("input");
    tex.setAttribute("type", "text");
    var li = document.createElement("li");
    li.appendChild(che);
    li.appendChild(tex);
    
    tasks.appendChild(li);
  });
  clear.addEventListener("click", function() {
    tasks.innerHTML = "";
  });

});
setInterval(updateTime, 1000);


// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;
  // Step 2: Set up variables to keep track of the element's position.

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (clamp(element.offsetTop - currentY, windowpadding, window.innerHeight - element.offsetHeight - bottombarheight - windowpadding)) + "px";
    element.style.left = (clamp(element.offsetLeft - currentX, windowpadding, window.innerWidth - element.offsetWidth - windowpadding)) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "flex"
}
