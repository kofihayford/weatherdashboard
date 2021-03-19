const key = "BIeUy48ueRxIJSGJAxmUNi7Y8stJrK3Z"

// Create a function to execute the API and search for the city
const citySearch = async (city) => {

    // Creating a variable for the link to the search function 
    const centralLink = "http://dataservice.accuweather.com/locations/v1/cities/search";

    // Addiing Makequery parameter to the end of the URL
    const makeQuery = `?apikey=${key}&q=${city}`;

    const response = await fetch(centralLink + makeQuery);
    const weatherData = await response.json();

    console.log(weatherData);

};
//Call the City Search Function
citySearch('London')


