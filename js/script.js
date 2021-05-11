const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInputbox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining")
const remainingGuessesSpan = document.querySelector(".remaining span");
const messageAppear = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();

    const wordArray = words.split("\n")
    //log out words
    //console.log(words);
    console.log(wordArray);
    const randomElement = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomElement].trim();
    placeholder(word);
};

getWord();

const placeholder = function (word) {
 const letterPlaceholder = [];
    for (const letter of word) {
        letterPlaceholder.push("●");  
    }
    wordInProgress.innerText = letterPlaceholder.join("")
};

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const letter = letterInputbox.value;
    console.log(letter);
 
    messageAppear.innerText = "";

    const playerGuess = letterInputbox.value;
    const guess = validatePlayerInput(playerGuess);
    //console.log(guess);

    if (guess) {
        makeGuess(playerGuess);
    }
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
        updateRemainingGuess(playerGuess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }

 

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
    checkIfPLayerWin();
};

const updateRemainingGuess = function (playerGuess) {
    const upperWord = word.toUpperCase();

    if (!upperWord.includes(playerGuess)) {
        messageAppear.innerText = `Sorry.. There is no letter ${playerGuess}.`
        remainingGuesses -= 1;
    } else {
        messageAppear.innerText = `Good guess! The word has letter ${playerGuess}.`
    }

    if (remainingGuesses === 0) {
        messageAppear.innerHTML = `Game over.  The word was <span class = "highlight">${word}</span>.  Better luck next time.`;
        startOver();
    } else if (remainingGuesses === 1) {
       remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }

};

const checkIfPLayerWin =  function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messageAppear.classList.add("win");
        messageAppear.innerHTML = `<p class = "highlight"> You guessed the correct word! Congrats!<p>`;
        
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener ("click", function() {
    messageAppear.classList.remove("win");
    messageAppear.innerText = "";
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `You have ${remainingGuesses} remaining.`;
    guessedLettersElement.innerHTML = "";

    getWord();

    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");

});


