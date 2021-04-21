const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

require('dotenv').config()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define path for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up statis directory to serve
app.use(express.static(publicDirectory))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        author: 'Kamil B'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        author: 'Kamil B'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is help message',
        title: 'Help',
        author: 'Kamil B'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) return res.send({ err })
        let  coordinates = {
            latitude,
            longitude
        }
        forecast(coordinates, (err, forecastData) => {
            if(err) return res.send({ err });

            res.send({
                location,
                weather: forecastData,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        author: 'Kamil B'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found...',
        author: 'Kamil B'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})