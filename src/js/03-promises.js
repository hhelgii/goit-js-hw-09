const form = document.querySelector('.form');
form.addEventListener('submit', submitPromiseCreate);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function submitPromiseCreate(event){
  event.preventDefault();
  let delay=Number(event.currentTarget.elements.delay.value);
  let amount=Number(event.currentTarget.elements.amount.value);
  let step=Number(event.currentTarget.elements.step.value);
  for(let i=1;i<=amount;i+=1) {
    delay+=step;
    createPromise(i,delay).then(({position,delay})=>{
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
    }).catch(({position,delay})=>{
      console.log(`❌ Rejected promise ${position} in ${delay}ms`)
    })

  }
  event.currentTarget.reset();
}