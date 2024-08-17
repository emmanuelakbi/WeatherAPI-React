import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");
  const [date, setDate] = useState("");
  const [temp, setTemp] = useState("");
  const [description, setDescription] = useState("");
  const [inputValue, setInputValue] = useState("");

  fetch(
    "http://api.weatherapi.com/v1/current.json?key=a5e53e808b984560bd1110948241708&q=Lagos&aqi=no"
  )
    .then((response) => response.json())
    .then((data) => console.log(data));

  const handleButtonClick = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=a5e53e808b984560bd1110948241708&q=${inputValue}&aqi=no`
    )
      .then((response) => response.json())
      .then(displayData);

    /*************************************
    // PREVIOUS API KEY FROM OPENWEATHERMAP
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=8241dd5ea92d0d5d64368af5ceb5187f&units=metric`
    // )
    //   .then((response) => response.json())
    //   .then(displayData);
    **************************************/
  };

  const displayData = (weather) => {
    setCity(`${weather.location.name}, ${weather.location.country}`);
    setTemp(`${Math.round(weather.current.temp_c)}°C`);
    setDescription(`${weather.current.condition.text}`);
    setIcon(weather.current.condition.icon);

    let now = new Date();
    setDate(dateBuilder(now));
  };

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
  };

  /**********************************
  // TEST API KEY: a5e53e808b984560bd1110948241708
  // fetch(
  //   "http://api.weatherapi.com/v1/current.json?key=a5e53e808b984560bd1110948241708&q=Lagos&aqi=no"
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
 ********************************/

  return (
    <main className="weather">
      <div className="weather-heading">
        <h1 className="weather__heading-title">Weather App</h1>
      </div>
      <div className="weather__input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleButtonClick();
          }}
        >
          <input
            className="weather__input-searchBox"
            placeholder="Search for your city..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="weather__input-button">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="weather__details">
        <div className="weather__details-city">{city}</div>
        <div className="weather__details-date">{date}</div>
        <div className="weather__details-temp">{temp}</div>
        <div className="weather__details-description">{description}</div>
        <div className="weather__details-icon">
          {icon && <img src={icon} alt={description} />}
        </div>
      </div>
    </main>
  );
}

export default App;
