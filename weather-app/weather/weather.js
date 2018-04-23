const request = require('request');
var getWeather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/29f2966cf094d5cdafef32304e047949/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable To Connect At The Moment');
        } else if (response.statusCode === 400) {
            callback(body.error);
        } else if (response.statusCode === 200) {

            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature:body.currently.apparentTemperature
            });
        }
    });

}
module.exports = {
    getWeather
}
