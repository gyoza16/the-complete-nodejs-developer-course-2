const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/dfa639688d20acd5cc44546293ccd894/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            const data = body.currently
            const dataDaily = body.daily.data[0]
            callback(undefined, `${dataDaily.summary} It is currently ${data.temperature} degrees out. This high today is ${dataDaily.temperatureHigh} with a low of ${dataDaily.temperatureLow}. There is a ${data.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast