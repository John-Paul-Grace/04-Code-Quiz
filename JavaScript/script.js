$(document).ready(function() {

    // This creates the highscore item in local storage if it is not already there
    if (!localStorage.getItem("highscores")) {
        localStorage.setItem("highscores", JSON.stringify([]));
    }

    /* This array will contain all of the info for the question pages.
    Each page's info is stored as an object which has a "question" value,
    four values for the choices available as answers,
    and one value noting the correct choice. */
    var questions = [
        // First Question
        {
            question: "Commonly used data types DO NOT include:",
            firstChoice: "1. Alerts",
            secondChoice: "2. Booleans",
            thirdChoice: "3. Strings",
            fourthChoice: "4. Numbers",
            correct: 1
        },

        // Second Question
        {
            question: "The condition in an if/else statement is enclosed within _____.",
            firstChoice: "1. Quotes",
            secondChoice: "2. Curly brackets",
            thirdChoice: "3. Square brackets",
            fourthChoice: "4. Parentheses",
            correct: 4
        },

        // Third Question
        {
            question: "Arrays in JavaScript can be used to store _____.",
            firstChoice: "1. Numbers and strings",
            secondChoice: "2. Other arrays",
            thirdChoice: "3. Booleans",
            fourthChoice: "4. All of the above",
            correct: 4
        },

        // Fourth Question
        {
            question: "String values must be enclosed within _____ when being assigned to variables.",
            firstChoice: "1. Commas",
            secondChoice: "2. Curly brackets",
            thirdChoice: "3. Quotes",
            fourthChoice: "4. Parentheses",
            correct: 3
        },

        // Fifth Question
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            firstChoice: "1. JavaScript",
            secondChoice: "2. console.log()",
            thirdChoice: "3. For loops",
            fourthChoice: "4. Terminal/Bash",
            correct: 2
        }
    ];

    // This variable will track the time remaining.
    var timeRemaining = 0;

    // Creates the page that shows the title, description, and start button
    function createHomePage() {
        // Hides the home button
        $("#home-btn").addClass("hide");

        // Unhides the highscores button
        $("#highscores-btn").removeClass("hide");

        // Changes header
        $("#header").text("Coding Quiz Challenge");

        // Empties content element
        $("#content").empty();

        // Creates paragraph element
        var introParagraph = $("<p>").addClass("intro-paragraph");

        // Adds text to paragraph element
        introParagraph.text("Try to answer the following code-related question within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!");

        // Creates start button element
        var startButton = $("<button>").addClass("start-button");

        // Adds text to start button element
        startButton.text("Start");

        // Appends both elements to the content div
        $("#content").append(introParagraph);
        $("#content").append(startButton);
    }

    // Creates the highscore page with a table of top five highscores
    function createHighscorePage() {
        // Hides the highscores button
        $("#highscores-btn").addClass("hide");

        // Unhides the home button
        $("#home-btn").removeClass("hide");

        // Changes header
        $("#header").text("Highscores");

        // Empties content element
        $("#content").empty();
    }

    // This creates the intro page as soon as the website is launched
    createHomePage();

    // Click listener for the Home button
    $("#home-btn").click(function() {
        createHomePage();
    });

    // Click listener for the highscores button
    $("#highscores-btn").click(function() {
        createHighscorePage();
    });
});