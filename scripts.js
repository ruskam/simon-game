$(document).ready(function() {
    var sg = {
        deviceStatus: 'off',
        strictModeStatus: 'off',
        series: [],
        answers: [],
        stepCounter: 0,
        isMusicPlayed: true,
        isAnswerCorrect: true,
        sessionInterval: null,
        answerTimeout: null,
        isAnswerExpected: false,
        guessed: 0,
        randomNumber: 0
    };

    $('#start-restart-btn').click(function() {
        sg.series = [];
        sg.answers = [];
        sg.stepCounter = 0;
        sg.isAnswerCorrect = true;
        sg.sessionInterval = setInterval(startGame, 1000);
    });

    function startGame() {
        console.log("ITERATION: " + sg.stepCounter);

        clearInterval(sg.sessionInterval);
        clearTimeout(sg.answerTimeout);

        sg.answers = [];
        if (sg.isAnswerCorrect) {
            $('.quarter').removeClass('noselect');
            sg.randomNumber = getRandom();
            sg.series.push(sg.randomNumber);
            console.log('series' + sg.stepCounter, sg.series);
        }
        console.log('Now click to guess the number');

        var clickCounter = 0;

        $('.quarter').off().click(function() {
            console.log('clicked');
            sg.guessed = $(this).data('number');
            //sg.answers.splice(clickCounter, 0, sg.guessed);
            sg.answers.push(sg.guessed);
            console.log(sg.answers);

        //clickCounter++;
        });

        sg.answerTimeout = setTimeout(function() {

            if (noErrors(sg.series, sg.answers)) {
                console.log('answer correct', sg.answers);
                clearInterval(sg.sessionInterval);
                sg.isAnswerCorrect = true;
                sg.stepCounter++;
                sg.sessionInterval = setInterval(startGame, 1000);
            } else {
                console.log('answer NOT correct');
                clearInterval(sg.sessionInterval);
                sg.isAnswerCorrect = false;
                sg.sessionInterval = setInterval(startGame, 1000);
            }

            clearTimeout(sg.answerTimeout);
        }, 5000 + (sg.stepCounter * 1000));

        console.log("--------------------");
    }

    function noErrors(questions, responses) {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i] !== responses[i]) {
                return false;
            }
        }
        return true;
    }

    function clearAllIntervals() {
        for (var i = 1; i < 99999; i++) {
            window.clearInterval(i);
        }
    }

    $('#strict-btn').click(function() {
        clearInterval(sg.sessionInterval);
        clearTimeout(sg.answerTimeout);
        console.log('should be stopped now');
    });

    function setupNewGame() {
        emptySequence();
        setCounterToZero();
    }

    function emptySequenceArray() {
        sg.series = [];
    }

    function setCounterToZero() {
        sg.stepCounter = 0;
    }

    function emptySequence() {
        sg.series = [];
    }

    function addNumberToSeries(number) {
        sg.series.push(getRandom());
    }

    function getRandom() {
        const min = 1;
        const max = 5;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /** Switch On the game */
    $('.switch input').click(function() {

        if ($('.switch input').is(':checked')) {
            $('#start-restart-btn').removeClass('noselect');
            $('#strict-btn').removeClass('noselect');
            //$('.quarter').removeClass('noselect');
            sg.deviceStatus = 'on';
        } else {
            $('#start-restart-btn').addClass('noselect');
            $('#strict-btn').addClass('noselect');
            //$('.quarter').addClass('noselect');
            sg.deviceStatus = 'off';
            clearInterval(sg.sessionInterval);
            clearTimeout(sg.answerTimeout);
        }

    });


});