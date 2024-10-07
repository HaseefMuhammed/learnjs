// Constants
const totalLectures = 321;
const weeklyGoal = 40;
const motivationalWords = [
    "You're on fire! 🔥",
    "Keep going, you're unstoppable! 🚀",
    "You're mastering JavaScript like a pro! 💻",
    "Almost there, keep it up! 💪",
    "You're a coding champion! 🏆"
];

// Variables
let completedLectures = 0;
let points = 0;
let badge = "None";
let timerInterval;
let timeLeft = 30 * 60; // 30 minutes in seconds

// Load progress from localStorage
window.onload = function() {
    if (localStorage.getItem('completedLectures')) {
        completedLectures = parseInt(localStorage.getItem('completedLectures'));
        points = parseInt(localStorage.getItem('points'));
        badge = localStorage.getItem('badge');

        updateProgressUI();
    }
}

// Function to update progress
function updateProgress() {
    let lecturesCompleted = parseInt(document.getElementById('lecturesCompleted').value);

    if (isNaN(lecturesCompleted) || lecturesCompleted <= 0) {
        alert("Please enter a valid number of completed lectures.");
        return;
    }

    completedLectures += lecturesCompleted;
    if (completedLectures > totalLectures) completedLectures = totalLectures;

    // Save progress to localStorage
    localStorage.setItem('completedLectures', completedLectures);
    localStorage.setItem('points', points + lecturesCompleted);

    // Calculate progress
    let progressPercentage = (completedLectures / totalLectures) * 100;
    let progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progressPercentage + "%";
    progressBar.setAttribute("aria-valuenow", progressPercentage);
    progressBar.innerHTML = Math.round(progressPercentage) + "%";

    // Update points and badge
    points += lecturesCompleted;
    document.getElementById('points').innerHTML = points;

    updateBadge();
    showMotivation();

    // Save updated points and badge to localStorage
    localStorage.setItem('points', points);
    localStorage.setItem('badge', badge);
}

// Function to update badge
function updateBadge() {
    let badgeImage = document.getElementById('badge-image');
    let badgeText = document.getElementById('badge-text');

    if (completedLectures >= 250) {
        badge = "JavaScript Master";
        badgeImage.src = "images/master.png"; // Master Badge Image
    } else if (completedLectures >= 150) {
        badge = "Advanced";
        badgeImage.src = "images/advanced.png"; // Advanced Badge Image
    } else if (completedLectures >= 50) {
        badge = "Intermediate";
        badgeImage.src = "images/intermediate.png"; // Intermediate Badge Image
    } else {
        badge = "Beginner";
        badgeImage.src = "images/beginner.png"; // Beginner Badge Image
    }

    badgeText.innerHTML = badge;

    // Save the badge status to localStorage
    localStorage.setItem('badge', badge);
}

// Function to show motivation every 5 lectures
function showMotivation() {
    if (completedLectures % 5 === 0) {
        let motivation = motivationalWords[Math.floor(Math.random() * motivationalWords.length)];
        let motivationElement = document.getElementById('motivation');
        motivationElement.innerHTML = motivation;
        motivationElement.style.opacity = "1"; // Show the motivation with fade-in effect
    }
}

// Function to update UI with saved progress
function updateProgressUI() {
    // Calculate progress percentage
    let progressPercentage = (completedLectures / totalLectures) * 100;
    let progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progressPercentage + "%";
    progressBar.setAttribute("aria-valuenow", progressPercentage);
    progressBar.innerHTML = Math.round(progressPercentage) + "%";

    // Update points, badge, and motivation
    document.getElementById('points').innerHTML = points;
    document.getElementById('badge-text').innerHTML = badge;

    let badgeImage = document.getElementById('badge-image');
    if (badge === "JavaScript Master") {
        badgeImage.src = "images/master.png";
    } else if (badge === "Advanced") {
        badgeImage.src = "images/advanced.png";
    } else if (badge === "Intermediate") {
        badgeImage.src = "images/intermediate.png";
    } else if (badge === "Beginner") {
        badgeImage.src = "images/beginner.png";
    }
}

// Function to start the 30-minute challenge
function startChallenge() {
    document.getElementById('start-timer').disabled = true;
    document.getElementById('stop-timer').disabled = false;

    timerInterval = setInterval(updateTimer, 1000);
}

// Function to stop the challenge timer
function stopChallenge() {
    clearInterval(timerInterval);
    document.getElementById('start-timer').disabled = false;
    document.getElementById('stop-timer').disabled = true;
    document.getElementById('timer').innerHTML = "";
    timeLeft = 30 * 60; // Reset timer
}

// Function to update the timer
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById('timer').innerHTML = `${minutes}m ${seconds}s remaining`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').innerHTML = "Challenge Over!";
        document.getElementById('start-timer').disabled = false;
        document.getElementById('stop-timer').disabled = true;
    }
    timeLeft--;
}
