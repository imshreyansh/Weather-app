/*var sp=new Promise((resolve,reject)=>{
    resolve('Hey');
    reject('bye');
});
sp.then((msg)=>{
    console.log("some:",msg);
},(errmsg)=>{
    console.log(errmsg);
})*/
const request = require('request');
var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const addressSpace = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA5yxJard0F3yR2jDurEoEktGpudyDxr8Y&address=${addressSpace}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject("Unable To Connect,Check Your Network Coonection");

            } else if (body.status === 'ZERO_RESULTS') {
                reject("No Result Found For Your Request");

            } else if (body.status === "OVER_QUERY_LIMIT") {
                reject("You Spelled Something Wrong");

            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        })
    })
}
geocodeAddress('221001').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errormsg) => {
    console.log(errormsg);
})
