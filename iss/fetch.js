let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let update = 10000
let maxFailedAttempts = 3

let issMarker
let icon = L.icon({
    iconUrl: 'iss_icon.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25] // decides what point of the icon will be at the actual spot on map
})

let map = L.map('iss-map').setView([0,0], 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // leaflet uses url to make a request to put the images on for you.
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

iss(maxFailedAttempts) // call function once to start
// putting iss as a function saves a lot of time because now you can write it like this and preform the whole function.
function iss(attempts) {

    if (attempts <= 0 ) {
        alert('Failed to contact ISS server after several attempts.')
        return
    }

    fetch(url).then( res => res.json() )// this processes responce into JSON)
    .then( (issData) => { // .then means if promise is accepted it uns this
            console.log(issData) // TODO display data on web page
            let lat = issData.latitude
            let long = issData.longitude
            issLat.innerHTML = lat
            issLong.innerHTML = long

            // create marker
            // move marker if does exist

            if (!issMarker) {
                // create marker
                issMarker = L.marker([lat, long], {icon: icon} ).addTo(map)
            } else {
                issMarker.setLatLng([lat, long])
            }

            let now = Date()
            timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`

        }).catch( (err) => { // otherwise, if promise is rejected, it runs this
            attempts = attempts - 1 // subtracts 1 frm attempts each time
            console.log('ERROR!', err)
        }).finally( () => {
            setTimeout(iss, update, attempts)
    })
}


