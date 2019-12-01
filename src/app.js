const log = console.log
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000
// paths for routes
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// hbs configuration
app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

app.get('', (request, response)=>{
    response.render('index', {
        title:'Weather app', 
        message: 'Weather app',
        createdBy: 'Harjeevan Tanda'
    })
})

app.get('/about', (request, response)=>{
    response.render('about', {
        title:'About', 
        message: 'This is a weather app for learing Node js, created with help of darksky.com and mapbox.com',
        createdBy: 'Harjeevan Tanda'
    })
})
app.get('/weather', (request, response)=>{

    const address  = request.query.address
    if(!address){
        return response.send({ error : 'Please provide a address'})
    }
    geocode(address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return response.send({error})
        }
        forecast(latitude, longitude, (error, {forecast} ={}) => {
            if(error){
                return response.send({error})
            }
            return response.send({
                location,
                forecast,
                address
            })
        })
    })
})

app.get('/about/*', (request, response) =>{
    response.render('not_found', {
        title:'404', 
        message:'About sub page not found', 
    })
})
app.get('*', (request, response) =>{
    response.render('not_found', {
        title:'404', 
        message:'404 page not found', 
    })
})
app.listen(port,()=>{
    console.log('Server is up and running on ' + port)
})