let searchButton = document.querySelector("#search-btn")
let searchCity = "perth" // this will change later, it's perth for testing purposes
const apiKey = "56eeec31f54f0e69895a4257692aa2f4"
const wthrURL = "https://api.openweathermap.org/data/2.5/"
let currentDate = moment().format("D, M, YY") // get the current date

console.log("date from moment: ", currentDate) // logs as day, month, year

// single object to populate the html elements
let city = {
    date: "",
    coordinates: {
        lat: 0,
        lon: 0
    },
    temp: 0,
    wind: 0,
    humidity: 0,
    uv: 0
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
    .then((weather) => {
        // console.log(weatherData)
        localStorage.setItem("Lat", weather.coord.lat)
        localStorage.setItem("Lon", weather.coord.lon)
    })

    // retrieve coordinates from localStorage, store into city object
    city.coordinates.lat = localStorage.getItem("Lat")
    city.coordinates.lon = localStorage.getItem("Lon")

    // remove temporary coordinates from storage to free up space
    localStorage.removeItem("Lat")
    localStorage.removeItem("Lon")
}

// request weather information to be displayed on the elements
function getWeather(){

    fetch(`${wthrURL}onecall?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}&units=metric&appid=${apiKey}`)

    // get the information as a json object
    .then((response) => response.json())

    // access the information from the js object
    .then((weather) => {
        console.log("second fetch data:", weather)
        
    })

    // this is how i will read the information back into this environment
    // city.coordinates.lat = localStorage.getItem("Lat")
    // city.coordinates.lon = localStorage.getItem("Lon")
}


// this clears whatever memory is there
// only call after values read from weatherData are properly read
// localStorage.clear()

// console.log(coordinates)

getCoordinates();

getWeather();

console.log(city)

// get one call request with lat and lon
// create relevant objects based on needed info
    // on dashboard
        // temp
        // icon
        // wind
        // humidity
        // uv index
    // on 5-day forecast
        // Date
        // icon
        // temp
        // wind
        // humidity
// append objects as elements to html