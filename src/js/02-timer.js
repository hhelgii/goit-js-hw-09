import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  text: document.getElementById('datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    const then = selectedDates[0].getTime();
    const now = new Date().getTime();
    if (then - now <= 0) {
      alert('Please choose a date in the future');
      // refs.start.setAttribute('disabled', '');
    } else {
      refs.start.removeAttribute('disabled');
    }
  },
};
refs.start.setAttribute('disabled', '');

flatpickr(refs.text, options);

let timerId = null;

refs.start.addEventListener('click', () => {
  clearInterval(timerId);
  refs.text.setAttribute('disabled', '');
  timerId = setInterval(() => {
    const now = new Date();
    const then = new Date(refs.text.value);
    const difference = then - now;
    // console.log(now);
    // console.log(then);
    // console.log(difference);
    const time = convertMs(difference);
    console.log(time);
    refs.days.textContent = addLeadingZero(time.days);
    refs.hours.textContent = addLeadingZero(time.hours);
    refs.minutes.textContent = addLeadingZero(time.minutes);
    refs.seconds.textContent = addLeadingZero(time.seconds);
    if(difference<1000){
      clearInterval(timerId);
      refs.text.removeAttribute('disabled');
    }
    // console.log(`${addLeadingZero(time.days)} ${addLeadingZero(time.hours)} ${addLeadingZero(time.minutes)} ${addLeadingZero(time.seconds)}` )
  }, 1000);
  

});

function addLeadingZero(value) {
  // return value.length < 2 ? value.padStart(1, '0') : value;
  return String(value).padStart(2,'0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
