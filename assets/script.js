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

        // get the city name + current day data and append to #today
        $("#today").append($('<p class="current" id="thedate">' + response.city.name + ' <i class="fa-solid fa-earth-asia"></i> ( ' + currentDate + ' )</p>'))

        // get the weather icon data and append to #today
        $("#today").append($('<img class="current" id="icon">').attr("src", weatherURL))

        // get the temperature data and append to #today
        $("#today").append($('<p class="current" id="Temperature">Tempe : '+ result.main.temp.toFixed(1) + "°C" + ' <i class="fa-solid fa-temperature-half"></i></p>'))

        // get the humidity data and append to #today
        $("#today").append($('<p class="current" id="humidity">Humidity : ' + result.main.humidity + "%" + ' <i class="fa-solid fa-water"></i></p>'))

        // get the windspeed data and append to #today
        $("#today").append($('<p class="current" id="windspeed">Wind : ' + windspeedC.toFixed(1) + " KPH" + ' <i class="fa-solid fa-wind"></i></p>'))

        // looping 5 day forecast
        for (var i = 8; i < 41; i+=7 ){

        var forecast = $("<div class='col-lg-1.8 forecastdiv'>")
        var resulti = response.list[i]
        var forecastDate = moment.unix(resulti .dt).format("MM-DD-YYYY")

        // get the day data and append to forecastDiv
        forecast.append($('<p class="forecast" id="thedate">' + forecastDate + ' <i class="fa-solid fa-calendar-days"></i></p>'))

        // get the weather icon and append to forecastDiv
        var weatherIURL = "http://openweathermap.org/img/wn/" + resulti.weather[0].icon + "@2x.png"
        forecast.append($('<img class="forecast" id="icon" alt="Weather icon">').attr("src", weatherIURL))

        // get the temperature and append to forecastDiv
        forecast.append($('<p class="forecast" id="Temperature">' + 'Tempe : ' + resulti.main.temp + "°C" + '</p>'))

        // get the humidity and append to forecastDiv
        forecast.append($('<p class="forecast" id="humidity">' + 'Humidity : ' + resulti.main.humidity + "%" + '</p>'))

        // get the windspeed and append to forecastDiv
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

    // get the text from input and make a capital letter
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
    if (storageCity) {
    for ( var i = 0; i < storageCity.length; i++ ) {
    $("#history").prepend($("<button class='historybutton' id='historybutton'>" + storageCity[i] + "</button>"))
    }}
}

// display the weather when you click the history button
$("#history").on("click", function(event){
    event.preventDefault();
    
    // activate the functino render and use the parameter as the text inside the button
    render(event.target.innerHTML)

})

updateButton()

// default page will be london if you don't have use before
function openPage(){

    if ($("#historybutton")[0]){
      var page = $("#historybutton")[0].innerHTML
      render(page)
    } else {
      render("London")
    }
    }

openPage()
