let timer;
let isRunning = false;
let seconds = 0;
let laps = [];

// Adding audio elements
const startSound = new Audio('start_sound.mp3'); // Replace 'start_sound.mp3' with your start sound file
const stopSound = new Audio('stop_sound.mp3'); // Replace 'stop_sound.mp3' with your stop sound file

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStop").innerText = "Start";
        stopSound.play(); // Play stop sound
    } else {
        timer = setInterval(updateDisplay, 1000);
        document.getElementById("startStop").innerText = "Stop";
        startSound.play(); // Play start sound
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    laps = [];
    updateDisplay();
    document.getElementById("startStop").innerText = "Start";
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (isRunning) {
        laps.push(seconds);
        updateLaps();
    }
}

function updateDisplay() {
    seconds++;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedSeconds = seconds % 60;

    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(formattedSeconds).padStart(2, '0')}`;
    document.getElementById("display").innerText = display;
}

function updateLaps() {
    const lapList = document.getElementById("laps");
    const lapItem = document.createElement("li");
    const lapTime = laps[laps.length - 1];

    lapItem.innerText = `Lap ${laps.length}: ${formatTime(lapTime)}`;
    lapList.insertBefore(lapItem, lapList.firstChild);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const formattedSeconds = time % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(formattedSeconds).padStart(2, '0')}`;
}
