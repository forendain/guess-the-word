const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInputbox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining span");
const messageAppear = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

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
    letterInputbox.value = "";
})
