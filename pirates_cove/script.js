
document.addEventListener("DOMContentLoaded", function() {
    const passcode = "bali"; // Set your static 6-digit code here

    document.getElementById('passcode-entry').addEventListener('input', function(e) {
        if (e.target.value.toLowerCase() === passcode) {
            document.getElementById('passcode-container').style.display = 'none';
        } else if (e.target.value.length == passcode.length) {
            document.getElementById('passcode-entry').style.color = 'salmon';
            document.getElementById('passcode-entry').style.textDecoration = 'line-through';
        } else {
            document.getElementById('passcode-entry').style.color = 'white';
            document.getElementById('passcode-entry').style.textDecoration = 'none';
        }
    });

    const startTime = new Date("2024-02-17T12:00:00+08:00"); // Kuala Lumpur time
    const startTimeString = startTime.toLocaleTimeString("en-MY", { hour: "numeric", minute: "2-digit" }) + " on " + startTime.toLocaleDateString("en-MY", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    document.getElementById("starttime-text").textContent = `EBGS will begin at ${startTimeString}.\r\n`;

    let countdownInterval;

    function updateCountdown() {
        const now = new Date();
        const timeLeft = startTime - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").style.display = "none";
            document.getElementById("quiz-container").style.display = "block";
            updateQuestion();
        } else {
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);

            // Leading zeros for hours, minutes, and seconds
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');

            // Format changed to HH:MM:SS
            document.getElementById("countdown-text").textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    }

    // Initially hide the quiz container and show the countdown
    document.getElementById("quiz-container").style.display = "none";
    updateCountdown(); // Run once immediately to avoid initial delay

    // Update the countdown every second
    countdownInterval = setInterval(updateCountdown, 1000);
});


// ----------------------------


// Rest of the quiz code (questions array, checkAnswer function, etc.) remains the same
const questions = [
    { question: "Regency: Mix rose syrup with milk, and take away an N.", answer: "Badung" },
    { question: "Town: When you're frying egg but the pan is too dry, just add ___.", answer: "Seminyak" },
    { question: "Location: The beach club of Toy Story’s most illustrious root vegetable.", answer: "Potato Head Beach Club" },
    { question: "Date: I already told you this. <Answer in the only acceptable date format.>", answer: "2024/03/15" },
    { question: "Time: (Idiom) The last moment or almost too late. <Answer in military time.>", answer: "2300" },
];

let currentQuestionIndex = 0;

document.getElementById('total-questions').textContent = questions.length;
updateQuestion();

function updateQuestion() {
    document.getElementById('question').textContent = questions[currentQuestionIndex].question;
    document.getElementById('current-question-number').textContent = currentQuestionIndex + 1;
    document.getElementById('answer').value = "";
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if(userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
            updateQuestion();
        } else {
            document.getElementById('quiz-container').innerHTML = "<div>You have answered all the questions correctly. Now bring the payload to me at the given time and location. I will wait near the sunken bar, wearing a bright floral shirt, sunglasses, and a khaki bucket hat.</div>";
        }
    } else {
        alert("Incorrect, please try again.");
    }
}
