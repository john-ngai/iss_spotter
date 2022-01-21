let min = 0;

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) return console.log(error);

  for (const passTime of passTimes) {
    const datetime = new Date(0);
    datetime.setSeconds(passTime['risetime']);
    const duration = passTime['duration'];
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
});




















/*fetchISSFlyOverTimes({ latitude: 43.8018, longitude: -79.3581 }, (error, data) => {
  
  if (error) return console.log(error);

  console.log(data);
  
})*/

/*fetchCoordsByIP('142.126.221.178', (error, data) => {
  
  if (error) return console.log(error);

  console.log(data);
  
});*/

/*fetchMyIP((error, ipAddress) => {
  if (error) {
    console.log(error);
    return;
  }
  
   console.log(ipAddress);
 });*/
