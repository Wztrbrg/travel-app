const apiKey = "e88274b0-fd81-4046-86ec-12e7793b6967";
//https://api.resrobot.se/v2.1/location.name?input=Göteborg&format=json&accessId=e88274b0-fd81-4046-86ec-12e7793b6967

const stopLocationLookup = (location) => {
  return `https://api.resrobot.se/v2.1/location.name?input=${location}&format=json&accessId=${apiKey}`;
};

const routeLookup = (cur, dest) => {
  return `https://api.resrobot.se/v2.1/trip?format=json&originId=${cur}&destId=${dest}&passlist=true&showPassingPoints=true&accessId=${apiKey}`;
};

function findStationID(stationName, callback) {
  let url = stopLocationLookup(stationName);
  $.get(url, callback);
}

function findRoute(cur, dest, callback) {
  let url = routeLookup(cur, dest);
  $.get(url, callback);
}

function searchTravel(location, destination, callback) {
  findStationID(location, (data) => {
    let stopID = { id: data.stopLocationOrCoordLocation[0].StopLocation.extId };
    findStationID(destination, (data) => {
      let destID = {
        id: data.stopLocationOrCoordLocation[0].StopLocation.extId,
      };
      findRoute(stopID.id, destID.id, (data) => {
        for (let i = 0; i < data.Trip.length; i++) {
          let routeData = {
            data: data,
            från: data.Trip[i].Origin.name,
            till: data.Trip[i].Destination.name,
            date: data.Trip[i].Origin.date,
            depart: data.Trip[i].Origin.time,
            arrive: data.Trip[i].Destination.time,
          };
          callback(routeData);
        }
      });
    });
  });
}
