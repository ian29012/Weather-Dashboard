var API_KEY = "698f87042ad86cf6449b664a66cbd85d"

function render(searchCity){

    if ($("#today").children) {
        $("#today").empty();
    }

    if ($("#forecast").children) {
        $("#forecast").empty();
    }

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&limit=5&appid=" + API_KEY
    console.log(queryURL) 

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){

        var result = response.list[0]
        var currentDate = moment.unix(result .dt).format("MM-DD-YYYY")
        var windspeedC = result.wind.speed * 2.236936
        var weatherURL = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png"

        // city name + current day //
        $("#today").append($('<p class="current" id="thedate">' + response.city.name + ' ( ' + currentDate + ' )</p>'))

        // weather icon //
        $("#today").append($('<img class="current" id="icon">').attr("src", weatherURL))

        // temperature //
        $("#today").append($('<p class="current" id="Temperature">Tempe : '+ result.main.temp.toFixed(1) + "°C" + '</p>'))

        // humidity //
        $("#today").append($('<p class="current" id="humidity">Humidity ' + result.main.humidity + "%" + '</p>'))

        // windspeed //
        $("#today").append($('<p class="current" id="windspeed">Wind <i class="fa-solid fa-wind"></i> : ' + windspeedC.toFixed(1) + " KPH" + '</p>'))

        // looping 5 day forecast //
        for (var i = 8; i < 41; i+=7 ){

        var forecast = $("<div class='col-lg-1.8 forecastdiv'>")
        var resulti = response.list[i]
        var forecastDate = moment.unix(resulti .dt).format("MM-DD-YYYY")

        // city name + forecast //
        forecast.append($('<p class="forecast" id="thedate">' + forecastDate + '</p>'))

        // weather icon //
        var weathericon = "http://openweathermap.org/img/wn/" + resulti.weather[0].icon + "@2x.png"
        forecast.append($('<img class="forecast" id="icon" alt="Weather icon">').attr("src", weathericon))

        // temperature //
        forecast.append($('<p class="forecast" id="Temperature">' + 'Tempe : ' + resulti.main.temp + "°C" + '</p>'))
        // humidity //
        forecast.append($('<p class="forecast" id="humidity">' + 'Humidity : ' + resulti.main.humidity + "%" + '</p>'))
        var windspeedF = resulti.wind.speed * 2.236936
        // windspeed //
        forecast.append($('<p class="forecast" id="windspeed">' + 'Wind : ' + windspeedF.toFixed(1) + " KPH" + '</p>'))

        $("#forecast").append(forecast)
        console.log(i)
        }

        $('[name="inputvalue"]').val("");
    })

}

$("#search-button").on("click", function(event){
    event.preventDefault();

    var searchInput = $("#search-input").val().trim()
    var storageCity = localStorage.getItem("storageCity")
    var historyCity = JSON.parse(storageCity) || []

    historyCity.push(searchInput)

    localStorage.setItem("storageCity", JSON.stringify(historyCity))
    
    updateButton()
    render(searchInput)
    historyfive()
})

function updateButton(){

    $("#history").empty()

    var storageCity = JSON.parse(localStorage.getItem("storageCity"))
    console.log(storageCity)
    for ( var i = 0; i < storageCity.length; i++ ) {
    $("#history").prepend($("<button class='historybutton' id='historybutton'>" + storageCity[i] + "</button>"))
    }
}

$("#history").on("click", function(event){
    event.preventDefault();

    render(event.target.innerHTML)
    historyfive()

})

function historyfive(){

    if($("button")[5]){
    $("button")[5].remove()
    }
}

updateButton()
historyfive()