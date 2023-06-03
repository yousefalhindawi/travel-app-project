const displayResults = (weatherData, images) => {
  const resultsContainer = document.getElementById("errors");
  resultsContainer.innerHTML = ``;
  const weatherDescription = document.getElementById("forecast-card-text");
  weatherDescription.innerHTML = `${
    weatherData.app_temp
      ? `<p class="text-center">Temperature: ${weatherData.app_temp} &#8451;</p>`
      : ""
  }
  ${
    weatherData.app_max_temp
      ? `<p class="text-center">Max Temperature: ${weatherData.app_max_temp} &#8451;</p>`
      : ""
  }
  ${
    weatherData.app_min_temp
      ? `<p class="text-center">Min Temperature: ${weatherData.app_min_temp} &#8451;</p>`
      : ""
  }
  <p  class="text-center">Weather Description: ${
    weatherData.weather.description
  }</p>`;

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
