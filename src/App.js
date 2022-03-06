import React, { useEffect, useState } from "react";
import weather from "../src/images/weather.png";
import location from "../src/images/location.png";

const App = () => {
  const [dark, setMode] = useState(false) 
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("karachi");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8a13df165f9099bdd3008e66764b2a56`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main, resJson.weather);
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="container">
        <div className="row align-items-center text-center justify-content-center">
         <div className="col-md-4">
         <div className={dark ? "darkmode main" : "main"}>
            <div className="col-md-12 switchBtn">
              <label className="switch">
                <input type="checkbox" onChange={()=>setMode(!dark)}/>
                <span className="slider round"></span>
              </label>
            </div>

            <form className="d-flex">
              <input
                id="search"
                value={search}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </form>

            <img
              className="img_weather img-responsive img-fluid"
              src={weather}
              alt="Weather Logo"
            />

            {!city ? (
              <p>No Data Found</p>
            ) : (
              <div className="info">
                <h2>
                  <i className="fas fa-street-view"></i>
                  {search}
                </h2>
                <h1>
                  {city.temp}°Cel
                  <img src={location} alt="location" />
                </h1>

                <h3>
                  Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel{" "}
                </h3>

                <h4>Pressure : {city.pressure}</h4>
                <h4>Humidity : {city.humidity}</h4>

                <h4>Feels-Like : {city.feels_like}</h4>

                <div className="wave one"></div>
                <div className="wave two"></div>
                <div className="wave three"></div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
