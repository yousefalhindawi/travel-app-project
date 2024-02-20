const displayResults = (weatherData, images) => {
  const resultsContainer = document.getElementById("errors");
  resultsContainer.innerHTML = ``;
  const weatherDescription = document.getElementById("forecast-card-text");
  weatherDescription.innerHTML = `<div class="d-flex justify-content-center align-items-center"><img
    class="d-block"
    src=https://openweathermap.org/img/wn/${
      weatherData?.icon
    }.png alt="weather-icon"/></div>
    ${
      weatherData.temp
        ? `<p class="text-center">Temperature: ${weatherData.temp} &#8451;</p>`
        : ""
    }
  ${
    weatherData.temp_max
      ? `<p class="text-center">Max Temperature: ${weatherData.temp_max} &#8451;</p>`
      : ""
  }
  ${
    weatherData.temp_min
      ? `<p class="text-center">Min Temperature: ${weatherData.temp_min} &#8451;</p>`
      : ""
  }
  <p  class="text-center">Humidity: ${weatherData.humidity}</p>`;

  const carouselInner = document.getElementById("forecast-carousel-inner");
  let carouselItems = [];
  images.forEach((image, index) => {
    let carouselItem = `<div class="carousel-item">
    <img width="900px" height="500px"
        src=${image}
        class="d-block" alt="...">
</div>`;

    if (index === 0) {
      carouselItem = `<div class="carousel-item active">
      <img width="900px" height="500px"
          src=${image}
          class="d-block" alt="city-pic">
      </div>`;
    }

    carouselItems.push(carouselItem);
  });
  carouselInner.innerHTML = carouselItems;
};
const displayError = (message) => {
  const resultsContainer = document.getElementById("errors");
  resultsContainer.innerHTML = `<p class="error">${message}</p>`;
};

export { displayResults, displayError };
