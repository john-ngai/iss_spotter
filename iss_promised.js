const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = body => {
  const ip = JSON.parse(body)['ip'];
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = body => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `ahttp://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const { response } = JSON.parse(body);
      return response; 
    });
};

const printPassTimes = array => {
  for (const passTime of array) {
    const datetime = new Date(0);
    datetime.setSeconds(passTime['risetime']);
    const duration = passTime['duration'];
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

module.exports = { nextISSTimesForMyLocation, printPassTimes };