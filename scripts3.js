var quizData = [
    { question: "1. The arrangement of  visual elements on the screen.", options: ["Flexbox", "CSS grid", "Display", "Grid"], correct: "CSS grid", type: "mcq" },
    { question: "2. It is the process of creating a products or services that provide meaningful experiences for users.", options: ["Gap", "Column-gap", "Grid", "Grid-template-column"], correct: "Grid-template-column", type: "mcq" },
    { question: "3. This is the art and science of creating the right palette for your website.", options: ["Flexbox", "Display", "User Interface", "CSS grid "], correct: "User Interface", type: "mcq" },
    { question: "4. It is the one that responsible for a product's appearance, interactivity, usability, behavior, and over all fell", options: ["Display", "CSS grid", "Display:grid;", "Grid"], correct: "Display:grid;", type: "mcq" },
    { question: "5. The art and technique of arranging typo to make a written language legitable, readable and appealing when displayed.", options: ["Flex Direction", "Flexbox", "Flex-grow", "Grid"], correct: "Flex Direction", type: "mcq" },
    { question: "6. What does Color Theory influence?", correct: ["Mood", "mood"], type: "numeration" },
    { question: "7. What is the focus of Typography?", correct: ["Readability", "readability"], type: "numeration" },
    { question: "8. What is the main goal of UX Design?", correct: ["Experience", "experience"], type: "numeration" },
    { question: "9. What does UI Design improve?", correct: ["Usability", "usability"], type: "numeration" },
    { question: "10.What should web designers always consider?", correct: ["Ethics", "ethics"], type: "numeration" }
];


var currentQuestion = 0;
var score = 0;

var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var numerationInput = document.getElementById("numerationInput");
var submitNumerationBtn = document.getElementById("submitNumeration");
var resultEl = document.getElementById("result");
var nextButton = document.getElementById("next");
var finalButton = document.getElementById("final");
var finalButton2 = document.getElementById("final2");
var resultFi = document.getElementById("resultFinal");

function loadQuestion() {
    var questionData = quizData[currentQuestion];
    questionEl.textContent = questionData.question;
    answersEl.innerHTML = "";
    numerationInput.style.display = "none";
    submitNumerationBtn.style.display = "none";

    if (questionData.type === "mcq") {
        questionData.options.forEach(function(option) {
            var button = document.createElement("button");
            button.textContent = option;
            button.onclick = function() { checkAnswer(option); };
            button.dataset.selected = false;
            answersEl.appendChild(button);
        });
    } else {
        numerationInput.style.display = "block";
        submitNumerationBtn.style.display = "block";
        submitNumerationBtn.onclick = function() { checkNumerationAnswer(); };
    }
}

function checkAnswer(selected) {
    if (document.querySelector(".selected")) return; // Prevent changing choice
    var correct = quizData[currentQuestion].correct;

    document.querySelectorAll(".answers button").forEach(function(btn) {
        if (btn.textContent === selected) {
            btn.classList.add("selected"); 
            btn.style.backgroundColor = "white"; 
            btn.style.color = "black";
            btn.style.border = "black solid 2px";

            if (selected === correct) {
                score++;
                resultEl.textContent = "Correct!";
                resultEl.style.color = "green";
            } else {
                resultEl.textContent = "Wrong! The correct answer is " + correct + ".";
                resultEl.style.color = "red";
            }
        }
    });

    nextButton.style.display = "block";
}

function checkNumerationAnswer() {
    var userAnswer = numerationInput.value.trim().toLowerCase();
    var correctAnswers = quizData[currentQuestion].correct;

    if (!Array.isArray(correctAnswers)) {
        correctAnswers = [correctAnswers];
    }

    var normalizedAnswers = correctAnswers.map(function(answer) { return answer.toLowerCase(); });

    if (normalizedAnswers.includes(userAnswer)) {
        score++;
        resultEl.textContent = "Correct!";
        resultEl.style.color = "green";
    } else {
        resultEl.textContent = "Wrong! The correct answer is: " + correctAnswers.join(" or ");
        resultEl.style.color = "red";
    }

    nextButton.style.display = "block";
}

nextButton.onclick = function() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        resultEl.textContent = "";
        nextButton.style.display = "none";
        numerationInput.value = "";
        loadQuestion();
    } else {
        showFinalResult();
    }
};

function showFinalResult() {
    questionEl.textContent = "You completed the quiz!";
    answersEl.innerHTML = "";
    numerationInput.style.display = "none";
    submitNumerationBtn.style.display = "none";
    
    nextButton.style.display = "none";
    finalButton.style.display = "block";

    if (score <= 5) {
        resultEl.textContent = score + " / " + quizData.length;
        resultFi.textContent = "You didn't reach the passing score";
        resultEl.style.color = "black";
        resultFi.style.color = "red";
        finalButton.onclick = function() {
            window.location.href = "lesson2.html";
        };
    } else {
        resultEl.textContent = score + " / " + quizData.length;
        resultEl.style.color = "black";
        resultFi.textContent = "You Passed!";
        resultFi.style.color = "green";
        finalButton.style.display = "none";
        finalButton2.style.display = "block";

        finalButton2.onclick = function() {
            window.location.href = "learn_4.html";
        };
    }

    document.querySelector(".quiz-container").appendChild(finalButton);
}

loadQuestion();
