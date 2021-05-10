const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInputbox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining span");
const messageAppear = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
 const letterPlaceholder = [];
    for (const letter of word) {
        letterPlaceholder.push("●");  
    }
    wordInProgress.innerText = letterPlaceholder.join("")
};
placeholder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const letter = letterInputbox.value;
    console.log(letter);
 
    messageAppear.innerText = "";

    const playerGuess = letterInputbox.value;
    const guess = validatePlayerInput(playerGuess);
    //console.log(guess);
    makeGuess(playerGuess);

    letterInputbox.value = "";

});
//function that validates the input
const validatePlayerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messageAppear.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        messageAppear.innerText = "Please enter 1 letter at a time";
    } else if (!input.match(acceptedLetter)) {
        messageAppear.innerText = "Please enter a letter from A to Z";  
    } else {
        return input;
    }
};

const makeGuess = function (playerGuess) {
    playerGuess = playerGuess.toUpperCase();

    if (guessedLetters.includes(playerGuess)) {
        messageAppear.innerText = "You already guessed that letter. Try again!"
    } else {
        guessedLetters.push(playerGuess);
        console.log(guessedLetters);
        showGuessedLetters();
    }
    updateWordInProgress(guessedLetters);
    checkIfPLayerWin();
};

const showGuessedLetters = function() {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);

    const revealWord = [];

    for (letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        } 
    }
    wordInProgress.innerText = revealWord.join("")
};

const checkIfPLayerWin =  function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messageAppear.classList.add("win");
        messageAppear.innerHTML = `<p class = "highlight"> You guessed the correct word! Congrats!<p>`;
    }
}




