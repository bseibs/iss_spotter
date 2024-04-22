// index.js
const { fetchMyIP } = require("./iss");
// const { fetchCoordsByIP } = require("./iss";)
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log("Returned IP:", ip);
});

const myIP = "70.66.154.176";
fetchCoordsByIP(myIP, (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

// The code below is temporary and can be commented out.
// const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });
