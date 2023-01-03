var API_KEY = "698f87042ad86cf6449b664a66cbd85d"

$("#search-button").on("click", function(event){
    event.preventDefault();

    if ($("#today").children) {
        $("#today").empty();
    }
    
    var searchCity = $("#search-input").val().trim()
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&limit=5&appid=" + API_KEY
    console.log(queryURL) 

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){

        $("#today").append($('<p class="current" id="thedate">' + response.city.name + ' ( ' + moment.unix(response.list[0].dt).format("D MMM YYYY") + ' )</p>'))
        var weathericon = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png"
        $("#today").append($('<img class="current" id="icon">').attr("src", weathericon))
        $("#today").append($('<p class="current" id="Temperature">' + response.list[0].main.temp + "°C" + '</p>'))
        $("#today").append($('<p class="current" id="humidity">' + 'Humidity : ' + response.list[0].main.humidity + " %" + '</p>'))
        console.log(response);
    })

    $('[name="inputvalue"]').val("");

    $("#history").text("hi")
})

