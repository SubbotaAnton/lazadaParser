$(function () {

    $.getJSON('http://localhost:8000/link/1', function (response) {
        console.log(response);
    })

});