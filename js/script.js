let searchButton = document.querySelector("#search-btn")
let searchCity = "perth" // this will change later, it's perth for testing purposes
const apiKey = "56eeec31f54f0e69895a4257692aa2f4"
const wthrURL = "https://api.openweathermap.org/data/2.5/"

// single object to populate the html elements
let city = {
    date: moment().format("D/M/YY"),
    temp: 0,
    wind: 0,
    humidity: 0,
    uv: 0,
    // iterate over this array and the daily property of "weather" to populate with 5 elements(i=4)
    forecast: [
        {
            temp: 0,
            wind: 0,
            humidity: 0,
            uv: 0
        },
        {
            temp: 0,
            wind: 0,
            humidity: 0,
            uv: 0
        },
        {
            temp: 0,
            wind: 0,
            humidity: 0,
            uv: 0
        },
        {
            temp: 0,
            wind: 0,
            humidity: 0,
            uv: 0
        },
        {
            temp: 0,
            wind: 0,
            humidity: 0,
            uv: 0
        }
    ]
}

// object to select dashboard elements on the html
let dashboard = {
    date: document.querySelector("#date"),
    title: document.querySelector("#dashboard-title"), // name of city
    temp: document.querySelector("#dash-temp"),
    wind: document.querySelector("#dash-wind"),
    humidity: document.querySelector("#dash-humidity"),
    uv: document.querySelector("#dash-uv")
}

// get the searched city from the input box
function getCity(){

    let city = document.querySelector("#search-field").value;
    return city;

}

// request coordinates from api, to do second fetch request
function getCoordinates(){

    //searchCity should be passed in, to make search work
    fetch(`${wthrURL}weather?q=${searchCity}&appid=${apiKey}`) 

    // get the information as a json object
    .then((response) => response.json())

    // access the information from the js object
    // perhaps calling getWeather in here will help with some asynch issues
    // given that this block will execute once the promise is resolved
    // and seeing that i keep trying to access things not yet defined (after this is resolved)
    // i may want to access them after i have received this information in the first place
    // AKA not trying to access data not given by this function
    .then((weather) => {
        // store latitude and longitude to later inject in second fetch request
        // co.lat = weather.coord.lat
        // co.lon = weather.coord.lon
        getWeather(weather.coord.lat, weather.coord.lon)
    })
}

// request weather information to be displayed on the elements
// then store JSON string into local storage (must parse object for use)
function getWeather(lat, lon){

    fetch(`${wthrURL}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)

    // get the information as a json object
    .then((response) => response.json())

    // access the information from the js object
    .then((weather) => {
        // read data into my object from returned values
        console.log(weather)
        city.temp = weather.current.temp
        city.wind = weather.current.wind_speed
        city.humidity = weather.current.humidity
        city.uv = weather.current.uvi
        for(let i = 0; i < 5; i++){
            city.forecast[i].temp = weather.daily[i].temp.day
            city.forecast[i].wind = weather.daily[i].wind_speed
            city.forecast[i].humidity = weather.daily[i].humidity
            city.forecast[i].uv = weather.daily[i].uvi
        }
        localStorage.setItem("City", JSON.stringify(city))
    })
    .then(() => {
        
        // my assumptions on top were correct
        // i need to chain this so i can properly access the valid data received after the promise is resolved
        // write general functions to insert relevant DOM elements
        // and display relevant information to the user.
        // these general insertion functions will be invoked here
        let storedString = localStorage.getItem("City")

        let storedCity = JSON.parse(storedString)

        console.log("stored object",storedCity)
        console.log("stored string",storedString)
    })

    //this will display the relevant information to the DOM
    // dashboard.date.textContent = storedCity.date
    // dashboard.temp.textContent = storedCity.temp
    // dashboard.wind.textContent = storedCity.wind
    // dashboard.humidity.textContent = storedCity.humidity
    // dashboard.uv.textContent = storedCity.uv
}

getCoordinates();


// on 5-day forecast
        // Date
        // icon
        // temp
        // wind
        // humidity
// append objects as elements to html