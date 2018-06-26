# The Best Coffee at Dublin Project

This project is a part of the [Front-End Web Developer Nanodegree Program](https://eu.udacity.com/course/front-end-web-developer-nanodegree--nd001) on Udacity.

## Table of Contents

* [Description](#description)
* [Screenshots](#screenshots)
* [Installation](#installation)

## Description
   It's a single-page application uses React, [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial). It provides information about my favorite cafe with the Best Coffee in Dublin. For more information about place uses [Yelp.API](https://www.yelp.com/developers/documentation/v3) (ex: address, phone, rating and opening hours).

### Backend:
  Yelp.API doesn't support CORS. I added small proxy backend written in python ([yelpapi-python](https://github.com/gfairchild/yelpapi)). It allows CORS and proxies Yelp API methods I need.

### Responsive:
  The application is usable across modern desktop, tablet, and phone browsers and looks good at the different screen sizes. For Icons uses: [Font Awesome](https://www.w3schools.com/icons/fontawesome_icons_intro.asp)

### Accessibility:
  The application supporting Web Accessibility features. You can navigate through app by using keyboard.

### Offline Use:
  The application is available even without a connection. Uses [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/).

## Screenshots
  <img src="" width="740"/>
  <img src="" width="740"/>
  <img src="" width="740"/>

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* install python - `install python`
* install pip - `easy_install pip`
* install Flask and dependencies - `pip install Flask yelpapi Flask-Cors`
* start the backend - `python src/locationAPI.py`
* install the dependencies - `npm install`
* start the app - `npm start`
