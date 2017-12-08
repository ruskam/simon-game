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
        waitingTimeout: null,
        isAnswerExpected: false,
        guessed: 0,
        randomNumber: 0
    };

    $('#start-restart-btn').click(function() {
        $('#info-display').text('---');
        simon.series = [];
        simon.answers = [];
        simon.stepCounter = 0;
        simon.isAnswerCorrect = true;
        $('.quarter').removeClass('noselect');
        simon.sessionInterval = setInterval(startGame, 500);
    });

    function startGame() {

        console.log("ITERATION: " + simon.stepCounter);
        $('#info-display').text(simon.stepCounter + 1);
        //console.log('random number is', simon.randomNumber);

        clearInterval(simon.sessionInterval);
        clearTimeout(simon.answerTimeout);
        clearAllIntervals();

        if (simon.isAnswerCorrect) {
            simon.randomNumber = getRandom();
            simon.series.push(simon.randomNumber);
            console.log('series#' + simon.stepCounter, simon.series);
            console.log('Now click to guess the number');
        } else {
            console.log('You seem to fail to repeat last sequence');
            console.log('series#' + simon.stepCounter, simon.series);
        }

        playSounds();

        $('.quarter').removeClass('noselect');

        var clickCounter = 0;
        $('.quarter').off().click(function() {

            clickCounter++;
            simon.guessed = parseInt($(this).data('number'));
            if (simon.guessed === simon.series[clickCounter - 1]) {
                playSound('sound' + $(this).data('number'));
                highlightArea($(this).data('number'));
                //console.log('this time correct');
                //console.log('clickCounter', clickCounter);
                //console.log('simon.series.length', simon.series.length);
                if (clickCounter === simon.series.length) {
                    console.log('all numbers are repeated correctly');
                    $('.quarter').addClass('noselect');
                    simon.answerTimeout = setTimeout(function() {
                        simon.isAnswerCorrect = true;
                        simon.stepCounter++;
                        simon.sessionInterval = setInterval(startGame, 500);
                    //}, 5000 + (simon.stepCounter * 1000));
                    }, 2000);
                }
            } else {
                playSound('fail');
                console.log('Wrong, you will be given another chance');
                $('.quarter').addClass('noselect');
                simon.answerTimeout = setTimeout(function() {
                    simon.isAnswerCorrect = false;
                    simon.sessionInterval = setInterval(startGame, 1000);
                }, 1000);
            }
        //console.log('balance', clickCounter, simon.series.length);
        });

        setTimeout(function() {
            if (clickCounter === 0 || clickCounter < simon.series.length) {
                playSound('fail');
                simon.waitingTimeout = setTimeout(function() {
                    clearTimeout(simon.answerTimeout);
                    clearAllIntervals();
                    console.log('You were given', (5000 + (simon.stepCounter * 1000)) / 1000 + ' seconds');
                    simon.isAnswerCorrect = false;
                    simon.sessionInterval = setInterval(startGame, 1000);
                }, 1);
            }
        }, 5000 + (simon.stepCounter * 1000));
    }

    function playSounds() {
        for (var i = 0; i < simon.series.length; i++) {
            (function(index) {
                setTimeout(function() {
                    playSound('sound' + simon.series[index]);
                    highlightArea(simon.series[index]);

                //console.log(index, simon.series[index]);
                }, i * 1000);
            })(i);
        }
    }

    function playSound(soundId) {
        var sound = document.getElementById(soundId);
        sound.play();
    }

    function highlightArea(id) {
        $('#' + id).addClass('quarter' + id + '-light');
        setTimeout(function() {
            $('#' + id).removeClass('quarter' + id + '-light');
        }, 300);
    }

    function clearAllIntervals() {
        for (var i = 1; i < 99999; i++) {
            window.clearInterval(i);
            window.clearTimeout(i);
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
            $('#info-display').text('---');
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
            $('#info-display').text('');
        }

    });


});