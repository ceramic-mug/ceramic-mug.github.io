document.addEventListener('DOMContentLoaded', () => {
  const timerEl = document.getElementById('timer');
  const sessionTypeEl = document.getElementById('session-type');
  const startPauseBtn = document.getElementById('start-pause');
  const resetBtn = document.getElementById('reset');
  const workInput = document.getElementById('work-duration');
  const breakInput = document.getElementById('break-duration');
  const applySettingsBtn = document.getElementById('apply-settings');

  let workDuration = parseInt(workInput.value, 10) * 60;
  let breakDuration = parseInt(breakInput.value, 10) * 60;
  let timeLeft = workDuration;
  let isWork = true;
  let timerInterval = null;

  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  function switchSession() {
    isWork = !isWork;
    timeLeft = isWork ? workDuration : breakDuration;
    sessionTypeEl.textContent = isWork ? 'Work Session' : 'Break Session';
    updateDisplay();
  }

  function startTimer() {
    if (timerInterval) return;
    startPauseBtn.textContent = 'Pause';
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        switchSession();
        startTimer();
      } else {
        updateDisplay();
      }
    }, 1000);
  }

  function pauseTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      startPauseBtn.textContent = 'Start';
    }
  }

  function resetTimer() {
    pauseTimer();
    timeLeft = isWork ? workDuration : breakDuration;
    updateDisplay();
  }

  startPauseBtn.addEventListener('click', () => {
    if (timerInterval) pauseTimer();
    else startTimer();
  });

  resetBtn.addEventListener('click', resetTimer);

  applySettingsBtn.addEventListener('click', () => {
    const workVal = parseInt(workInput.value, 10);
    const breakVal = parseInt(breakInput.value, 10);
    if (isNaN(workVal) || workVal < 1 || isNaN(breakVal) || breakVal < 1) {
      alert('Please enter valid durations (minimum 1 minute).');
      return;
    }
    workDuration = workVal * 60;
    breakDuration = breakVal * 60;
    resetTimer();
  });

  updateDisplay();
});
