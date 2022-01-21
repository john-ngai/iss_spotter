/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
*/

const request = require('request');

const fetchMyIP = function(callback) {
  // IPv4 JSON API.
  let url = 'https://api.ipify.org?format=json';

  // Use request to fetch IP address from JSON API.
  request(url, (error, response, body) => {
    
    // Error can be set if invalid domain, user is offline, etc.
    if (error) return callback(error, null);

    // If non-200 status, assume server error.
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ipAddress = JSON.parse(body)['ip'];
    // const ipAddress = data['ip'];
    callback(null, ipAddress);
  });
};

module.exports = { fetchMyIP };