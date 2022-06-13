// some important variables
let array = ["rock", "paper", "scissors"];
let assets = [
    "assets/rock.png",
    "assets/paper.png",
    "assets/scissors.png",
];
const words = [
    "That's Great! You Win (:",
    "Nice, Another Victory!",
    "Wow, you are cool (^-^)",
    "Incredible! you still the winner!",
];

// some functions
textContent = (element, text) => element.textContent = text.toUpperCase();
capitalize = (string) => string[0].toUpperCase() + string.substring(1).toLowerCase();
headerText = () => array.map(e => capitalize(e)).join(", ");
getComputerChoice = () => Math.trunc(Math.random() * array.length);
generateLoseWord = (win, lose) => `${capitalize(win)} defeats ${lose}. You lose ):`;
generateWinWord = (n) => n > 2? words[3]: words[n];
function isAssets() {
    if (newImages.length === 3) {
        assets = newImages;
    }
}

// write header h1
const h1 = document.querySelector("h1");
h1.textContent = headerText();

// create buttons
const rock_btn = document.createElement("button");
const paper_btn = document.createElement("button");
const scissors_btn = document.createElement("button");
textContent(rock_btn, array[0]);
textContent(paper_btn, array[1]);
textContent(scissors_btn, array[2]);

rock_btn.setAttribute("class", "choice-btn");
paper_btn.setAttribute("class", "choice-btn");
scissors_btn.setAttribute("class", "choice-btn");

const choicesSection = document.querySelector('.choices');
choicesSection.appendChild(rock_btn);
choicesSection.appendChild(paper_btn);
choicesSection.appendChild(scissors_btn);

// logic for the game
let playerScore = 0;
let computerScore = 0;
let consecutiveWins = -1;

const playerScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result-p');
const playerSide_img = document.getElementById('player-side');
const computerSide_img = document.getElementById('computer-side');

function game(playerChoice, computerChoiceIndex) {
    let computerChoice = array[computerChoiceIndex];
    computerSide_img.src = assets[computerChoiceIndex];
    console.log(computerChoice);
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    }
    if (playerChoice === array[0]) {
        if (computerChoice === array[1]) {
            consecutiveWins = -1;
            computerScore++;
            return generateLoseWord(array[1], array[0]);
        } else {
            consecutiveWins++;
            playerScore++;
            return generateWinWord(consecutiveWins);
        }
    }
    if (playerChoice === array[1]) {
        if (computerChoice === array[2]) {
            consecutiveWins = -1;
            computerScore++;
            return generateLoseWord(array[2], array[1]);
        } else {
            consecutiveWins++;
            playerScore++;
            return generateWinWord(consecutiveWins);
        }
    }
    if (playerChoice === array[2]) {
        if (computerChoice === array[0]) {
            consecutiveWins = -1;
            computerScore++;
            return generateLoseWord(array[0], array[2]);
        } else {
            consecutiveWins++;
            playerScore++;
            return generateWinWord(consecutiveWins);
        }
    }
}

// buttons listener
rock_btn.addEventListener('click', function() {
    playerSide_img.src = assets[0];
    let statement = game(array[0], getComputerChoice());
    result_p.textContent = statement;
    playerScore_span.textContent = playerScore;
    computerScore_span.textContent = computerScore;
    
});

paper_btn.addEventListener('click', function() {
    playerSide_img.src = assets[1];
    let statement = game(array[1], getComputerChoice());
    result_p.textContent = statement;
    playerScore_span.textContent = playerScore;
    computerScore_span.textContent = computerScore;
});

scissors_btn.addEventListener('click', function() {
    playerSide_img.src = assets[2];
    let statement = game(array[2], getComputerChoice());
    result_p.textContent = statement;
    playerScore_span.textContent = playerScore;
    computerScore_span.textContent = computerScore;
});

// reload game function
const reload_div = document.querySelector('.reload');
reload_div.addEventListener('click', reload);
function reload() {
    playerScore = 0;
    computerScore = 0;
    consecutiveWins = -1;
    playerScore_span.textContent = playerScore;
    computerScore_span.textContent = computerScore;
    result_p.textContent = '';
    playerSide_img.src = assets[0];
    computerSide_img.src = assets[0];
}

// settints
const settintsIcon_div = document.querySelector(".settings-icon");
const settings_section = document.querySelector(".settings-section");
const close_btn = document.getElementById("close-btn");
const submit_btn = document.getElementById("save-btn");

const array1 = document.getElementById("array1");
const array2 = document.getElementById("array2");
const array3 = document.getElementById("array3");

const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

const primaryColor = document.getElementById('primary-color');
const secondaryColor = document.getElementById('secondary-color');
const rootCSS = document.querySelector(':root');

settintsIcon_div.addEventListener("click", function() {
    settings_section.style = 'display:block;';
    settintsIcon_div.classList.add("absolute");
    reload_div.classList.add("absolute");
});

close_btn.addEventListener('click', function() {
    setTimeout(function() {
        settings_section.style.display = 'none';
    }, 500);
    settintsIcon_div.classList.remove("absolute");
    reload_div.classList.remove("absolute");
    reload();
});

submit_btn.addEventListener('click', function() {
    setTimeout(function() {
        settings_section.style.display = 'none';
    }, 500);
    settintsIcon_div.classList.remove("absolute");
    reload_div.classList.remove("absolute");
    if (array1.value.trim() && array2.value.trim() && array3.value.trim()) {
        array[0] = array1.value;
        array[1] = array2.value;
        array[2] = array3.value;
        h1.textContent = headerText();
        textContent(rock_btn, array[0]);
        textContent(paper_btn, array[1]);
        textContent(scissors_btn, array[2]);
    }
    if (primaryColor.value !== "#25272E") {
        rootCSS.style.setProperty('--primary-color', primaryColor.value);
    }
    if (secondaryColor.value !== "#FFFFFF") {
        rootCSS.style.setProperty('--secondary-color', secondaryColor.value);
    }
    isAssets();
    reload();
});

// add different images
let newImages = [];
const imageSpan1 = document.querySelector('.image1-span');
const imageSpan2 = document.querySelector('.image2-span');
const imageSpan3 = document.querySelector('.image3-span');

image1.addEventListener('change', function() {
    const file1 = this.files[0];
    console.log(file1);
    const reader = new FileReader();
    reader.addEventListener('load', function() {
        newImages.push(this.result);
        imageSpan1.textContent = file1.name;
    });
    reader.readAsDataURL(file1);
});

image2.addEventListener('change', function() {
    const file2 = this.files[0];
    console.log(file2);
    const reader = new FileReader();
    reader.addEventListener('load', function() {
        newImages.push(this.result);
        imageSpan2.textContent = file2.name;
    });
    reader.readAsDataURL(file2);
});

image3.addEventListener('change', function() {
    const file3 = this.files[0];
    console.log(file3);
    const reader = new FileReader();
    reader.addEventListener('load', function() {
        newImages.push(this.result);
        imageSpan3.textContent = file3.name;
    });
    reader.readAsDataURL(file3);
});