const travelForm = $(".travel-form");

function getInput() {
  event.preventDefault();
  let curLocField = document.querySelector(".current-location-field").value;
  let destField = document.querySelector(".destination-field").value;
  searchTravel(curLocField, destField, renderTravel);
}

function renderTravel(data) {
  $(".travel-table tbody").append(`
  <tr>
    <td>${data.från}</td>
    <td>${data.till}</td>
    <td>${data.date}</td>
    <td>${data.depart}</td>
    <td>${data.arrive}</td>
  </tr>
  `);
}
