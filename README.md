# My-wearher (frontend application)

This project is a frontend application for a weather application that connects to a backend
application developed in Node.js ( available [here](https://github.com/diogo839/glartek-candidatura-node.git) ).
This fronted application was developed using React.js and Vite with bootstrap v5.
## Functionalities

This application allows the user to:

* Register a new user
* Login
* Logout
* Check a list of cities and their current weather 
* Add a city to the list of favourite cities
* Remove a city from the list of favourite cities
* Check the current weather of a city in detail
* Check the history of a city's weather

## Getting Started

To get started, you need to clone the repository and install the dependencies.

### Prerequisites

To run this project you need to have installed Node.js(version 20.6.1) and NPM.

### Installing

To install the dependencies, run the following command:

```
npm install
```

### Running

To run the project, run the following command:

```
npm run dev
```
### Environment variables

To run the project, you need to create a .env file in the root directory of the project with the following variables:

```
VITE_APP_ENDPOINT=localhost:8080
VITE_APP_GOOGLE_API_KEY=<your-google-api-key>
```


