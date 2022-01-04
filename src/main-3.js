const display = document.getElementById("display");
const keypad = document.getElementById("keypad");

const keypadNumbers = document.getElementById("keypad-numbers");
const keypadOperations = document.getElementById("keypad-operations");
const keyboardOnly = document.getElementById("keyboard-only");

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
    console.log(firstNumber)
  if (mathOperation === 20) sum = firstNumber / secondNumber;
  if (mathOperation === 21) sum = firstNumber * secondNumber;
  if (mathOperation === 22) sum = firstNumber - secondNumber;
  if (mathOperation === 23) sum = firstNumber + secondNumber;

  console.log(`sum: ${sum}`);

  if (type === "=") {
    firstNumber = secondNumber = workingNumber = "";
  } else firstNumber = sum;

  display.textContent = sum;
  secondNumber = '';
  mathOperation = '';
};

// Keypad event handler - Process which key was pressed by id value;
keypad.addEventListener("click", (e) => {
  const keyPressed = +e.target.id;
//   console.log(keyPressed)

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
  }

  //   Equals
  if (keyPressed === 24) {
      if(firstNumber && !secondNumber) {
        storeNumber('second');
        calcSum('=')
      }
  }

  //   Clear All
  if (keyPressed === 50) {
    console.log("Clear All");
    init();
  }
});

/////////////////////////////////////////////
// KEYBOARD INPUT

window.addEventListener("keydown", (e) => {
    const keyPressed = e.key;
    const mathKeys = ["/", "*", "-", "+"]
    console.log(keyPressed)
  
    // Number keys
    if (keyPressed <= 9 && keyPressed !== " ") {
      workingNumber += keyPressed;
      display.textContent = workingNumber;
    }
  
    // Mathmatical Operations
    if (mathKeys.includes(keyPressed)) {
      e.preventDefault();
        
        if(!firstNumber) {
        storeNumber('first');
        } else if(firstNumber && !secondNumber) {
        storeNumber('second');
        calcSum()
        }

        keyPressed === '/'? mathOperation = 20 : 
        keyPressed === '*'? mathOperation = 21 : 
        keyPressed === '-' ? mathOperation = 22 : mathOperation = 23; 

    }
  
    // Enter key for equals
    if (keyPressed === "Enter") {
      if(firstNumber && !secondNumber) {
        storeNumber('second');
        calcSum()
      }
    }
  
    // Esc key to un-trap Tab key from app
    if (e.key === "Escape") {
      if (!keyboardOnly.checked) return;
      keyboardOnly.checked = false;
      keyboardOnly.focus();
    }
  });
  
  let activeElement;
  
  const trapTabKey = function (e, keygroup) {
    // Select first/last Tab stop based on the 'keygroup' paramter
    const firstTabStop = keygroup.querySelector(".first-tab");
    const lastTabStop = keygroup.querySelector(".last-tab");
  
    // Loop Tab / Shift + Tab
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (activeElement.classList.contains("first-tab")) {
          e.preventDefault();
          lastTabStop.focus();
        }
      } else {
        if (activeElement.classList.contains("last-tab")) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  };
  
  const keypadFocus = function (e, keypad1, keypad2) {
    activeElement = document.activeElement;
  
    // If Tab lock checkbox is checked run trapTabKey function.
    if (keyboardOnly.checked) {
      trapTabKey(e, keypad1);
    }
  
    // Keypad grouping toggle shortcut
    // If q key is pressed refocus on the first Tab stop of the alternate Keypad group.
    if (e.key === "q") {
      keypad2.querySelector(".first-tab").focus();
    }
  };
  
  // Listeners for both Keypad groupings
  
  keypadNumbers.addEventListener("keydown", (e) => {
    keypadFocus(e, keypadNumbers, keypadOperations);
  });
  
  keypadOperations.addEventListener("keydown", (e) => {
    keypadFocus(e, keypadOperations, keypadNumbers);
  });