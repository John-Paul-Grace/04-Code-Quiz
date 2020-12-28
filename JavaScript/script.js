// jQuery ready method
$(document).ready(function() {

    /* This creates the highscore item in local storage if it is
       not already there. It also adds five generic data points. */
    if (!localStorage.getItem("highscores")) {
        localStorage.setItem("highscores", JSON.stringify([{name: "ABC", score: 0},
                                                           {name: "ABC", score: 0},
                                                           {name: "ABC", score: 0},
                                                           {name: "ABC", score: 0},
                                                           {name: "ABC", score: 0}]));
    }

    // Sets the highscores local storage data to a global variable
    var highscores = JSON.parse(localStorage.getItem("highscores"));

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

    // ===================================================================================
    // This section is for establishing global variables
    // This variable will track the time remaining
    var timeRemaining = questions.length * 15;

    // This variable tracks the index of the questions array
    var questionIndex = -1;

    /* This will be assigned to a timeout later and will need to be
       accesible from multiple methods, so it's instanced here to
       give it global scope. */
    var nextQuestionTimeout = "";

    /* This will be the interval that counts down the timer. It is
       instanced here to give it global scope. */
    var timerInterval = "";

    // Assigns the commonly used elements to variables, so the computer doesn't need to grab them every time.
    var timer = $("#time-remaining").text(timeRemaining);
    var btnGroup = $(".btn-group-vertical");
    var homeBtn = $("#home-btn");
    var highscoresBtn = $("#highscores-btn");
    var contentEl = $("#content");
    // ===================================================================================

    // ===================================================================================
    // Creates the page that shows the title, description, and start button
    function createHomePage() {
        // Ensures that the choices are hidden
        btnGroup.addClass("hide");

        // Hides the home button
        homeBtn.addClass("hide");

        // Unhides the highscores button
        highscoresBtn.removeClass("hide");

        // Changes header
        $("#header").text("Coding Quiz Challenge");

        // Empties content element
        contentEl.empty();

        // Creates paragraph element
        var introParagraph = $("<p>").addClass("intro-paragraph");

        // Adds text to paragraph element
        introParagraph.text("Try to answer the following code-related question within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!");

        // Creates start button element
        var startButton = $("<button>").addClass("start-button");

        // Adds text to start button element
        startButton.text("Start");

        // Appends both elements to the content div
        contentEl.append(introParagraph);
        contentEl.append(startButton);
    }
    // ===================================================================================

    // ===================================================================================
    // Creates the highscore page with a table of top five highscores
    function createHighscorePage() {
        // Ensures that the choices are hidden
        btnGroup.addClass("hide");

        // Hides the highscores button
        highscoresBtn.addClass("hide");

        // Unhides the home button
        homeBtn.removeClass("hide");

        // Changes header
        $("#header").text("Highscores");

        // Empties content element
        contentEl.empty();

        // Creates a table
        var table = $("<table>");

        // Creates a row for headers
        var tableHeaders = $("<tr>");

        // Creates headings for the table
        var nameHeader = $("<th>").text("Name");
        var scoreHeader = $("<th>").text("Score");

        // Appends headers to tableHeaders
        tableHeaders.append(nameHeader);
        tableHeaders.append(scoreHeader);

        // Appends tableHeaders to table
        table.append(tableHeaders);

        // Creates an array of rows for table data
        var tableData = [$("<tr>"), $("<tr>"), $("<tr>"), $("<tr>"), $("<tr>")];

        /* A for loop that creates and appends data to each row. Each data tag
           will contain an entry from the highscores. Then, each row will be
           appended to the table. */
        for (var i = 0; i < tableData.length; i++) {
            // Grabs the current row
            var row = tableData[i];

            // Grabs the highscore data
            var highscoreName = highscores[i].name;
            var highscoreScore = highscores[i].score;
            
            // Creates data tags with the highscore data
            var nameData = $("<td>").text(highscoreName);
            var scoreData = $("<td>").text(highscoreScore);

            // Appends data tags to row
            row.append(nameData);
            row.append(scoreData);

            // Appends row to table
            table.append(row);
        }

        // Appends table to contentEl
        contentEl.append(table);
    }
    // ===================================================================================

    // ===================================================================================
    function createQuestionPage() {
        // This ensures that the timeout will not run multiple times for multiple clicks
        clearTimeout(nextQuestionTimeout);

        // Changes the questionIndex by 1
        questionIndex++;

        // Unhides the home button
        homeBtn.removeClass("hide");

        // Unhides the highscores button
        highscoresBtn.removeClass("hide");

        // Assigns info to current question object
        var info = questions[questionIndex];

        // Changes header
        $("#header").text(info.question);

        // Empties content element
        contentEl.empty();

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
            timeRemaining -= 10;
            timer.text(timeRemaining);
            responseText.text("Incorrect");
        }

        // Adds the paragraph element to the content div
        contentEl.append(responseText);

        // Waits 1 second, then creates a new question page
        nextQuestionTimeout = setTimeout(createQuestionPage, 1000);
    }
    // ===================================================================================

    // ===================================================================================
    // This function resets the timer and questionIndex
    function reset() {
        // Stops the clock
        clearInterval(timerInterval);

        // Resets the timeRemaining
        timeRemaining = questions.length * 15;

        // Sets the timer
        timer.text(timeRemaining);

        // Resets the questionIndex
        questionIndex = -1;
    }
    // ===================================================================================

    // ===================================================================================
    /* This function counts down the timeRemaining variable. If time runs
       out, it runs the gameOver() method. */
    function countdown() {
        // timeRemaining is incremented down
        timeRemaining --;

        // If time runs out, runs gameOver()
        if (timeRemaining <= 0) {
            gameOver();
        }

        // Updates the timer element
        timer.text(timeRemaining);
    }
    // ===================================================================================

    // ===================================================================================
    /* This function should run at the end of the game. It may be called if
       time runs out, or if all questions are answered. It will check if the
       time qualifies for a highscore. If it does, the player will be asked
       to input their initials. The initials and score will be added to the
       highscores data in the local storage. Then, the player will brought
       to the highscores page.*/
    function gameOver() {
        // Clears the timeout to ensure a new question page isn't created
        clearTimeout(nextQuestionTimeout);

        // Stops the clock
        clearInterval(timerInterval);

        // Grabs the highscores data from local storage
        var lowestHighscore = highscores[highscores.length - 1].score;

        if (timeRemaining >= lowestHighscore) {
            var initials = prompt("Enter your initials.");
            highscores.push({name: initials, score: timeRemaining});
            localStorage.setItem("highscores", JSON.stringify(highscores));
        }

        // Creates the highscore page
        createHighscorePage();
    }
    // ===================================================================================

    // ===================================================================================
    // Click listener for the Home button
    homeBtn.click(function() {
        // Resets the game
        reset();

        // Creates the home page
        createHomePage();
    });
    // ===================================================================================

    // ===================================================================================
    // Click listener for the highscores button
    highscoresBtn.click(function() {
        // Resets the game
        reset();

        // Creates the highscores page
        createHighscorePage();
    });
    // ===================================================================================

    // ===================================================================================
    /* Click listener for the start button. The listener is actually
       assigned to the "content" div and is delegated to ".start-button".
       This ensures that we can dynamically create the start button
       without breaking the listener. */
    contentEl.delegate(".start-button", "click", function() {
        // Shows the previously hidden choices
        btnGroup.removeClass("hide");

        // Starts the timer clock
        timerInterval = setInterval(countdown, 1000);

        // Creates the first question page
        createQuestionPage();
    });
    // ===================================================================================

    // ===================================================================================
    // Click listener for the button group which delegates to each button.
    $(".btn-group-vertical button").click(function() {
        // Assigns the button's id to the "choice" variable
        var choice = $(this).attr("id");

        // Determines whether the choice is correct or not
        determineCorrect(choice);
    });
    // ===================================================================================

    // Sets the time-remaining element to display the timeRemaining
    timer.text(timeRemaining);

    // Creates the home page
    createHomePage();
});