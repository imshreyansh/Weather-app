const yargs = require('yargs');
const axios = require('axios');

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

const addressSpace = encodeURIComponent(argv.address);
var geocodeURL=`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA5yxJard0F3yR2jDurEoEktGpudyDxr8Y&address=${addressSpace}`;
axios.get(geocodeURL).then((response)=>{
    if(response.data.status==='ZERO_RESULTS'){
        throw new Error('Unable To Find That Address');
    }
    else if(response.data.status==='OVER_QUERY_LIMIT'){
      throw new Error('You Spelled It Wrong');  
    }
    var lat=response.data.results[0].geometry.location.lat;
    var lng=response.data.results[0].geometry.location.lng;
    var weatherURL=`https://api.darksky.net/forecast/29f2966cf094d5cdafef32304e047949/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL).then((response)=>{
        var temperature=response.data.currently.temperature;
        var apparentTemperature=response.data.currently.apparentTemperature;
        console.log(`It's Currently ${temperature}
It Feels Like ${apparentTemperature}`);
    })
}).catch((e)=>{
    if(e.code==='ENOTFOUND'){
    console.log('Unable To Connect');
    }
    else{
        console.log(e.message);
    }
});