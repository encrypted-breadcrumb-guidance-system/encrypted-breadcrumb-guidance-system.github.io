
document.addEventListener("DOMContentLoaded", function() {
    const passcode = "432256"; // Set your static 6-digit code here

    document.getElementById('passcode-entry').addEventListener('input', function(e) {
        if (e.target.value === passcode) {
            document.getElementById('passcode-container').style.display = 'none';
        } else if (e.target.value.length == passcode.length) {
            document.getElementById('passcode-entry').style.color = 'salmon';
            document.getElementById('passcode-entry').style.textDecoration = 'line-through';
        } else {
            document.getElementById('passcode-entry').style.color = 'white';
            document.getElementById('passcode-entry').style.textDecoration = 'none';
        }
    });

    const startTime = new Date("2024-02-17T11:00:00+08:00"); // Kuala Lumpur time
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
    { question: "Cafe 36 + Cafe 52 = ?", answer: "Cafe 88" },
    { question: "The legendary civilization, swallowed by the sea.", answer: "Atlantis" },
    { question: "What do you call the section below the Girdle of an ideal cut diamond?", answer: "Pavilion" },
    { question: 'The first and last characters of "客人来看爸爸, 爸爸不在家"', answer: "Hakka" },
    { question: "What lies between a London Scone and a Lisbon Egg Tart?", answer: "Paris Baguette" },
    { question: "His work in Vatican City is perhaps the most famous ceiling of all.", answer: "Michelangelo" },
    { question: "Let your nose lead you a percentage of the way.", answer: "ARABICA" },
    { question: "What would You do for love?", answer: "DIOR" },
    { question: "A pile of luminous plasma held together by self-gravity.", answer: "STARHILL" },
    { question: "What is the name of the rabbit with no face?", answer: "Nini" },
    { question: "(No Googling) In Arthur Conan Doyle's \"The Adventure of The Copper Beeches\", what was Miss Hunter's eventual salary in pounds?", answer: "120" },
    { question: "(C × 9/5) + 32", answer: "fahrenheit" },
    { question: "A Lot of gourmands gather 10 feet underground.", answer: "Lot 10" },
    { question: "Complete the sentence from the lyrics of Don Quijote's iconic earworm: \"I'm in paradise, it's a ___!\"", answer: "wonderful place for me" },
    { question: "Proclaimed seven times.", answer: "Merdeka" },
    { question: "(No Googling) What year was the Rukun Negara created?", answer: "1970" },
    { question: "Ben Stiller had a great evening here.", answer: "Muzium" },
    { question: "Few Malaysian artists have created a larger mosaic than him.", answer: "CHEONG LAI THONG" },
    { question: "Park Sir Doctor Is Male", answer: "Taman Tun Dr Ismail" },
    { question: "Up the stairs, the secret location behind the storage space.", answer: "Locker & Loft" }
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
            document.getElementById('quiz-container').innerHTML = "<div>Congratulations, you've arrived at the target location! Please enter and order the secret off-menu special (ask for our bird of choice).</div>";
        }
    } else {
        alert("Incorrect, please try again.");
    }
}
