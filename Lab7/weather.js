// todo
// make request to the weather api url
// process the response and get the weather for each day
// make a new table row, and use the data to fill the content for
// each table data

// name of day
// temperature
// icon
// detailed forecast

let weatherUrl = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast'

let weatherDataTable = document.querySelector('#weather-forecast')

// fetch -  makes a request to url, returns a promise
// a successful call means that we have data, and the promise 'resolved'
// the then function takes a callback function as an argument
// the callback function takes a callback function (function definition) as an argument.
// we can proccess the initial response in that callback function
fetch(weatherUrl).then( function( response) {
    return response.json() // convert the response from bytes into JSON
    // return that JSON.
}).then( function( actualJsonData) { // ... has to be handled in another then call
    // has a callback that is called once the data has been converted into JSON
    // that out program can use
    // has to be handled in another then
    // console.log(actualJsonData)

    let propertiesObject = actualJsonData.properties
    // console.log(propertiesObject)

    let periodsArray = propertiesObject.periods
    console.log(periodsArray)

    periodsArray.forEach( function(oneForecastPeriodObject) {
        let timeForForecast = oneForecastPeriodObject.name
        // read temperature from the object in the response
        let temperature = oneForecastPeriodObject.temperature
        let iconUrl = oneForecastPeriodObject.icon
        let detailedForecast = oneForecastPeriodObject.detailedForecast

        let newTableRow = document.createElement('tr')
        // new td element created
        let timeTableData = document.createElement('td')
        // setting innerhtml to timeforforecast string
        timeTableData.innerHTML = timeForForecast

        let temperatureTableData = document.createElement('td')
        temperatureTableData.innerHTML = temperature

        let iconTableData = document.createElement('td')
        let iconImage = document.createElement('img')
        iconImage.src = iconUrl
        iconTableData.appendChild(iconImage)

        let detailedForecastTableData = document.createElement('td')
        detailedForecastTableData.textContent = detailedForecast

        // add new td elements to the newtablerow
        newTableRow.appendChild(timeTableData)
        newTableRow.appendChild(temperatureTableData)
        newTableRow.appendChild(iconTableData)
        newTableRow.appendChild(detailedForecastTableData)

        // add newtablerow to the table #weatherforecast -- need to put new variable for this
        weatherDataTable.appendChild(newTableRow)

    })
})
    .catch(error => console.error('Error fetching weather data:', error))
