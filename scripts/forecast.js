//using class
class Forecast {
  constructor() {
    this.key = "unaJepf6dJ5ptRkcpo4ZKF5ECKFWZhOv";
    this.WeatherURI =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return {
      //when we have property name and value name we can do as
      // cityDetails:cityDetails,
      // weather:weather
      cityDetails,
      weather
    };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`; //? means we are adding query parameter at the end of url
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.WeatherURI + query);
    const data = await response.json();
    return data[0];
  }
}
