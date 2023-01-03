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

        $("#today").append($('<p class="current" id="thedate">' + response.city.name + ' ( ' + moment.unix(response.list[0].dt).format("MM-DD-YYYY") + ' )</p>'))
        var weathericon = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png"
        $("#today").append($('<img class="current" id="icon">').attr("src", weathericon))
        $("#today").append($('<p class="current" id="Temperature">' + response.list[0].main.temp.toFixed(1) + "°C" + '</p>'))
        $("#today").append($('<p class="current" id="humidity">' + 'Humidity : ' + response.list[0].main.humidity + " %" + '</p>'))
        var windspeed = response.list[0].wind.speed * 2.236936
        $("#today").append($('<p class="current" id="windspeed">' + 'Wind Speed : ' + windspeed.toFixed(1) + " mph" + '</p>'))
        console.log(response);

        for (var i = 8; i < 41; i+=7 ){

        var forecast = $("<div class='col-lg-1.8 forecast'>")
        forecast.append($('<p class="forecast" id="thedate">' + moment.unix(response.list[i].dt).format("MM-DD-YYYY") + '</p>'))
        var weathericon = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png"
        forecast.append($('<img class="forecast" id="icon">').attr("src", weathericon))
        forecast.append($('<p class="forecast" id="Temperature">' + response.list[i].main.temp + "°C" + '</p>'))
        forecast.append($('<p class="forecast" id="humidity">' + 'Humidity : ' + response.list[i].main.humidity + " %" + '</p>'))

        $("#forecast").append(forecast)
console.log(i)
        }
//     }
        $("#history").prepend($("<button class='historybutton' id='historybutton'>" + searchCity + "</button>"))
        $('[name="inputvalue"]').val("");
    })

}

$("#search-button").on("click", function(event){
    event.preventDefault();
    
    var searchInput = $("#search-input").val().trim()

    render(searchInput)
    historyfive()
})

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

historyfive()