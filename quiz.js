let currentQuestion = 0;
let score = 0;
let selectedTopic = '';
let selectedLevel = '';
let timerInterval;
let remainingTime;
let totalTimeTaken = 0;

const questions = {
    general: {
        easy: [
            { question: " How many days are there in a week??", options: ["14 days", "6 days", "7 days", "9 days"], answer: "c" },
            { question: "Who is the President of India as of 2024?", options: ["Ram Nath Kovind", "Pratibha Patil", "APJ Abdul Kalam", "Droupadi Murmu"], answer: "d" },
            { question: "What is the Capital of India?", options: ["Mumbai", "New Delhi", "Banglore", "Chennai"], answer: "b" },
            { question: "What is the national currency of India?", options: ["Doller", "Euro", "Rupee", "Yen"], answer: "c" },
            { question: "Which day of the week comes after Monday?", options: ["Sunday", "Tuesday", "Wednesday", "Thursday"], answer: "b" },
        ],
        medium: [
            { question: "Which Indian state has the highest population?", options: ["Utter Pradesh", "Maharashtra", "Bihar", "West Bengal"], answer: "a" },
            { question: "What is the chemical symbol for water?", options: ["H2", "O2", "CO2", "H2O"], answer: "d" },
            { question: "Which country is known as the Land of the Rising Sun?", options: ["Japan", "China", "India", "Korea"], answer: "a" },
            { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "c" },
            { question: "Which Indian leader is known as the 'Father of the Nation' ?", options: ["Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Mahatma Gandhi", "Subhas Chandra Bose"], answer: "c" },
        ],
        hard: [
            { question: "What is the largest country by area?", options: ["Russia", "Canada", "China", "USA"], answer: "a" },
            { question: "What is the official language of India?", options: ["Hindi", "English", "Both Hindi and English", "None of the above"], answer: "c" },
            { question: "Which Indian state is the largest producer of silk?", options: ["Karnataka", "West Bengol", "Tamil Nadu", "Andhra Pradesh"], answer: "a" },
            { question: "What is the largest organ in the human body?", options: ["Heart", "Brain", "Liver", "Skin"], answer: "d" },
            { question: "What is the national flower of India??", options: ["Lotus", "Rose", "Lily", "Sunflower"], answer: "a" },
        ]
    },
    science: {
        easy: [
            { question: "What is the boiling point of water?", options: ["100°C", "90°C", "80°C", "70°C"], answer: "a" },
            { question: "Which planet is closest to the Sun?", options: ["Earth", "Venus", "Mercury", "Mars"], answer: "c" },
            { question: "What is the main gas found in the air we breathe?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], answer: "b" },
            { question: "What force keeps us on the ground?", options: ["Friction", "Magnetism", "Electricity", "Gravity"], answer: "d" },
            { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Hg"], answer: "a" },
        ],
        medium: [
            { question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"], answer: "a" },
            { question: "What is the most abundant element in the universe?", options: ["Carbon", "Oxygen", "Hydrogen", "Helium"], answer: "c" },
            { question: "Which technology is used for wireless communication over short distances?", options: ["Bluetooth", "GPS", "Ethernet", "Fiber Optics"], answer: "a" },
            { question: "Who is known as the father of modern computers?", options: ["Alan Turing", "Charles Babbage", "John von Neumann", "Bill Gates"], answer: "b" },
            { question: "Which particle has a negative charge?", options: ["Photon", "Proton", "Neutron", "Electron"], answer: "d" },
        ],
        hard: [
            { question: "What is the chemical symbol for table salt?", options: ["CaCO3", "KCl", "NaCl", "H2SO4"], answer: "c" },
            { question: "Which element is known for having the highest melting point?", options: ["Carbon", "Tungsten", "Osmium", "Platinum"], answer: "b" },
            { question: "What is the center of an atom called?", options: ["Nucleus", "Electron", "Proton", "Neutron"], answer: "a" },
            { question: "In which language is the 'Linux' operating system primarily written?", options: ["Python", "Java", "C", "c++"], answer: "c" },
            { question: "What is the name of the protocol used for secure communication over the internet?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], answer: "a" },
        ]
    },
    culture: {
        easy: [
            { question: "Which festival is known as the Festival of Lights?", options: ["Diwali", "Holi", "Christmas", "Eid"], answer: "a" },
            { question: "The famous “Ganga Sagar Mela”, an annual fair is held in which state of India?", options: ["Bihar", "Utter Pradesh", "Jharkhand", "West Bengal"], answer: "d" },
            { question: "Ancient Bhima Devi Temple is located in which state ?", options: ["Rajasthan", "Himachal Pradesh", "Haryana", "Punjab"], answer: "c" },
            { question: "Ancient Bhima Devi Temple is located in which state ?", options: ["India", "Bhutan", "Nepal", "None of the above"], answer: "b" },
            { question: "What is Parsi New Year known as?", options: ["Gusi Padwa", "Navroz", "Ugadi", "None of the above"], answer: "b" },
        ],
        medium: [
            { question: "The city of Varanasi is known for its significance in which religion?", options: ["Hindustan", "Busddhism", "Islam", "Sikhism"], answer: "a" },
            { question: "The Indian epic 'Mahabharata' is traditionally attributed to which sage?", options: ["Kalidasa", "Valmiki", "Patanjali", "Vyasa"], answer: "d" },
            { question: "Which Indian state is known for the classical dance form called 'Mohiniyattam'?", options: ["Karnataka", "Kerala", "Andhra Pradesh", "Tamil Nadu"], answer: "b" },
            { question: "What is the name of the famous Indian festival that celebrates the birth of Lord Krishna?", options: ["Navratri", "Raksha Bandhan", "Janmashtami", "Ganesh Chaturthi"], answer: "c" },
            { question: "In which year was the Indian National Congress founded?", options: ["1885", "1900", "1920", "1947"], answer: "a" },
        ],
        hard: [
            { question: "Which Mughal emperor commissioned the construction of the Red Fort in Delhi?", options: ["Akbar", "Shah Jahan", "Babur", "Aurangzeb"], answer: "b" },
            { question: "In which year was the famous Indian epic 'Ramayana' written by Valmiki?", options: ["500 BCE", "300 BCE", "1000 CE", "500 CE"], answer: "d" },
            { question: "Which ancient Indian text is a philosophical treatise on statecraft and military strategy?", options: ["Arthashastra", "Manusmriti", "Upnishads", "Yoga Sutra"], answer: "a" },
            { question: "What is the national sport of Japan?", options: ["Sumo", "Karate", "Judo", "Kendo"], answer: "a" },
            { question: "Which ancient Indian text is considered a key work on Ayurveda and medicine?", options: ["Bhagavad Gita", "Manusmriti", "Charaka Samhita", "Vedas"], answer: "c" },
        ]
    }
};


function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'flex';
}

function startQuiz() {
    selectedTopic = document.getElementById('topicSelect').value;
    selectedLevel = document.getElementById('levelSelect').value;
    document.getElementById('quizTopic').innerText = `Topic: ${selectedTopic.replace(/^\w/, c => c.toUpperCase())} - Level: ${selectedLevel.replace(/^\w/, c => c.toUpperCase())}`;
    showPage('quiz');
    currentQuestion = 0;
    totalTimeTaken = 0;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval); // Clear any existing timer
    const questionsForTopic = questions[selectedTopic][selectedLevel];
    if (currentQuestion < questionsForTopic.length) {
        document.getElementById('question').innerText = questionsForTopic[currentQuestion].question;
        const options = document.getElementById('options').children;
        for (let i = 0; i < options.length; i++) {
            options[i].innerText = questionsForTopic[currentQuestion].options[i];
            options[i].style.backgroundColor = ""; // Reset background color
            options[i].disabled = false; // Enable buttons for the next question
        }
        document.getElementById('nextButton').style.display = 'none'; // Hide the Next button initially
        
        // Set timer duration based on level
        switch (selectedLevel) {
            case 'easy': remainingTime = 10; break;
            case 'medium': remainingTime = 20; break;
            case 'hard': remainingTime = 30; break;
        }
        
        // Start the timer
        document.getElementById('score').innerText = `Score: ${score} | Time Remaining: ${remainingTime} seconds`;
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        showResults();
    }
}

function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        totalTimeTaken++;
        document.getElementById('score').innerText = `Score: ${score} | Time Remaining: ${remainingTime} seconds`;
    } else {
        // Time ran out, move to the next question
        clearInterval(timerInterval);
        submitAnswer(null); // Automatically submit with no answer
    }
}

