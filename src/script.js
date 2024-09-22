let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetLapBtn = document.getElementById('resetLapBtn');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 100);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    const centiseconds = ms % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

function toggleLapListVisibility() {
    lapList.style.display = lapList.children.length === 0 ? 'none' : 'block';
}

startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        startPauseBtn.textContent = 'Pause';
        resetLapBtn.textContent = 'Lap';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
        resetLapBtn.textContent = 'Reset';
        isRunning = false;
    }
});

resetLapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap: ${lapTime}`;
        lapList.appendChild(lapItem);
        toggleLapListVisibility(); // Lap 추가 시 가시성 조정
    } else {
        clearInterval(timerInterval);
        elapsedTime = 0;
        timerDisplay.textContent = '00:00.00';
        resetLapBtn.textContent = 'Reset';
        lapList.innerHTML = '';
        toggleLapListVisibility(); // Lap 목록 비우기 시 가시성 조정
    }
});

// 초기 상태에서 Lap 목록 숨기기
toggleLapListVisibility();
