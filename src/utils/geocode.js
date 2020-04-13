const request = require('request');

const geocode = (loc, callback) => {
    const apiKey = 'pk.eyJ1IjoicmFqYW5qYW11IiwiYSI6ImNrOHd1eGh5YjEweG0zZ21oZjI1MmtueGEifQ.Fa56EyS7RzDufceXH4IeVg';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=${apiKey}`;
    request({ url, json: true }, (err, res, body) => {
        if (err) callback('Unable to provide data!');
        else if (body.features.length === 0) {
            
            callback('Could not find the location. Please try again!');
            
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                loc: body.features[0].place_name
            });
        }
        
    });
}

module.exports = geocode;