function submitAnswer(option) {
    clearInterval(timerInterval); // Stop the timer

    const questionsForTopic = questions[selectedTopic][selectedLevel];
    const correctAnswer = questionsForTopic[currentQuestion].answer;
    const options = document.getElementById('options').children;

    // Disable all buttons after answering
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = true;
    }

    if (option === correctAnswer) {
        score++;
        document.querySelector(`#options button:nth-child(${getOptionIndex(option)})`).style.backgroundColor = "green";
    } else {
        if (option) {
            document.querySelector(`#options button:nth-child(${getOptionIndex(option)})`).style.backgroundColor = "red";
        }
        document.querySelector(`#options button:nth-child(${getOptionIndex(correctAnswer)})`).style.backgroundColor = "green";
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('nextButton').style.display = 'block'; // Show the Next button
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function goBack() {
    showPage('topics'); // Navigate back to the Topics and Levels page
}

function showResults() {
    showPage('results');
    document.getElementById('resultSummary').innerText = `You answered ${score} out of ${questions[selectedTopic][selectedLevel].length} questions correctly.`;
    let percentage = (score / questions[selectedTopic][selectedLevel].length) * 100;
    document.getElementById('percentage').innerText = `Your score: ${percentage.toFixed(2)}%`;
}


function tryAgain() {
    score = 0;
    showPage('topics'); // Start over from the topic selection page
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function tryAgain() {
    shuffleArray(questions[selectedTopic][selectedLevel]);
    currentQuestion = 0;
    score = 0;
    showPage('topics');
}

function goHome() {
    score = 0;
    showPage('welcome'); // Go back to the welcome page
}

function getOptionIndex(option) {
    return option.charCodeAt(0) - 96; // Converts 'a' -> 1, 'b' -> 2, 'c' -> 3, 'd' -> 4
}
