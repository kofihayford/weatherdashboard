//Createa a variable to store the user's entry into the search input box as an empty string. Will refer to it later
let inputCity = "";

//Declare the standard variabless
const searchCity = $("#citySearch");
const searchButton = $("#searchButton");
const currentCity = $("#currentCity");
const currentTemp = $("#temperature");
const currentHumidity = $("#humidity");
const currentWindSpeed = $("#windSpeed");
const currentUvIndex = $("uvIndex");
const clearHistoryBtn = $("#clearHistory");
const cityName = [];

//create a function to check the city name to ensure it matches an entry in the Accuweather database  
function search(location) {
    for (var i = 0; i < location.length; i++) {
        if (location.toUpperCase() === location[i]) {
            return -1;
        }
    }
    return 1;
}

//create a variable to store the API key 
const key = "BIeUy48ueRxIJSGJAxmUNi7Y8stJrK3Z"
