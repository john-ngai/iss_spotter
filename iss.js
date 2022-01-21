const request = require('request');

const fetchMyIP = callback => {
  // IPv4 JSON API.
  const url = 'https://api.ipify.org?format=json';

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
    
    // The IPv4 address is stored inside the ipAddress variable.
    const ipAddress = JSON.parse(body)['ip'];

    // Pass the ipAddress into the callback function.
    callback(null, ipAddress);
  });
};

const fetchCoordsByIP = (ipAddress, callback) => {
  const url = `https://freegeoip.app/json/${ipAddress}`;
  
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP geolocation. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords['latitude']}&lon=${coords['longitude']}`;
  
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const passTime = JSON.parse(body)['response'];
    callback(null, passTime);
  });

};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ipAddress) => {
    if (error) return console.log(error);

    fetchCoordsByIP(ipAddress, (error, coords) => {
      if (error) return console.log(error);

      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) return console.log(error);
        
        callback(null, passTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
