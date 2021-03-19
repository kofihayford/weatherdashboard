const key = "BIeUy48ueRxIJSGJAxmUNi7Y8stJrK3Z"

// Create a function to execute the API
const citySearch = async () => {

    // Creating a variable for the link to the search function 
    const centalLink = "http://dataservice.accuweather.com/locations/v1/cities/search";

    // Addiing query parameter to the end of the URL
    const query = `?apikey=${key}&q${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    console.log(data);

};

citySearch()
