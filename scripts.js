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
        sg.answers = [];
        sg.series = [];
        sg.sessionInterval = setInterval(startGame, 1000);
    });

    function startGame() {

        if (sg.isAnswerCorrect) {
            sg.stepCounter++;
            sg.randomNumber = getRandom();
            sg.series.push(sg.randomNumber);
            console.log(sg.series);
        }
        console.log('Now click to guess the number');
        clearInterval(sg.sessionInterval);

        var clickCounter = 0;
        $('.quarter').click(function() {
            clickCounter++;
            if (clickCounter < sg.stepCounter) {

                $('.quarter').removeClass('noselect');

                console.log('Clicked');
                sg.guessed = $(this).data('number');
                sg.answers.push(sg.quesssed);
                console.log(sg.guessed);
            }
        });
        console.log('setInterval():', sg.sessionInterval);
        sg.answerTimeout = setTimeout(function() {

            if (hasErrors(sg.series, sg.answers)) {
                console.log('answer correct, we increase time');
                clearInterval(sg.sessionInterval);
                sg.isAnswerCorrect = true;
                sg.stepCounter++;
                sg.sessionInterval = setInterval(startGame, 1000);
            } else {
                console.log('answer NOT correct, counter proceed');
                clearInterval(sg.sessionInterval);

                sg.isAnswerCorrect = false;
                sg.sessionInterval = setInterval(startGame, 1000);
            }
        }, 5000);
    }

    function hasErrors(questions, responses) {
        var containsError = false;
        for (var i = 0; i < questions.length; i++) {
            if (questions[i] !== responses[i]) {
                return containsError;
            }
        }
        return true;
    }

    $('#strict-btn').click(function() {
        clearInterval(sg.sessionInterval);
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
        }

    });


});