const request = require("request");

const fetchMyIP = function (callback) {
  // URL for fetching the IP address
  const url = "https://api.ipify.org?format=json";

  // Use request to make an HTTP GET request to fetch the IP address
  request(url, (error, response, body) => {
    // Check for errors
    if (error) {
      // Pass through the error to the callback
      callback(error, null);
      return;
    }

    // Check for non-200 status
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    // Parse the JSON string to extract the IP address
    const data = JSON.parse(body);
    const ip = data.ip;

    // Pass the IP address to the callback
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  // URL for fetching the geolocation data based on IP
  const url = `https://ipwhois.app/json/${ip}`;

  // Use request to make an HTTP GET request to fetch geolocation data
  request(url, (error, response, body) => {
    // Check for errors
    if (error) {
      // Pass through the error to the callback
      callback(error, null);
      return;
    }

    // Check for non-200 status
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    // Parse the JSON string to extract the coordinates
    const data = JSON.parse(body);
    // parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    // Extract latitude and longitude from the response
    const latitude = data.latitude;
    const longitude = data.longitude;

    // Create an object with latitude and longitude
    const coords = { latitude, longitude };

    // Pass the coordinates to the callback
    callback(null, coords);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };

// The code below is temporary and can be commented out.
const { fetchCoordsByIP } = require("./iss");

fetchCoordsByIP("162.245.144.188", (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned coordinates:", coordinates);
});
