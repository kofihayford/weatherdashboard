
$(document).ready(function () {

    //Declare a variable to store the searched city
    let city = "";
    let cityName;
    // variable declaration
    const kofisAPIkey = "1550e20e982ebfd203c3d9a82faf62a2"

    let prevCities = localStorage.getItem('cities')
    let searchCity = $("#search-city");
    let searchButton = $("#search-button");
    let clearButton = $("#clear-history");
    let currentCity = $("#current-city");
    let currentTemperature = $("#temperature");
    let currentHumidty = $("#humidity");
    let currentWSpeed = $("#wind-speed");
    let currentUvindex = $("#uv-index");
    let sCity = [...JSON.parse(prevCities)];
    let fiveDayForecast = $("#fiveDayForecastAll");
    let searchList = $(".list-group");

    // searches the city to see if it exists in the entries from the storage. Create function for click button
    searchButton.click(function (event) {
        event.preventDefault();
        if (searchCity.val() === "") {
            alert("Please enter a City");
            searchCity.focus();
            return;
        }
        let lat;
        let long;
        fiveDayForecast.empty()
        console.log('this is jquery: ', searchCity.val());
        //set searchCity to city to instruct system to insert the value typed and submitted by search button into the empty city string
        city = searchCity.val();
        console.log("console log 2: ", city);
        console.log("console log 3: ", searchCity.val())
        //use fetch to capture 
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${kofisAPIkey}`)
            .then((res) => {
                return res.json()
            }).then((json) => {
                lat = json[0].lat;
                long = json[0].lon;
                cityName = json[0].name;

                console.log(json)
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${kofisAPIkey}`)
                    .then((res) => {
                        //used console log to make sure that the data is being collected. Changed it to res.json to now actually send through to get data back. 
                        return res.json()
                    }).then((json) => {
                        insertWeatherData(cityName, json.current.temp, json.current.humidity, json.current.uvi, json.current.wind_speed);
                        futureForecast(json.daily);
                        captureSearch(cityName)
                    })
                    .catch((err) => {
                        //used catch to figure out the error that was happening. 
                        console.log(err)
                    })
            }).catch((err) => {
                console.log(err)
            })

    })


    function insertWeatherData(name, temp, hum, wind, uvi) {
        currentCity.empty()
        currentTemperature.empty();
        currentHumidty.empty();
        currentWSpeed.empty();
        currentUvindex.empty();
        currentCity.append(name);
        currentTemperature.append(temp);
        currentHumidty.append(hum);
        currentWSpeed.append(wind);
        currentUvindex.append(uvi);
    }

    function futureForecast(daily) {
        // sCity = [...JSON.parse(prevCities)];

        // console.log(daily, 'this is our daily')
        //save time from having to call multiple times using map feature. 

        daily.map((info, index) => {
            if (index < 5) {
                let currentDate = moment().add(index, 'days').calendar();
                let temp = `<div class="col-sm-2 bg-primary forecast text-white ml-2 mb-3 p-2 mt-2 rounded" >
            <p id="fDate0">${currentDate}</p>
            <p id="fImg0"></p>
            <p>Temp:<span id="fTemp0">${info.temp.day}</span></p>
            <p>Humidity:<span id="fHumidity0">${info.humidity}</span></p>
        </div>`
                console.log('this our temp: ', temp);
                fiveDayForecast.append(temp);
            }
        })
    }

    console.log(sCity, 'this is our cities');
    function captureSearch(city) {
        // sCity = [...JSON.parse(prevCities)];

        sCity.push(city);
        localStorage.setItem(`cities`, JSON.stringify(sCity))
    }


    if (sCity.length == 0) {
        localStorage.setItem(`cities`, JSON.stringify(['london']))
    }
    //USE if statement to capture the items that are coming through to local storage and have them display on the page in the right place. Save searches to local Storage and append them to a table.
    if (sCity.length !== 0) {
        sCity.map((index) => {
            console.log(index, 'this is our index')
            let temp = `
        <li>
        <div class="col-3 col-md m-1 bg-secondary">
        <br>
        <p>${index}</p>
        <br>
    </div>
    </li>`
            searchList.append(temp)
        })
    }

    // These saved items should be clickable and should then pull up current conditions for the appropriate city.

})


//Clear History button should reset all results including flushing local storage. 


