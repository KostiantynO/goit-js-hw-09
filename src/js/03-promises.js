const formRef = document.querySelector('.form');
const delayInputRef = formRef.querySelector('[name="delay"]');
const stepInputRef = formRef.querySelector('[name="step"]');
const amountInputRef = formRef.querySelector('[name="step"]');
const submitBtnRef = formRef.querySelector('[name="amount"]');

formRef.addEventListener('submit', callback);

function callback(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target;

  for (let index = 0; index < amount.value; index += 1) {
    createPromise(index, delay.value + step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    setTimeout(() => {
      console.log(position, delay, '✅ Resolved');
    }, delay);

    // Fulfill
  } else {
    setTimeout(() => {
      console.log(position, delay, '❌ Reject');
    }, delay);

    // Reject
  }
}
