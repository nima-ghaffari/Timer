const display = document.getElementById('countdown-display');
const hourInput = document.getElementById('hourInput');
const minuteInput = document.getElementById('minuteInput');
const secondInput = document.getElementById('secondInput');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');

const resultsContainer = document.getElementById('results-container');
const historyList = document.getElementById('history-list');
const totalTimeDisplay = document.getElementById('total-time-display');

let timerInterval = null;
let totalSeconds = 0;
let isPaused = false;
let timeHistory = [];

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function renderHistory() {
    historyList.innerHTML = '';
    let accumulatedSeconds = 0;
    
    if (timeHistory.length === 0) {
        resultsContainer.classList.add('hidden');
        return;
    }
    
    resultsContainer.classList.remove('hidden');

    timeHistory.forEach((entry, index) => {
        const li = document.createElement('li');
        const lapNumber = document.createElement('span');
        lapNumber.textContent = `Lap ${index + 1}`;
        lapNumber.style.color = '#888';

        const lapTime = document.createElement('span');
        lapTime.textContent = entry.display;

        li.appendChild(lapNumber);
        li.appendChild(lapTime);
        historyList.appendChild(li);

        accumulatedSeconds += entry.seconds;
    });

    totalTimeDisplay.textContent = formatTime(accumulatedSeconds);
}

function startTimer() {
    isPaused = false;
    
    startButton.classList.add('hidden');
    [hourInput, minuteInput, secondInput].forEach(input => input.disabled = true);
    
    [pauseButton, lapButton, resetButton].forEach(btn => btn.classList.remove('hidden'));
    pauseButton.textContent = 'Pause';

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            display.textContent = "Time's Up!";
            resetControls(false); 
            return;
        }
        totalSeconds--;
        display.textContent = formatTime(totalSeconds);
    }, 1000);
}

function resetControls(clearHistory = true) {
    clearInterval(timerInterval);
    totalSeconds = 0;
    isPaused = false;
    
    startButton.classList.remove('hidden');
    [hourInput, minuteInput, secondInput].forEach(input => {
        input.disabled = false;
        if(clearHistory) input.value = '';
    });

    [pauseButton, lapButton, resetButton].forEach(btn => btn.classList.add('hidden'));
    display.textContent = "Timer";

    if (clearHistory) {
        timeHistory = [];
        renderHistory();
    }
}

