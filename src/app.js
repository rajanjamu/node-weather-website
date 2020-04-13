const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and viwes location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// ROUTES
app.get('', (req, res) => {
    res.render('index', { 
        title: 'Weather', 
        name: 'Rajan Gupta' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About', 
        name: 'Rajan Gupta' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Help', 
        name: 'Rajan Gupta' 
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { lat, lon, loc } = {}) => {
        if (error) return res.send( { error } )

        forecast(lat, lon, (error, { temp, time } = {}) => {
            if (error) return res.send( { error } )

            res.send({
                latitude: lat,
                longitude: lon,
                location: loc,
                temperature: temp,
                observation_time: time,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({error: 'You must provide a search term'})
    }

    res.send({products: []});
    console.log(req.query.search);
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Rajan', 
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Rajan',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})