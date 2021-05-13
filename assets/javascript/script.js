// wair for the DOM to finnish loading before runnning the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    // more modern way of writing (let i = 0; i < button.length; i++)
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                alert(`You clicked ${gameType}`);
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})

// Docstrings created above functions will show information about that function when hoverd over it.
/**
 * The main game "loop", called when the script is first loaded.
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    
    // Creates 2 random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    }else {
        alert(`Uknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer against the first element in 
 * the returned calculatedCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if(isCorrect) {
        alert("Hey! You got it correct!")
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}
/**
 * Gets the operands (the numbers) and the operatoor (plus, minus etc)
 * directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    // parseInt is becase the default is string, and we cant do mathematical equations with a string so we convert it to an integer.
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else {
        alert(`Unimplemented operator ${operator}`)
        throw`Unimplemented operator ${operator}. Aborting!`;
    }

}

/**
 * Gets the currect score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Get the corrent tally of incorrect answers from the DOM and iuncrements it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";


}

function displayDivisionQuestion () {

}