      
        
        var key = 0

        // For loop to go through saved local storage 
        for (var i = 0; i < localStorage.length; i++) {
        var city = localStorage.getItem(i);
        }

        // Weather forecast function
        function forecastWeather() {

        var weather = $("#weather-input").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + weather + "&appid=816992ff6a89882120cc71140b076bef&units=imperial";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(fResponse) {
            console.log(fResponse)
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body")
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text")
            fiveDayDiv.empty();
            day.forEach(function(i) {
                var FiveDayTimeUTC1 = new Date(fResponse.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-us")
                fiveDayDiv.append("<div class=fiveDayColor>" + "<h6>" + FiveDayTimeUTC1 + "</h6>" + `<img src="https://openweathermap.org/img/wn/${fResponse.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + fResponse.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + fResponse.list[i].main.humidity + "%" + "</p>" + "</div>" + "<hr>");
            });
        });
        }

        // Current Weather Function
        function displayWeather() {
        // Clears existing table
        $("#newTable").empty();
        // API Call for current weather
        var weather = $("#weather-input").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + weather + "&appid=816992ff6a89882120cc71140b076bef";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            var tBody = $("tbody");
            var tRow = $("<tr>");
            console.log(response)
            var name = $("<td>").text(response.name);
            var temp = response.main.temp
            var fTemp = $("<td>").text(Math.floor((response.main.temp - 273.15) *  1.8 + 32));
            var humidity = $("<td>").text(response.main.humidity +"%");
            var clouds = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + clouds + ".png"
            var weatherImage = $("<img>").attr("src", iconURL)
           
            // Calls Forecast function 
            forecastWeather();

            // Stores the city name in local storage
            var localCity = localStorage.setItem(key, response.name);
           
            // Appends saved city to the list
            var newEl = $("<li>").append(localStorage.getItem(key));
            newEl.addClass("saved")
            $("#savedCity").append(newEl)
            key ++; 
    
            // API Call for the UV index 
            var uvLat = response.coord.lat;
            var uvLon = response.coord.lon;
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + uvLat + "&lon=" + uvLon + "&appid=816992ff6a89882120cc71140b076bef";
            console.log(uvLat)
            console.log(uvLon)
                $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response) {
                    var uvIndex = $("<td>").text(response.value)
                    // Appends the current weather
                    tRow.append(name, fTemp, humidity, weatherImage, uvIndex);
                    tBody.prepend(tRow);
                });    
        });
        }

        // For Loop to append saved city
        for(var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        var newEl = $("<li>").append(localStorage.getItem(key));
        newEl.addClass("saved")
        $("#savedCity").append(newEl);
        }
        $(document).ready(function() {
        // On Click function to when saved city is clicked
        $(".saved").on("click", function() { 
            $("#newTable").empty()
            $(".fiveDayOne").empty()

           var weatherSaved = $(this).text();
           var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherSaved + "&appid=816992ff6a89882120cc71140b076bef&units=imperial"

            $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(savedResponse) {
            console.log(savedResponse);
            var tBody = $("tbody");
            var tRow = $("<tr>");
            var name = $("<td>").text(savedResponse.name);
            var temp = savedResponse.main.temp
            var fTemp = $("<td>").text(savedResponse.main.temp);
            var humidity = $("<td>").text(savedResponse.main.humidity +"%");
            var clouds = savedResponse.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + clouds + ".png"
            var weatherImage = $("<img>").attr("src", iconURL)
            key ++;

            var uvLat = savedResponse.coord.lat;
            var uvLon = savedResponse.coord.lon;
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + uvLat + "&lon=" + uvLon + "&appid=816992ff6a89882120cc71140b076bef";
            console.log(uvLat)
            console.log(uvLon)
                $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response) {
                    var uvIndex = $("<td>").text(response.value)
                    tRow.append(name, fTemp, humidity, weatherImage, uvIndex);
                    tBody.prepend(tRow);
                });

                
        var forecastSaved = weatherSaved;
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + forecastSaved + "&appid=816992ff6a89882120cc71140b076bef&units=imperial";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(fResponse) {
            console.log(fResponse)
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body")
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text")
            fiveDayDiv.empty();
            day.forEach(function(i) {
                var FiveDayTimeUTC1 = new Date(fResponse.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-us")
                fiveDayDiv.append("<div class=fiveDayColor>" + "<h6>" + FiveDayTimeUTC1 + "</h6>" + `<img src="https://openweathermap.org/img/wn/${fResponse.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + fResponse.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + fResponse.list[i].main.humidity + "%" + "</p>" + "</div>" + "<hr>");
            });
        });
        });
        });
        
        // Clear Button function clears input in text bar
        $("#button-addon3").on("click", function() {
            $("#weather-input").val("");
            });
        
        // Search button function calls both functions 
        $("#button-addon1").on("click", function() {
            displayWeather();
            forecastWeather();
            console.log("this worked")
        })

        // Clear Results button function clears table, input, saved results, and local storage
        $("#button-addon2").on("click", function() {
            $("#newTable").empty();
            $("#weather-input").val("");
            localStorage.clear();
            $("#savedCity").empty()
            $(".fiveDayOne").empty()
            });

        // When pressing (ENTER) - it calls both functions 
        onkeyup = enter;
        function enter(e) {if (e.which == 13) displayWeather();} 
        
        // When pressing (DELETE KEY) - it clears the input box
        onkeydown = remove;
        function remove(a) {if (a.which == 46) $("#weather-input").val("");}

        // This is the time and date function that shows up on the header
        function timeCheck() {
        var timeUTC = new Date();
        $("#date").append("Date" + " " + timeUTC.toLocaleDateString("en-US"))
        $("#time").append(timeUTC.toLocaleTimeString("en-US"));
        }
        timeCheck ();
    });