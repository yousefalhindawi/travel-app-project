import { displayResults, displayError } from "../src/client/js/displayResults";

describe("displayResults", () => {
    beforeEach(() => {
    // Set up the DOM element for testing
    document.body.innerHTML = `
    <div id="forecast-card-text"></div>
    <div id="forecast-carousel-inner"></div>
    <section id="errors" class="errors">
    </section>
    `;
  });
  test("displays weather data and images correctly", () => {
    // Mock DOM elements
    // document.body.innerHTML = `
    //   <div id="forecast-card-text"></div>
    //   <div id="forecast-carousel-inner"></div>
    // `;

    const weatherData = {
      app_temp: 25,
      app_max_temp: 30,
      app_min_temp: 20,
      weather: { description: "Sunny" },
    };

    const images = ["image1.jpg", "image2.jpg", "image3.jpg"];

    // Call the function
    displayResults(weatherData, images);

    // Verify the updated DOM elements
    expect(document.getElementById("forecast-card-text").innerHTML).toContain(
      "Temperature: 25"
    );
    expect(document.getElementById("forecast-card-text").innerHTML).toContain(
      "Max Temperature: 30"
    );
    expect(document.getElementById("forecast-card-text").innerHTML).toContain(
      "Min Temperature: 20"
    );
    expect(document.getElementById("forecast-card-text").innerHTML).toContain(
      "Weather Description: Sunny"
    );

    const carouselItems = document.getElementById(
      "forecast-carousel-inner"
    ).innerHTML;
    expect(carouselItems).toContain("image1.jpg");
    expect(carouselItems).toContain("image2.jpg");
    expect(carouselItems).toContain("image3.jpg");
  });

  test("displays the error message correctly", () => {
    const errorMessage = "An error occurred";

    // Call the displayError function with the error message
    displayError(errorMessage);

    // Verify that the error message is displayed correctly in the DOM
    expect(document.getElementById("errors").innerHTML).toContain(
      errorMessage
    );
    expect(document.getElementById("errors").innerHTML).toContain("error");
  });
});
