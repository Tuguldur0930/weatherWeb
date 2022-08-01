import React, { useState } from "react";
import { TextField } from "@mui/material";
import './App.css';

export default function App() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState();
  const [location, setLocation] = useState({ lat: 46.8625, lon: 103.8467 });
  const [weekly, setWeekly] = useState();
  const [list, setList] = useState();
  let avg;

  const search = async (e) => {
    e.preventDefault();
    // location
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputText}&limit=1&appid=deac6223cf7f67bfc82143d32ca6eabf`);
    let data = await response.json();

    const { lat, lon } = data[0];

    setLocation({
      lat,
      lon,
    })

    // current weather
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=deac6223cf7f67bfc82143d32ca6eabf`)
    data = await response.json();
    setData(data);

    // weekly weather
    response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=deac6223cf7f67bfc82143d32ca6eabf`)
    weekly = await response.json().list.weather[0].icon;
    setWeekly(avg);

    // for (let i = 0; i < weekly.length; i++) {
    //   sum += (average[i], 8);
    // }
    // var avg = sum / average.length;
  }


  // var sum = 0;
  // for (var i = 0; i < average.length; i++) {
  //   sum += parseInt(average[i], 10);
  // }

  // var avg = sum / average.length;


  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  return (
    <div id="background">
      {/* Navigation bar section */}
      <section id="dateBox">
        <div>
          {/* Search bar */}
          <div id="search">
            <form onSubmit={search}>
              <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search"
                value={inputText}
              />
            </form>
          </div>
          {/* Time */}
          <div id="date">
            <p>{date}</p>
          </div>
        </div>
        {/* Location */}
      </section>
      <section>
        <div id="infoBox">
          {/* Weather.icon */}
          <div id="weatherIcon">
            {data && <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} />}
          </div>
          {/* Weather.temp */}
          <div id="temperature" className="textFont">
            <label>
              {data && (data.main.temp - 273).toFixed(1)}
              °C
              {/* NOTE : Space - &nbsp; */}
            </label>
            {/* NOTE : Decimal - number.toFixed([decimalPlaces]);   */}
          </div>
          {/* Weather Description */}
          <section>
            <div id="weatherMain" className="textFont">
              {data && (data.weather[0].main)}
            </div>
            <div id="weatherDescription" className="textFont">
              <label> &nbsp; • &nbsp;
                {data && (data.weather[0].description)}
              </label>
            </div>
            <div id="location" className="textFont">
              {location && (location.name)}
            </div>
          </section>
        </div>
      </section>
      {/* NOTE : <div>{JSON.stringify(data.weather)}</div>     Yronhii (olon medeelel harah bol JSON-toi)     */}
      {/* NOTE : <div>{data.weather[0].main}</div>          Nariin medeelel harah bol JSON shaardlagagu         */}
      <section>
        {/* Next Week Weather Info */}
        <div id="nextWeekBox">
          {/* {[1,  2, 3, 4, 5].map((value, avgTemp) =>
            <div key={avgTemp}>
              {value}
            </div>
          )} */}
          {/* {data.splice([0, 7]).map((item, index) => (
            <div key={index}></div>
          ))} */}
        </div>
      </section >
    </div >
  );

}