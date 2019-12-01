log = console.log
const request = require('request')
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaHN0YW5kYSIsImEiOiJjazNqOWVibGIwZ205M21uMXV3M2gwNmg4In0.2bhfaeWNAt_coIaTmlSx0Q'   

    request({url, json: true}, (geoError, {body}) =>{
        if(geoError){
            callback('API service not working !')
        } else if ( body.error ){
            callback(log(body.error))
        } else if(body.features.length == 0){
            callback('No location found !')
        }else{
            const features = body.features
            const longitude = features[0].center[0]
            const latitude = features[0].center[1]
            const place_name = features[0].place_name
            const data = {
                longitude,
                latitude,
                location: place_name
            }
            callback('', data)
        }
        })
}
module.exports = geocode