const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();
const updateUI = function(data) {
  // const cityDetails = data.cityDetails;
  // const weather = data.weather;
  //destructure properties it work exactly same as above

  const { cityDetails, weather } = data;

  //update details template
  details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
 <div class="my-3">${weather.WeatherText}</div>
 <div class="display-4 my-4">
   <span>${weather.Temperature.Metric.Value}</span>
   <span>&deg;C</span>
 </div>`;
  //update the night/day and icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);
  //remove the d-none class if press enter
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", function(event) {
  event.preventDefault();
  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  //update ui with new city
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error));

  localStorage.setItem("entered city", city); //here entered city is key and city is value which is typed by user
});

if (localStorage.getItem("entered city")) {
  forecast
    .updateCity(localStorage.getItem("entered city"))
    .then(data => updateUI(data))
    .catch(error => console.log(error));
}
