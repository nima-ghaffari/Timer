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