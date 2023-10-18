let settings = {
    countDownDate: null,
    countDownInterval: null,
    timeout: 14
  }
  document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
  
    let countdownHTML = document.getElementById("curentCountdown");
    countdownHTML.innerHTML = settings.timeout
  
    for (let button of buttons) {
      button.addEventListener("click", function() {
        if (this.getAttribute("data-type") === "submit") {
          checkAnswer();
        } else {
          let gameType = this.getAttribute("data-type");
          runGame(gameType);
        }
      });
    }
  
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        checkAnswer();
      }
    });
    runGame("addition");
  });
  
  function runGame(gameType) {
  
    // Generate two random numbers between 1 and 25
    // Math.floor rounds down to the whole number
    // Math.random generates random numbers
  
    document.getElementById("answer-box").value = "";
    // document.getElementById("answer-box").focus();
  
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
  
    if (gameType === "addition") {
      displayAdditionQuestion(num1, num2);
    } else {
      alert(`Unknown game type ${gameType}`);
      throw `Unknown game type ${gameType}, aborting!`;
    }
  
    stopCountdown()
  
    settings.countDownDate = new Date()  
    settings.countDownInterval = setInterval(countdownDateCalculate, 1000)
  }
  
  function countdownDateCalculate() {
    let currentDateTime = new Date().getTime();
    let differenceBetweenCurrentDate = settings.countDownDate - currentDateTime
    
    let maxSeconds = (settings.timeout * 1000) * 60
    let timeoutSeconds = Math.abs(Math.floor((differenceBetweenCurrentDate % maxSeconds) / 1000))
  
    let countdownHTML = document.getElementById("curentCountdown");
  
    let secondsToDisplay = settings.timeout - timeoutSeconds
  
    countdownHTML.innerHTML = secondsToDisplay
    countdownHTML.setAttribute("value", secondsToDisplay)
  
    // BOOM
    if (secondsToDisplay <= 0) {
      countdownHTML.innerHTML = '<span class="message">💣💣 Booom! 💣💣 Game Over<span>'
    }
  }
  
  function stopCountdown() {
    clearInterval(settings.countDownInterval)
    let countdownHTML = document.getElementById("curentCountdown");
    countdownHTML.innerHTML = ""
  }
  
  function checkAnswer() {
  
    // Checks the answer against the first element in
    // the returned calculateCorrectAnswer array
  
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
  
    if (isCorrect) {
      alert("Hey! You got it right! :D");
      incrementScore();
    } else {
      alert(`Awwww...you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
      incrementWrongAnswer();
    }
  
    runGame(calculatedAnswer[1]);
  
  }
  
  function calculateCorrectAnswer() {
  
    // Gets the operands (the numbers) and the operator (plus, minus etc)
    // directly from the DOM
      console.log('In here')
    let operand1 = parseInt(document.getElementById("operand1").textContent);
    let operand2 = parseInt(document.getElementById("operand2").textContent);
    let operator = document.getElementById("operator").textContent;
      console.log('*****', operator, operand1, operand2)
    if (operator === "+") {
      return [operand1 + operand2, "addition"];
    }  else {
      alert(`Unimplemented operator ${operator}`);
      throw `Unimplemented operator ${operator}, aborting!`;
    }
  }
  
  function incrementScore() {
  
    // Gets the current score from the DOM and increments it
  
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
  
  }
  
  function incrementWrongAnswer() {
  
    // Gets the current tally of incorrect answers from the DOM and increments it
  
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
  
  }
  
  function displayAdditionQuestion(operand1, operand2) {
  
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
  
  }
  
 
  