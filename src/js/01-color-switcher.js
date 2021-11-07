// const btnStart = document.querySelectorAll('button')[0];
// const btnStop = document.querySelectorAll('button')[1];

// const el = document.createElement('h1');
// el.textContent = 'Hello World';
// document.body.appendChild(el);

// let changing = false;

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

// const onStartBtnClick = e => {
//   changing = true;
//   e.currentTarget.setAttribute('disabled', 'true');

//   btnStop.addEventListener('click', onStopBtnClick, {
//     once: true,
//   });

//   if (changing === true) {
//     while (changing === true) {
//       setTimeout(() => {
//         document.body.style.backgroundColor = getRandomHexColor();
//       }, 1000);
//     }
//   }
// };

// const onStopBtnClick = e => {
//   changing = false;
//   btnStart.removeAttribute('disabled');

//   btnStart.addEventListener('click', onStartBtnClick, {
//     once: true,
//   });
// };

// btnStart.addEventListener('click', onStartBtnClick, {
//   once: true,
// });
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
    startButton.setAttribute('disabled', true);
  }, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  startButton.removeAttribute('disabled');
});
