$(document).ready(function () {
    var simon = {
        deviceStatus: 'off',
        gameStatus: 'off',
        strictModeStatus: 'off',
        series: []
    };


    var i = 0;
    $('.quarter1').click(function () {
        i++;
        //console.log('clicked green');
        //addNumberToSeries(i);
        //console.log(simon.series);
    });


    function addNumberToSeries(number) {
        simon.series.push(number);
    }

    function getRandom(min, max) {
        var rMin = Math.ceil(min); //round to int greather
        var rMax = Math.floor(max); //round to int lesse than specified number
        var random = Math;
        console.log(random);
        return random;
    }

    /** Switch On the game */
    $('.switch input').click(function () {

        if ($('.switch input').is(':checked')) {
            $('#start-restart-btn').removeClass('noselect');
            simon.gameStatus = 'on';
        } else {
            $('#start-restart-btn').addClass('noselect');
            simon.gameStatus = 'off';
        }
        console.log(simon.gameStatus);

    });

    $('#start-restart-btn').click(function () {
        console.log('clicked');
    });

});