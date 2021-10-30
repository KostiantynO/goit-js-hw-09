const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

console.log(btnStart);

let changing = false;

const switchBgColor = () => {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onStartBtnClick = e => {
  changing = true;
  e.currentTarget.setAttribute('disabled', 'true');

  do {
    setTimeout(switchBgColor(), 1000);
  } while (changing === true);

  btnStop.addEventListener('click', onStopBtnClick, {
    once: true
  });
};

const onStopBtnClick = e => {
  changing = false;
  btnStart.removeAttribute('disabled');

  btnStart.addEventListener('click', onStartBtnClick, {
    once: true,
  });
};

btnStart.addEventListener('click', onStartBtnClick, {
  once: true,
});
