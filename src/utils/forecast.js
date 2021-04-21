const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${latitude},${longitude}`
    console.log(url)
    request({url, json: true }, (err, { body }) => {
        if(err){
            callback('Unable to connect with weather API', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            let current = body.current
            callback(undefined, `It is currently ${current.temperature} degress out. It feels like ${current.feelslike} degress out`)
        }
    })
}

module.exports = forecast