// iss.js
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

    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data

    // Parse the JSON string to extract the IP address
    const data = JSON.parse(body);
    const ip = data.ip;

    // Pass the IP address to the callback
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };
