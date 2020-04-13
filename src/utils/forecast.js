const request = require('request');

const forecast = (lat, lon, callback) => {
    const apiKey = 'e63b995aea6e206a632e906a6939f4f3';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${lon}`;
    
    request({ url, json: true }, (err, res, body) => {

        if (err) callback('Unable to provide data!');

        else if (body.current) {
            const data = {
                temp: body.current.temperature,
                time: body.current.observation_time,
                loc: body.location.name,
                country: body.location.country
            }
            callback(err, data);
        } else callback('Something went wrong!');
    });

}

module.exports = forecast;