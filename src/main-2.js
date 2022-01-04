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

// Store number variables - Process if number to store is firstNumber or secondNumber;
const storeNumber = function (num) {
  if (num === 'first') {
    firstNumber = +workingNumber;
    workingNumber = "";
    console.log(`FirstNum = ${firstNumber}`);
  } 
  if (num === 'second') {
    secondNumber = +workingNumber;
    workingNumber = "";
    console.log(`SecondNum = ${secondNumber}`);
  } 
};

// Calculate the sum - Process based on operation;
const calcSum = function (type) {
  if (mathOperation === 20) sum = firstNumber / secondNumber;
  if (mathOperation === 21) sum = firstNumber * secondNumber;
  if (mathOperation === 22) sum = firstNumber - secondNumber;
  if (mathOperation === 23) sum = firstNumber + secondNumber;

  console.log(`sum: ${sum}`);

  /////////////////////////////////////////
  if (type === "=") {
    firstNumber = secondNumber = workingNumber = "";
  } else firstNumber = sum;
  /////////////////////////////////////////

  display.textContent = sum;
  secondNumber = '';
  mathOperation = '';
};

// Keypad event handler - Process which key was pressed by id value;
keypad.addEventListener("click", (e) => {
  const keyPressed = +e.target.id;
  // console.log(keyPressed)

  if (!keyPressed && keyPressed !== 0) return; // Guard Clause

  // Standard numbers
  if (keyPressed >= 0 && keyPressed <= 9) {
    workingNumber += keyPressed;
    display.textContent = workingNumber;
  }

  //   Decimal point
  if (keyPressed === 10) {
      if(!workingNumber.includes('.')) {
          workingNumber += '.'
          display.textContent += ".";
      }
  }

  //   Mathmatical Operations
  if (keyPressed >= 20 && keyPressed <= 23) {
      /////////////////////////////////
    if (!workingNumber) {
        workingNumber = sum;
      }

    if(!firstNumber) {
        storeNumber('first');
    } else if(firstNumber && !secondNumber) {
        storeNumber('second');
        calcSum()
    }

    mathOperation = keyPressed;
    /////////////////////////////////////
      
  }

  //   Equals
  if (keyPressed === 24) {
      //////////////////////////////////
      if(firstNumber && !secondNumber) {
        storeNumber('second');
        calcSum('=')
      }
      //////////////////////////////////
  }

  //   Clear All
  if (keyPressed === 50) {
    console.log("Clear All");
    init();
  }
});