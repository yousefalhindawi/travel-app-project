import { handleSubmit } from "../src/client/js/formHandler";
import { displayResults, displayError } from "../src/client/js/displayResults";

jest.mock("../src/client/js/displayResults", () => ({
  displayResults: jest.fn(),
  displayError: jest.fn(),
}));

describe("handleSubmit", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <input id="destination" value="Amman" />
    <input id="date" value="2023-06-03" />
    <div id="forecast-card-text" class="card-text"></div>
    <div id="forecast-carousel-inner" class="carousel-inner"></div>
    <div id="errors"></div>
    `;
  });

  test("displays error message if destination is empty", async () => {
    // Modify the input value to be empty
    document.getElementById("destination").value = "";
    // Call the handleSubmit function
    await handleSubmit(new Event("submit"));
    // Verify that the error message is displayed
    expect(displayError).toHaveBeenCalledWith("Please enter a destination");
    expect(displayResults).not.toHaveBeenCalled();

    // Clean up the mocks
    displayError.mockClear();
    displayResults.mockClear();
  });
  test("displays error message if date is empty", async () => {
    // Modify the input value to be empty
    document.getElementById("date").value = "";
    // Call the handleSubmit function
    await handleSubmit(new Event("submit"));
    // Verify that the error message is displayed
    expect(displayError).toHaveBeenCalledWith("Please enter a date");
    expect(displayResults).not.toHaveBeenCalled();

    // Clean up the mocks
    displayError.mockClear();
    displayResults.mockClear();
  });

  test("displays error message when request fails", async () => {
    // Mock the fetch function to return a failed response
    global.fetch = jest.fn().mockRejectedValueOnce();

    // Call the handleSubmit function
    await handleSubmit(new Event("submit"));

    // Verify that the error message is displayed
    expect(displayError).toHaveBeenCalledWith(
      "Error fetching weather forecast"
    );
    expect(displayResults).not.toHaveBeenCalled();

    // Clean up the mocks
    global.fetch.mockRestore();
    displayError.mockClear();
    displayResults.mockClear();
  });

  test("displays results when request is successful", async () => {
    // Mock the fetch function to return a successful response
    const weatherData = {
      app_temp: 25,
      app_max_temp: 30,
      app_min_temp: 20,
      weather: { description: "Sunny" },
    };

    const images = ["image1.jpg", "image2.jpg", "image3.jpg"];

    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ weatherData, images }),
    });

    // Call the handleSubmit function
    await handleSubmit(new Event("submit"));

    // Verify that the results are displayed
    
    expect(displayError).not.toHaveBeenCalled();
    expect(displayResults).toHaveBeenCalledWith(weatherData, images);

    // Clean up the mocks
    global.fetch.mockRestore();
    displayError.mockClear();
    displayResults.mockClear();
  });
});
