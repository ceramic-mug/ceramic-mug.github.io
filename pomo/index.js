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
  let breakCount = 0;
  let sessionCount = 0;
  let longBreakDuration = breakDuration * 3;
  const sessionCountEl = document.getElementById('session-count');
  // Render tally marks for session count
  function renderTally(count) {
    const full = Math.floor(count / 5);
    const rem = count % 5;
    let s = '';
    for (let i = 0; i < full; i++) {
      s += '||||\\ ';
    }
    for (let i = 0; i < rem; i++) {
      s += '|';
    }
    return s.trim();
  }
  function updateSessionCount() {
    const tally = renderTally(sessionCount);
    sessionCountEl.innerHTML = `<span class="tally">${tally}</span>`;
  }
  // Sound files for sessions
  const soundFiles = {
    work: [
      "tbapss01.wav",
      "tbapss02.wav",
      "tbardy00.wav",
      "tbawht00.wav",
      "tbawht02.wav",
      "tbayes00.wav",
      "tcvpss00.wav",
      "tcvpss01.wav",
      "tcvpss04.wav",
      "tdrwht00.wav",
      "tdryes01.wav",
      "tdryes04.wav",
      "tfbwht00.wav",
      "tgopss00.wav",
      "tgordy00.wav",
      "tgowht00.wav",
      "tgowht03.wav",
      "tmapss00.wav",
      "tmapss01.wav",
      "tmapss05.wav",
      "tmawht02.wav",
      "tmayes00.wav",
      "tmayes01.wav",
      "tmayes03.wav",
      "tmdrdy00.wav",
      "tmdwht02.wav",
    ],
    "short break": [
      "taderr00.wav",
      "taderr01.wav",
      "taderr02.wav",
      "taderr06.wav",
      "tbayes02.wav",
      "tcvrdy00.wav",
      "tcvyes00.wav",
      "tfbpss05.wav",
      "tgopss02.wav",
      "tgopss04.wav",
      "tmawht01.wav",
      "tmayes02.wav",
      "tmdpss02.wav",
    ],
    "long break": [
      "tadupd02.wav",
      "tbapss03.wav",
      "tbapss04.wav",
      "tdrpss01.wav",
      "tdrpss03.wav",
      "tfbpss03.wav",
      "tfbpss04.wav",
      "tmapss02.wav",
      "tmapss06.wav",
      "tmdpss04.wav",
    ]
  };
  // Play a random sound for the given session type
  function playSound(type) {
    const files = soundFiles[type];
    if (!files || files.length === 0) return;
    const file = files[Math.floor(Math.random() * files.length)];
    const audio = new Audio(`sounds/${type}/${file}`);
    audio.play();
  }

  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  function switchSession() {
    isWork = !isWork;
    if (isWork) {
      timeLeft = workDuration;
      sessionTypeEl.textContent = 'Work Session';
    } else {
      breakCount++;
      if (breakCount % 4 === 0) {
        timeLeft = longBreakDuration;
        sessionTypeEl.textContent = 'Long Break';
      } else {
        timeLeft = breakDuration;
        sessionTypeEl.textContent = 'Short Break';
      }
    }
    updateDisplay();
  }

  function startTimer() {
    if (timerInterval) return;
    // Play sound at the start of a new session
    if (isWork && timeLeft === workDuration) {
      playSound('work');
    } else if (!isWork) {
      if (breakCount % 4 === 0 && timeLeft === longBreakDuration) {
        playSound('long break');
      } else if (timeLeft === breakDuration) {
        playSound('short break');
      }
    }
    startPauseBtn.textContent = 'Pause';
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        if (isWork) {
          sessionCount++;
          updateSessionCount();
        }
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
    if (isWork) {
      timeLeft = workDuration;
    } else {
      if (breakCount % 4 === 0) {
        timeLeft = longBreakDuration;
      } else {
        timeLeft = breakDuration;
      }
    }
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
    longBreakDuration = breakDuration * 3;
    resetTimer();
  });

  updateDisplay();
  updateSessionCount();
});
