const inputField = document.querySelector('.input');
const outputField = document.querySelector('.output');
const welcomeMessage1 = "Welcome to Your RPG Game Terminal!";
const welcomeMessage2 = "Type 'Let's play a game' to begin.";

// Define the game options with corresponding links
const gameOptions = [
    { name: "Game 1", link: "game1.html" },
    { name: "Game 2", link: "game2.html" },
    { name: "Game 3", link: "game3.html" },
    { name: "Game 4", link: "game4.html" }
];

// Function to type out the welcome messages
function typeWelcomeMessages() {
    let index = 0;
    const typeInterval = 50; // Adjust the typing speed here (in milliseconds)

    const typeTimer = setInterval(() => {
        if (index < welcomeMessage1.length) {
            outputField.innerHTML += welcomeMessage1[index];
        } else if (index === welcomeMessage1.length) {
            outputField.innerHTML += '<br>';
        } else if (index > welcomeMessage1.length && index <= welcomeMessage1.length + welcomeMessage2.length) {
            outputField.innerHTML += welcomeMessage2[index - welcomeMessage1.length - 1];
        } else {
            clearInterval(typeTimer);
            outputField.innerHTML += '<br>';
        }
        index++;

        if (index === welcomeMessage1.length + welcomeMessage2.length) {
            clearInterval(typeTimer);
            outputField.innerHTML += '<br>';
        }
    }, typeInterval);
}

// Display the welcome messages
typeWelcomeMessages();

inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const command = inputField.value;
        inputField.value = '';

        if (command.toLowerCase() === 'clear') {
            clearTerminal();
        } else {
            const response = processCommand(command);

            outputField.innerHTML += `<p>> ${command}</p>`;
            outputField.innerHTML += `<p>${response}</p>`;

            outputField.scrollTop = outputField.scrollHeight;
        }
    }
});

function processCommand(command) {
    // Common question responses
    command = command.toLowerCase(); // Convert input to lowercase for case-insensitivity
    // Remove punctuation characters (apostrophes, etc.)
    command = command.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g,"");

    if (command === 'hello' || command === 'hi') {
        return 'Hello! How can I assist you today?';
    } else if (command === 'how are you') {
        return 'I am just a computer program, but I am here to help you!';
    } else if (command === 'help') {
        return 'You can type commands related to your RPG game or ask questions. Try "clear" to clear the screen.';
    } else if (command.includes("lets play a game") || command.includes("what games can we play")) {
        const gameList = gameOptions.map(option => `<p><a href="${option.link}">${option.name}</a></p>`).join('<br>');
        return `Here are some game options:<br>${gameList}`;
    }
    
    // Check if the user input matches a game option and open the corresponding link
    const selectedGame = gameOptions.find(option => option.name.toLowerCase() === command);
    if (selectedGame) {
        window.location.href = selectedGame.link; // Navigate to the game's link
    }
    
    // Implement your RPG game logic here
    // Example: a simple "echo" command
    return `You entered: ${command}`;
}

function clearTerminal() {
    outputField.innerHTML = ''; // Clears the output area
}









