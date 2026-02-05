function step1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

function step2(num) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(num * 2), 1000);
  });
}

function step3(num) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(num + 5), 1000);
  });
}

async function getsteps() {
  const stepof1 = await step1();
  const stepof2 = await step2(stepof1);
  const stepof3 = await step3(stepof2);
  console.log(stepof3);
  return stepof3;
}

getsteps();

// Write an async function that:
// 1. Gets result from step1
// 2. Passes that result to step2
// 3. Passes step2's result to step3
// 4. Returns the final result
// Your code here:
