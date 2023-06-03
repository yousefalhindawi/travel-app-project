const request = require("supertest");
const app = require("../src/server/index");

describe("Server", () => {
  test("GET / should return a welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("<!doctype html>");
    expect(response.text).toContain("<title>Travel Application</title>");
  });

  test("POST /forecast should return weather data and images", async () => {
    const mockGeonamesResponse = {
      data: {
        geonames: [
          {
            lat: 40.7128,
            lng: -74.006,
          },
        ],
      },
    };

    const mockWeatherbitResponse = {
      data: {
        data: [
          {
            app_temp: 25,
            app_max_temp: 30,
            app_min_temp: 20,
            weather: {
              description: "Sunny",
            },
          },
        ],
      },
    };

    const mockPixabayResponse = {
      data: {
        hits: [
          {
            largeImageURL: "image1.jpg",
          },
          {
            largeImageURL: "image2.jpg",
          },
        ],
      },
    };

    // Mock the axios.get function to return the predefined responses
    jest
      .spyOn(require("axios"), "get")
      .mockResolvedValueOnce(mockGeonamesResponse)
      .mockResolvedValueOnce(mockWeatherbitResponse)
      .mockResolvedValueOnce(mockPixabayResponse);

    const response = await request(app)
      .post("/forecast")
      .send({ destination: "New York", date: "2023-06-03" });

    expect(response.status).toBe(200);
    expect(response.body.weatherData).toBeDefined();
    expect(response.body.weatherData.app_temp).toBe(25);
    expect(response.body.weatherData.app_max_temp).toBe(30);
    expect(response.body.weatherData.app_min_temp).toBe(20);
    expect(response.body.weatherData.weather.description).toBe("Sunny");
    expect(response.body.images).toBeDefined();
    expect(response.body.images).toEqual(["image1.jpg", "image2.jpg"]);
  });
});
