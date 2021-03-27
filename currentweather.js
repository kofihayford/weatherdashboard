const key = "BIeUy48ueRxIJSGJAxmUNi7Y8stJrK3Z"

//Bringing in the current conditions URL 
const currentWeather = async (keyid) => {
    const weatherLink = "http://dataservice.accuweather.com/currentconditions/v1/"
    const makeQuery = `${keyid}?apikey=${key}`;

    const response = await fetch(weatherLink + makeQuery);
    const weatherData = await response.json();

    return weatherData()
};

// Create a function to execute the API and search for the city
const citySearch = async (city) => {

    // Creating a variable for the link to the search function 
    const centralLink = "http://dataservice.accuweather.com/locations/v1/cities/search";

    // Addiing Makequery parameter to the end of the URL
    const makeQuery = `?apikey=${key}&q=${city}`;

    const response = await fetch(centralLink + makeQuery);
    const cityData = await response.json();

    return cityData[0];

};
// Call the City Search Function
citySearch('London')
    .then(weatherData => {
        //Returns a promise 
        return currentWeather(weatherData.key);
    }).then(weatherData => {
        console.log(weatherData);
        //Use Catch to capture any errors or mistakes
    }).catch(err => console.log(err))


currentWeather("328328")