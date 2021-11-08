import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonRef = document.querySelector("[type='submit']");
const formRef = document.querySelector('.form');

const delayInputRef = formRef.querySelector("[name='delay']");
const stepInputRef = formRef.querySelector("[name='step']");
const amountInputRef = formRef.querySelector("[name='amount']");

const labels = formRef.querySelectorAll('label');
labels.forEach(el => el.classList.add('new-class'));

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const delayValue = parseInt(form.delay.value);
  const stepValue = parseInt(form.step.value);
  const amountValue = parseInt(form.amount.value);

  for (let position = 0; position < amountValue; position += 1) {
    const delay = delayValue + stepValue * position;

    createPromise({ position, delay })
      .then(({ position, delay } = {}) => {
        Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay } = {}) => {
        Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      });
  }
}

function createPromise({ position, delay }) {
  const shouldResolve = Math.random() > 0.3;

  const executor = (resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  };

  const promise = new Promise(executor);
  return promise;
}

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (isSuccess) {
//       resolve("Success! Value passed to resolve function");
//     } else {
//       reject("Error! Error passed to reject function");
//     }
//   }, 2000);
// });

// const executor = (yes, no) => {
//
// yes('Yes. Im success callback execution ');
// no('No, an error occured! Im error callback execution');
// //
// };

// const myNewlyCreatedPromise = new Promise(executor)
//   .then(e => console.log('then 1', e))
//   .catch(e => console.log('catch error', e))
//   .then(e => console.log('then 2', e))
//   .finally(e => console.log('finally1', e))
//   .finally(e => console.log('finally2', e))
//   .finally(e => console.log('finally3', e))
//   .catch(e => console.log('catch2', e))
//   .then(e => console.log('then3', e))
//   .finally(e => console.log('finally4', e))
//   .then(e => console.log('then4', e));

// Change value of isSuccess variable to call resolve or reject
// const isSuccess = true;
