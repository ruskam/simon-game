$(document).ready(function() {
    var simon = {
        deviceStatus: 'off',
        strictModeStatus: 'off',
        series: [],
        stepCounter: 0,
        isMusicPlayed: true,
        isAnswerGiven: true,
        sessionInterval: null,
        answerTimeout: null,
        isAnswerExpected: false
    };

    var i = 0;
    $('.quarter').click(function() {
        i++;
        console.log('clicked green');
        addNumberToSeries(i);
        //console.log(simon.series);
        if (simon.isMusicPlayed) {
            setTimeout(function() {
                if (!simon.isAnswerGiven) {
                    console.log('fail!');
                }
            }, 3000);
        }

    });

    $('#start-restart-btn').click(function() {

        simon.answerTimeout = setTimeout(function() {
            if (simon.isAnswerGiven) {
                console.log('answer given');
            } else {
                console.log('answer NOT given');
            }
        }, 2000);

        simon.sessionInterval = setInterval(function() {
            if (simon.isAnswerGiven) {
                console.log(simon.isAnswerGiven);
                startGame();
            }
        }, 5000);

    });

    $('#strict-btn').click(function() {
        simon.isAnswerGiven = false;
        console.log('should be stopped now');
    });

    function startGame() {
        console.log('game started');
        simon.stepCounter++;
        var randomNumber = getRandom();
        addNumberToSeries(randomNumber);
        console.log(simon.series);
    }

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
            $('.quarter').removeClass('noselect');
            simon.deviceStatus = 'on';
        } else {
            $('#start-restart-btn').addClass('noselect');
            $('#strict-btn').addClass('noselect');
            $('.quarter').addClass('noselect');
            simon.deviceStatus = 'off';
        }

    });


});