var API_KEY = "698f87042ad86cf6449b664a66cbd85d"
var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + "London" + "&limit=5&appid=" + API_KEY

console.log(queryURL) 

function test(){
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?lat=" + response[0].lat + "&lon=" + response[0].lon + "&units=metric&appid=" + API_KEY,
        method: "GET"
    }).then(function(response){
        $("#today").append($('<p class="current" id="thedate">' + moment().format("D MMM YYYY, HH:mm") + '</p>'))
        $("#today").append($('<p class="current" id="cityname">' + response.city.name + '</p>'))
        var weathericon = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png"
        $("#today").append($('<img class="current" id="icon">').attr("src", weathericon))
        $("#today").append($('<p class="current" id="Temperature">' + response.list[0].main.temp + "°C" + '</p>'))
        $("#today").append($('<p class="current" id="humidity">' + 'Humidity : ' + response.list[0].main.humidity + " %" + '</p>'))
        $("#today").append($('<p class="current" id="windspeed">' + 'Wins Speed : ' + response.list[0].wind.speed + " mph" + '</p>'))
        console.log(response);
    })

    console.log(response[0].lat);
    console.log(response[0].lon); 
})
}

test();