// jQuery ready method
$(document).ready(function() {

    // This creates the highscore item in local storage if it is not already there
    if (!localStorage.getItem("highscores")) {
        localStorage.setItem("highscores", JSON.stringify([]));
    }

    /* This array will contain all of the info for the question pages.
    Each page's info is stored as an object which has a "question" value,
    four values for the choices available as answers, and one value noting
    the correct choice. The correct choice is listed as a string value so
    that I can check whether the id of the button equals the "correct" string. */
    var questions = [
        // First Question
        {
            question: "Commonly used data types DO NOT include:",
            firstChoice: "1. Alerts",
            secondChoice: "2. Booleans",
            thirdChoice: "3. Strings",
            fourthChoice: "4. Numbers",
            correctChoice: "first"
        },

        // Second Question
        {
            question: "The condition in an if/else statement is enclosed within _____.",
            firstChoice: "1. Quotes",
            secondChoice: "2. Curly brackets",
            thirdChoice: "3. Square brackets",
            fourthChoice: "4. Parentheses",
            correctChoice: "fourth"
        },

        // Third Question
        {
            question: "Arrays in JavaScript can be used to store _____.",
            firstChoice: "1. Numbers and strings",
            secondChoice: "2. Other arrays",
            thirdChoice: "3. Booleans",
            fourthChoice: "4. All of the above",
            correctChoice: "fourth"
        },

        // Fourth Question
        {
            question: "String values must be enclosed within _____ when being assigned to variables.",
            firstChoice: "1. Commas",
            secondChoice: "2. Curly brackets",
            thirdChoice: "3. Quotes",
            fourthChoice: "4. Parentheses",
            correctChoice: "third"
        },

        // Fifth Question
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            firstChoice: "1. JavaScript",
            secondChoice: "2. console.log()",
            thirdChoice: "3. For loops",
            fourthChoice: "4. Terminal/Bash",
            correctChoice: "second"
        }
    ];

    // This variable will track the time remaining
    var timeRemaining = 0;

    // This variable tracks the index of the questions array
    var questionIndex = 0;

    // ===================================================================================
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
    // ===================================================================================

    // ===================================================================================
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
    // ===================================================================================

    // ===================================================================================
    function createQuestionPage() {
        // Unhides the home button
        $("#home-btn").removeClass("hide");

        // Unhides the highscores button
        $("#highscores-btn").removeClass("hide");

        // Assigns info to current question object
        var info = questions[questionIndex];

        // Changes header
        $("#header").text(info.question);

        // Empties content element
        $("#content").empty();

        // These set the appropriate choices
        $("#first").text(info.firstChoice);
        $("#second").text(info.secondChoice);
        $("#third").text(info.thirdChoice);
        $("#fourth").text(info.fourthChoice);
    }
    // ===================================================================================

    // ===================================================================================
    /* This function determines whether the clicked button
       is the correct answer. The "number" parameter should
       be a string equal to the button's id and should be
       passed by the click listener. Once it is determined
       whether or not number is equal to the correctChoice,
       text appears below the button group saying "correct"
       or "incorrect" */
    function determineCorrect(chosenNumber) {
        // Creates a paragraph element
        var responseText = $("<p>").addClass("response-text");

        // If the chosenNumber is the correctChoice, sets text to "Correct".
        if (chosenNumber === questions[questionIndex].correctChoice) {
            responseText.text("Correct");
        }
        // If the chosenNumber is not the correctChoice, sets text to "Incorrect".
        else {
            responseText.text("Incorrect");
        }

        // Adds the paragraph element to the content div
        $("#content").append(responseText);

        // Changes the questionIndex by 1
        questionIndex++;

        // Waits 1 second, then creates a new question page with new index
        setTimeout(createQuestionPage, 1000);
    }
    // ===================================================================================

    // ===================================================================================
    // This function resets to the home page
    function reset() {
        $("#time-remaining").text(timeRemaining);
        createHomePage();
    }
    // ===================================================================================

    // Sets up the initial page
    reset();

    // Click listener for the Home button
    $("#home-btn").click(function() {
        $(".btn-group-vertical").addClass("hide");
        createHomePage();
    });

    // Click listener for the highscores button
    $("#highscores-btn").click(function() {
        $(".btn-group-vertical").addClass("hide");
        createHighscorePage();
    });

    /* Click listener for the start button. The listener is actually
       assigned to the "content" div and is delegated to ".start-button".
       This ensures that we can dynamically create the start button
       without breaking the listener. */
    $("#content").click(".start-button", function() {
        $(".btn-group-vertical").removeClass("hide");
        createQuestionPage();
    });

    // Click listener for the button group which delegates to each button.
    $(".btn-group-vertical button").click(function() {
        var choice = $(this).attr("id");
        determineCorrect(choice);
    });
});