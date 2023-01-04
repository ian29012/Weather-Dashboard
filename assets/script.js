var API_KEY = "698f87042ad86cf6449b664a66cbd85d"

function render(searchCity){

    // refresh the page
    if ($("#today").children && $("#forecast").children ) {
        $("#today").empty();
        $("#forecast").empty();
    }

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&limit=5&appid=" + API_KEY

// request the live weather data form the website by ajax
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){

        var result = response.list[0]
        var currentDate = moment.unix(result .dt).format("MM-DD-YYYY")
        var windspeedC = result.wind.speed * 2.236936
        var weatherURL = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png"

        // city name + current day
        $("#today").append($('<p class="current" id="thedate">' + response.city.name + ' ( ' + currentDate + ' )</p>'))

        // weather icon
        $("#today").append($('<img class="current" id="icon">').attr("src", weatherURL))

        // temperature
        $("#today").append($('<p class="current" id="Temperature">Tempe : '+ result.main.temp.toFixed(1) + "°C" + '</p>'))

        // humidity
        $("#today").append($('<p class="current" id="humidity">Humidity ' + result.main.humidity + "%" + '</p>'))

        // windspeed
        $("#today").append($('<p class="current" id="windspeed">Wind <i class="fa-solid fa-wind"></i> : ' + windspeedC.toFixed(1) + " KPH" + '</p>'))

        // looping 5 day forecast
        for (var i = 8; i < 41; i+=7 ){

        var forecast = $("<div class='col-lg-1.8 forecastdiv'>")
        var resulti = response.list[i]
        var forecastDate = moment.unix(resulti .dt).format("MM-DD-YYYY")

        // city name + forecast
        forecast.append($('<p class="forecast" id="thedate">' + forecastDate + '</p>'))

        // weather icon
        var weatherIURL = "http://openweathermap.org/img/wn/" + resulti.weather[0].icon + "@2x.png"
        forecast.append($('<img class="forecast" id="icon" alt="Weather icon">').attr("src", weatherIURL))

        // temperature
        forecast.append($('<p class="forecast" id="Temperature">' + 'Tempe : ' + resulti.main.temp + "°C" + '</p>'))

        // humidity
        forecast.append($('<p class="forecast" id="humidity">' + 'Humidity : ' + resulti.main.humidity + "%" + '</p>'))

        // windspeed
        var windspeedF = resulti.wind.speed * 2.236936
        forecast.append($('<p class="forecast" id="windspeed">' + 'Wind : ' + windspeedF.toFixed(1) + " KPH" + '</p>'))

        // all item append to forecast Div
        $("#forecast").append(forecast)
        }

        // empty the input when you enter
        $('[name="inputvalue"]').val("");
    })

}

// storage the city data when you click the button
$("#search-button").on("click", function(event){
    event.preventDefault();

    // get the text from input
    var searchInput = $("#search-input").val().trim().toUpperCase()

    // get the local storage
    var storageCity = localStorage.getItem("storageCity")

    // transfer the array from local storage
    var historyCity = JSON.parse(storageCity) || []

    // filter the city which repeated
    historyCity = historyCity.filter(function (element) {
       return element !== searchInput;
    });

    // push the data to local storage 
    historyCity.push(searchInput)

    // set the key and transfer the local storage as string from array
    localStorage.setItem("storageCity", JSON.stringify(historyCity))
    
    //activate the function
    updateButton()
    render(searchInput)
})

// refresh button list when when you click the button
function updateButton(){

    // emtpy the button when add the new history
    $("#history").empty()
    
    // get the local storage and transfer the array from local storage
    var storageCity = JSON.parse(localStorage.getItem("storageCity"))

    // list the button to history by for loop
    for ( var i = 0; i < storageCity.length; i++ ) {
    $("#history").prepend($("<button class='historybutton' id='historybutton'>" + storageCity[i] + "</button>"))
    }
}

// display the weather when you click the history button
$("#history").on("click", function(event){
    event.preventDefault();
    
    // activate the functino render and use the parameter as the text inside the button
    render(event.target.innerHTML)

})
