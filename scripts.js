$(document).ready(function () {
    var simon = {
        deviceStatus: 'off',
        gameStatus: 'off',
        strictModeStatus: 'off',
        series: [],
        stepCounter: 0
    };

    var i = 0;
    $('.quarter').click(function () {
        i++;
        //console.log('clicked green');
        addNumberToSeries(i);
        console.log(simon.series);
    });


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
            simon.gameStatus = 'on';
        } else {
            $('#start-restart-btn quarter').addClass('noselect');
            $('.quarter').removeClass('noselect');
            simon.gameStatus = 'off';
        }
        console.log(simon.gameStatus);

    });

    $('#start-restart-btn').click(function () {
        console.log('clicked');
    });

});