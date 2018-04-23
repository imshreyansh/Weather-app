const request = require('request');
var geocodeAddress = (address,callback) => {
    const addressSpace = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA5yxJard0F3yR2jDurEoEktGpudyDxr8Y&address=${addressSpace}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable To Connect,Check Your Network Coonection"); 
           
        } else if (body.status === 'ZERO_RESULTS') {
            callback("No Result Found For Your Request");
           
        } else if (body.status === "OVER_QUERY_LIMIT") {
            callback("You Spelled Something Wrong");
            
        } else if (body.status === 'OK') {
            callback(undefined,{
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude:body.results[0].geometry.location.lng
        })
        }
}
            )}


module.exports={
    geocodeAddress
}
