// API key and URL
var APIKey = "c3519b14c3a5370d3a0839d8194ee3fb";
// VARIABLE FOR SEARCH INPUT
$("body").append($("<input class=form-control type=text placeholder='Search city here' id=search-input>"));
var searchInput = '';
var cityInput = '';
var fiveDayInput = '';
// var cityInput = $(this).attr("#search-input");
var queryURL = 'https://api.openweathermap.org/response/2.5/weather?appid=c3519b14c3a5370d3a0839d8194ee3fb&q=';
var fiveDayURL = 'https://api.openweathermap.org/response/2.5/forecast?appid=c3519b14c3a5370d3a0839d8194ee3fb&q=';

//http://api.openweathermap.org/data/2.5/forecast?q= {CITY QUERY HERE} &appid= {API KEY HERE}

// on enter keypress, do this
$("input").on("keydown", function search(event) {
    if (event.keyCode == 13) {
        searchInput = ($(this).val());
        // cityInput = queryURL + searchInput;
        cityInput = `http://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${APIKey}`;
        $.ajax({
            url: cityInput,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // posts city, wind, humidity and temp in fahrenheit
            $(".city").html("<h1>" + response.city.name + " Weather Details</h1>");
            $(".icon").html(`<img class='m-auto' src='http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}.png'>`)
            $(".wind").text("Wind Speed: " + response.list[0].wind.speed);
            $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
            var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
            $(".temp").text("Temperature (F) " + parseInt(tempF) + "°F");

            var forecastDisplay = $('.forecast');
            forecastDisplay.html("");
            for (var i = 4; i < 37; i += 8) {
                var div = $('<div class="w-full text-center border border-red-500">');

                // day - description icon - temp F - humidity
                var day = $('<div class="">');
                var icon = $('<img class="m-auto">');
                var temp = $('<div>');
                var humidity = $('<div>');

                day.text(moment(response.list[i].dt_txt).format('l'));
                day.attr('style', 'font-weight:bolder;');
                icon.attr('src', 'http://openweathermap.org/img/wn/' + response.list[i].weather[0].icon + '.png');
                var forTemp = ((response.list[i].main.temp - 273.15) * 1.80 + 32);
                temp.text('Temp: ' + forTemp.toFixed(2) + '°F');
                humidity.text("Humidity: " + response.list[i].main.humidity + "%")

                div.append(day, icon, temp, humidity);
                forecastDisplay.append(div);
            }
        })
    }
});
