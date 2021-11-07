// ts-check
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('#datetime-picker');
const startButtonRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
startButtonRef.setAttribute('disabled', true);

inputRef.classList.add('set-timer-input');
startButtonRef.classList.add('start-timer-btn');

let userSelectedDate = null;

flatpickr(inputRef, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startButtonRef.setAttribute('disabled', 'true');
      Notify.failure('Please choose a date in the future');

      inputRef.removeAttribute('disabled', 'true');
    } else {
      userSelectedDate = selectedDates[0];
      startButtonRef.removeAttribute('disabled');
      inputRef.setAttribute('disabled', 'true');
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining time:
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function onStartButtonClick() {
  const timerId = setInterval(() => {
    const currentTime = new Date();
    let leftoverTime = userSelectedDate - currentTime;

    if (leftoverTime <= 0) {
      clearInterval(timerId);
      leftoverTime = 0;
    }

    inputRef.setAttribute('disabled', true);
    startButtonRef.setAttribute('disabled', true);

    const resultTime = convertMs(leftoverTime);
    updateUserInterface(resultTime);
  }, 1000);
}

startButtonRef.addEventListener('click', onStartButtonClick);

function updateUserInterface({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
