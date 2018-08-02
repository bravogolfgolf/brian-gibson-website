$(document).ready(function () {
    getWeather();
});

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitudeRounded = round(position.coords.latitude);
            var longitudeRounded = round(position.coords.longitude);
            var url =
                "https://fcc-weather-api.glitch.me/api/current?lat=" +
                latitudeRounded +
                "&lon=" +
                longitudeRounded;

            $.getJSON(url, function(json) {
                var current = json.main.temp;
                var maximum = json.main.temp_max;
                var minimum = json.main.temp_min;
                var currentFormattedFahrenheit = round(convertToFahrenheit(current));
                var maximumFormattedFahrenheit = round(convertToFahrenheit(maximum));
                var minimumFormattedFahrenheit = round(convertToFahrenheit(minimum));
                var currentFormattedCelsius = round(current);
                var maximumFormattedCelsius = round(maximum);
                var minimumFormattedCelsius = round(minimum);

                var icon = json.weather[0].icon;

                var description = json.weather[0].description;

                var openTagHide = "<span class='hide'>";
                var openTagShow = "<span>";
                var closeTag = "</span>";

                var html = "";
                html += '<img src="' + icon + '" alt="Description">';
                html += "<p>Current temperature is ";
                html += openTagHide;
                html += currentFormattedCelsius;
                html += closeTag;
                html += openTagShow;
                html += currentFormattedFahrenheit;
                html += closeTag;
                html += " with ";
                html += description;
                html += ". The expected high is ";
                html += openTagHide;
                html += maximumFormattedCelsius;
                html += closeTag;
                html += openTagShow;
                html += maximumFormattedFahrenheit;
                html += closeTag;
                html += " and the expected low is ";
                html += openTagHide;
                html += minimumFormattedCelsius;
                html += closeTag;
                html += openTagShow;
                html += minimumFormattedFahrenheit;
                html += closeTag;
                html += ".</p>";
                $(".data").html(html);
            });
        });
    }
}

function round(number) {
    return Math.round(number);
}

function convertToFahrenheit(celsius) {
    var conversionFactor = 9 / 5;
    var conversionConstant = 32;
    return celsius * conversionFactor + conversionConstant;
}

var degreesInFahrenheit = true;

function toggleFahrenheitCelsius() {
    degreesInFahrenheit = !degreesInFahrenheit;
    toggleFahrenheitCelsiusButton();
    toggleFahrenheitCelsiusValues();
}

function toggleFahrenheitCelsiusButton() {
    document.getElementById("button").innerHTML = degreesInFahrenheit ? "℉" : "℃";
}

function toggleFahrenheitCelsiusValues() {
    var list = document.getElementsByTagName("span");
    for (var i = 0; i < list.length; i++) {
        list[i].classList.toggle("hide");
    }
}
