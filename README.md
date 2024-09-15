# travel-app-project
Travel Application Project

## [Travel Application Project](https://travelapplicationproject-pay53op5.b4a.run/)
## [Travel Application Project](https://travel-application-project.onrender.com/)
## Overview

This project create an asynchronous web app that will retrieve the user input where the location he is traveling to and the date he is leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. We are going to use the **Weatherbit API**(https://www.weatherbit.io/api). Weatherbit API has one problem, it only takes in coordinates for weather data—it’s that specific. So, we’ll need to get those coordinates from the **Geonames API**(https://www.geonames.org/export/web-services.html). Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the **Pixabay API**(https://pixabay.com/api/docs).

## This project used the following techniques and tools:
* Node.js & Express.js.
* Webpack (Loaders, Plugins, Mode).
* Sass.
* Bundle & Minify js and styles in the production environment.
* Service workers.
* Testing (Unit Test using Jest).
## Prerequisites:

node.js v16.17.0 (install 16.17.0 version from the Internet)
Check if you have it by typing this into a terminal like cmd or git bash.

    node -v

## To install:

Open a terminal and make sure it is open in the root folder (udacity-frontend-nanodegrees-travel-app-project), write the command below, and then run it (by pressing enter on the keyboard):

    npm i

## To run normally:

In root folder (udacity-frontend-nanodegrees-travel-app-project) run:

    npm run build-prod

then run:

    npm run dev
## To run Tests:

In root folder (udacity-frontend-nanodegrees-travel-app-project) run:

    npm run test
