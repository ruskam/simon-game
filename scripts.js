$(document).ready(function () {
    var simon = {
        deviceStatus: 'off',
        gameStatus: 'off',
        strictModeStatus: 'off',
        series: [],
        stepCounter: 0,
        isMusicPlayed: false,
        isAnswerGiven: false
    };

    var i = 0;
    $('.quarter').click(function () {
        i++;
        //console.log('clicked green');
        addNumberToSeries(i);
        //console.log(simon.series);
        if (simon.isMusicPlayed) {
            setTimeout(function () {
                if (!simon.isAnswerGiven) {
                    console.log('fail!');
                }
            }, 3000);
        }

    });

    function startGame() {

    }

    function setupNewGame() {
        emptySequence();
        setCounterToZero();
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
    $('.switch input').click(function () {

        if ($('.switch input').is(':checked')) {
            $('#start-restart-btn').removeClass('noselect');
            $('.quarter').removeClass('noselect');
            simon.deviceStatus = 'on';
        } else {
            $('#start-restart-btn quarter').addClass('noselect');
            $('.quarter').removeClass('noselect');
            simon.deviceStatus = 'off';
        }
        console.log('device status is ', simon.gameStatus);

    });

    $('#start-restart-btn').click(function () {
        if (simon.gameStatus === 'off') {
            simon.gameStatus = 'on';
        } else {
            simon.gameStatus = 'off';
        }
        simon.isMusicPlayed = true;
        console.log('game is ', simon.gameStatus);
    });

});