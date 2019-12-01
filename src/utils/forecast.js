log = console.log
const request = require('request')
const forecast = (longitude, latitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/aaeb1d7c058aaa506e2141718bcac060/'+longitude+','+ latitude+'?units=si'

    request({url, json: true}, (error, {body}) =>{
        if(error){ 
            callback('Darksky API service not working !')
        } else if (body.error){
           callback(body.error);
        }else{
            const currently = body.currently;
            const daily = body.daily;
            const temperatureHigh = daily.data[0].temperatureHigh
            const temperatureLow = daily.data[0].temperatureLow
            const data = {
                temperature: currently.temperature,
                rainchanses: currently.precipProbability,
                summary: daily.data[0].summary,
                forecast: 'It is currently '+ currently.temperature +' degrees out. There is a '+ currently.precipProbability + '% chance of rain. '
                    + 'High temperature today will be '+ temperatureHigh + 'Low temperature will be' + temperatureLow
            }
            callback('', data)
        }
    })
}
module.exports = forecast