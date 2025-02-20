var quizData = [
    { question: "1.  It is use to align the box.", options: ["Flex Sizing", "Flexbox", "Flex Layout", "Flex Direction"], correct: "Flexbox", type: "mcq" },
    { question: "2. It is the process of creating products or services that provide meaningful experiences for users.", options: ["For shinking and Growing the box", "For Pricing the table", "For Making the shape and  size", "For Align, Justify and wrap it self"], correct: "For shinking and Growing the box", type: "mcq" },
    { question: "3. In what type of Flexbox you can find the row & column layouts.", options: ["Flex Sizing", "Flex Direction", "Project", "Flex Direction"], correct: "Flex Direction", type: "mcq" },
    { question: "4. the process of creating products or services that provide meaningful experiences for users, involving many different areas of product development including branding, usability, function, and design.", options: ["User Experience Design", "Typography", "User Interface Design", "Color Theory"], correct: "User Experience Design", type: "mcq" },
    { question: "5. The ______ defines how flex items should shrink compared to other items", options: ["Flex-Shrink", "Flex-grow", "Flexible box", "Flex Direction"], correct: "Flex-Shrink", type: "mcq" },
    { question: "6. It allows ou to create flexible and responsive layouts.", correct: ["flexbox", "Flexbox"], type: "numeration" },
    { question: "7. Make it simple! For the sake of both you and your user, as sometimes the more complicated a website.", correct: ["Simplicity", "simplicity"], type: "numeration" },
    { question: "8. In what type of Flexbox can you find the row & column layouts?", correct: ["Flex Direction", "flex direction"], type: "numeration" },
    { question: "9. The arrangement of visual elements on the screen.", correct: ["Layout", "layout"], type: "numeration" },
    { question: "10. What is used to align the box?", correct: ["flexbox", "Flexbox"], type: "numeration" }
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
            window.location.href = "lesson1.html";
        };
    } else {
        resultEl.textContent = score + " / " + quizData.length;
        resultEl.style.color = "black";
        resultFi.textContent = "You Passed!";
        resultFi.style.color = "green";
        finalButton.style.display = "none";
        finalButton2.style.display = "block";

        finalButton2.onclick = function() {
            window.location.href = "learn_2.html";
        };
    }

    document.querySelector(".quiz-container").appendChild(finalButton);
}

loadQuestion();
