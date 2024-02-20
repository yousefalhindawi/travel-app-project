const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

/* Start Of Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cors for cross origin allowance
app.use(cors());
/* End Of Middleware*/

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html", { root: __dirname + "/.." });
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Weather app listening on port 8080!");
});

app.post("/forecast", async (req, res) => {
  const { destination, date } = req.body;

  try {
    // Call Geonames API to get the coordinates
    const geonamesResponse = await axios.get(
      `http://api.geonames.org/searchJSON?q=${encodeURIComponent(
        destination
      )}&maxRows=1&username=${process.env.GEONAMES_API_KEY}`
    );
    const { lat, lng } = geonamesResponse.data.geonames[0];
    // Get the current date
    const currentDate = new Date();

    // Calculate the difference between the trip date and the current date
    const tripDate = new Date(date);
    const timeDifference = tripDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    let weatherData;

    if (daysDifference <= 7) {
      // Call Weatherbit API to get the current weather forecast
      const weatherbitResponse = await axios.get(
        // `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.WEATHERBIT_API_KEY}&units=metric`
      );
      weatherData = {
        main: weatherbitResponse?.data?.weather[0]?.main,
        description: weatherbitResponse?.data?.weather[0]?.description,
        icon: weatherbitResponse?.data?.weather[0]?.icon,
        temp: weatherbitResponse?.data?.main?.temp,
        temp_min: weatherbitResponse?.data?.main?.temp_min,
        temp_max: weatherbitResponse?.data?.main?.temp_max,
        humidity: weatherbitResponse?.data?.main?.humidity,
        ...weatherbitResponse?.data,
      };
    } else {
      // Call Weatherbit API to get the predicted weather forecast
      const weatherbitResponse = await axios.get(
        // `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${process.env.WEATHERBIT_API_KEY}&units=metric`
      );
      const forecastDays = Math.ceil(daysDifference / 7) + 1;
      const forecastDaysWeatherData =
        weatherbitResponse?.data?.list[forecastDays > 40 ? 30 : forecastDays];
      weatherData = {
        main: forecastDaysWeatherData?.weather[0]?.main,
        description: forecastDaysWeatherData?.weather[0]?.description,
        icon: forecastDaysWeatherData?.weather[0]?.icon,
        temp: forecastDaysWeatherData?.main?.temp,
        temp_min: forecastDaysWeatherData?.main?.temp_min,
        temp_max: forecastDaysWeatherData?.main?.temp_max,
        humidity: forecastDaysWeatherData?.main?.humidity,
        ...forecastDaysWeatherData,
      };
    }

    // Call Pixabay API to get the image for the location
    const pixabayResponse = await axios.get(
      `https://pixabay.com/api/?key=${
        process.env.PIXABAY_API_KEY
      }&q=${encodeURIComponent(destination)}&image_type=photo&category=places`
    );
    const images = pixabayResponse.data.hits.map((hit) => hit.largeImageURL);

    // Return the weather forecast and images as the response
    res.send({ weatherData, images });
  } catch (error) {
    console.error("Error fetching weather forecast:", error.message);
    res.status(500).send("Error fetching weather forecast");
  }
});

module.exports = app;
