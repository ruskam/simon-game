$(document).ready(function() {
    var simon = {
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
        simon.series = [];
        simon.answers = [];
        simon.stepCounter = 0;
        simon.isAnswerCorrect = true;
        simon.sessionInterval = setInterval(startGame, 500);
    });

    function startGame() {
        console.log("ITERATION: " + simon.stepCounter);
        console.log('random number is', simon.randomNumber);

        clearInterval(simon.sessionInterval);
        clearTimeout(simon.answerTimeout);
        clearAllIntervals();
        $('.quarter').removeClass('noselect');

        if (simon.isAnswerCorrect) {
            simon.randomNumber = getRandom();
            simon.series.push(simon.randomNumber);
            console.log('series#' + simon.stepCounter, simon.series);
            console.log('Now click to guess the number');
        } else {
            console.log('You seem to fail to repeat last sequence');
            console.log('series#' + simon.stepCounter, simon.series);
        }

        var clickCounter = 0;
        $('.quarter').off().click(function() {
            simon.guessed = parseInt($(this).data('number'));
            if (simon.guessed === simon.series[clickCounter]) {
                console.log('this time correct');
                console.log('clickCounter', clickCounter);
                console.log('simon.series.length', simon.series.length);
                if (clickCounter === simon.series.length - 1) {
                    console.log('all numbers are repeated correclty');
                    $('.quarter').addClass('noselect');
                    simon.answerTimeout = setTimeout(function() {
                        simon.isAnswerCorrect = true;
                        simon.stepCounter++;
                        simon.sessionInterval = setInterval(startGame, 1000);
                    }, 5000 + (simon.stepCounter * 1000));
                }
            } else {
                console.log('Wrong, you will given another chance');
                simon.answerTimeout = setTimeout(function() {
                    simon.isAnswerCorrect = false;
                    simon.sessionInterval = setInterval(startGame, 1000);
                }, 1000);
            }
            clickCounter++;
        });

    }

    function clearAllIntervals() {
        for (var i = 1; i < 99999; i++) {
            window.clearInterval(i);
        }
    }

    $('#strict-btn').click(function() {
        clearInterval(simon.sessionInterval);
        clearTimeout(simon.answerTimeout);
        console.log('should be stopped now');
    });

    function setupNewGame() {
        emptySequence();
        setCounterToZero();
    }

    function emptySequenceArray() {
        simon.series = [];
    }

    function setCounterToZero() {
        simon.stepCounter = 0;
    }

    function emptySequence() {
        simon.series = [];
    }

    function addNumberToSeries(number) {
        simon.series.push(getRandom());
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
            simon.deviceStatus = 'on';
        } else {
            $('#start-restart-btn').addClass('noselect');
            $('#strict-btn').addClass('noselect');
            //$('.quarter').addClass('noselect');
            simon.deviceStatus = 'off';
            clearInterval(simon.sessionInterval);
            clearTimeout(simon.answerTimeout);
            clearAllIntervals();
        }

    });


});