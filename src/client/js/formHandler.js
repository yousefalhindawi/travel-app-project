import { displayResults, displayError } from "./displayResults";

const handleSubmit = async (event) => {
  event.preventDefault();

  const destinationInput = document.getElementById("destination");
  const dateInput = document.getElementById("date");
  const destination = destinationInput.value;
  const date = dateInput.value;

  if (destination.trim() === "") {
    displayError("Please enter a destination");
    return;
  }
  if (date.trim() === "") {
    displayError("Please enter a date");
    return;
  }
  try {
    const response = await fetch("/forecast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destination, date }),
    });

    if (response?.status === 200) {
      const { weatherData, images } = await response.json();
      // Process weatherData and images, and update the UI
      displayResults(weatherData, images);
    } else {
      const errorMessage = await response.json();
      console.log("Error fetching weather forecast:", errorMessage);
      // Display error message in the UI
      displayError("Error fetching weather forecast:" + errorMessage);
    }
  } catch (error) {
    console.log("Error fetching weather forecast:", error?.message);
    // Display error message in the UI
    displayError("Error fetching weather forecast");
  }

  destinationInput.value = "";
  dateInput.value = "";
};

export { handleSubmit };
