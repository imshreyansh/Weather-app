const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
        a: {
            demand: true,
            describe: 'Address To Fetch Weather',
            alias: 'address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's Currently ${weatherResults.temperature}°F.  It Feels Like ${weatherResults.apparentTemperature}°F`);
            }
        });

    }
});
