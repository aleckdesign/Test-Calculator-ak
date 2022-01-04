const display = document.getElementById("display");
const keypad = document.getElementById("keypad");

let firstNumber;
let secondNumber;
let workingNumber;

let mathOperation;
let sum;

const init = function () {
  firstNumber = secondNumber = workingNumber = "";
  mathOperation = sum = undefined
  display.textContent = "0";
};
init();

const storeNumber = function () {
  if (!firstNumber) {
    firstNumber = +workingNumber;
    workingNumber = "";
    console.log(`FirstNum = ${firstNumber}`);
  } else if (firstNumber && !secondNumber) {
    secondNumber = +workingNumber;
    workingNumber = "";
    console.log(`SecondNum = ${secondNumber}`);
    calcSum();
  } 
};

const calcSum = function () {
  if (mathOperation === 20) sum = firstNumber / secondNumber;
  if (mathOperation === 21) sum = firstNumber * secondNumber;
  if (mathOperation === 22) sum = firstNumber - secondNumber;
  if (mathOperation === 23) sum = firstNumber + secondNumber;

  console.log(`sum: ${sum}`);

  display.textContent = sum;
  firstNumber = sum;
  secondNumber = '';
  mathOperation = '';
};

keypad.addEventListener("click", (e) => {
  const keyPressed = +e.target.id;
  console.log(keyPressed)

  if (!keyPressed && keyPressed !== 0) return; // Guard Clause

  // Standard numbers
  if (keyPressed >= 0 && keyPressed <= 9) {
    workingNumber += keyPressed;
    display.textContent = workingNumber;
  }

  //   Decimal point
  if (keyPressed === 10) {
    //  ADD if(already includes decimal return)
    display.textContent += ".";
  }

  //   Mathmatical Operations
  if (keyPressed >= 20 && keyPressed <= 23) {
    storeNumber();
    mathOperation = keyPressed;
      
  }

  //   Equals
  if (keyPressed === 24) {
    storeNumber();
  }

  //   Clear All
  if (keyPressed === 50) {
    console.log("Clear All");
    init();
  }
});

/////////////////////////////////
// PAST BRAINSTORMS

// const equals = function () {
//     if (!firstNumber || !secondNumber) return;
//     calcSum();
//   };

// let mathMode = false;

// const divide = function () {
//   console.log("divide");
// };
// const multiply = function () {
//   console.log("times");
// };
// const subtraction = function () {
//   console.log("minus");
// };
// const addition = function () {
//   console.log("add");
// };

// const mathOperation = function (operation) {
//   if (operation === 20) divide();
//   if (operation === 21) multiply();
//   if (operation === 22) subtraction();
//   if (operation === 23) addition();
//   if (operation === 24) equals();
// };