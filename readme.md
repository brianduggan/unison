# UNISON

## User Stories

Unison is a social networking platform for board gamers.

As a user I would like to log in and see other users who want to play games.
![Logged-in Home Page](/public/img/home.jpg)


The user has the ability to click the sign-posts and re-center the map based on the location. Each marker on the map represents a post on the left which was added by another user.

![Marker](/public/img/marker.jpg)

---
## Live Application

###### A live version of the page can be found here: https://stormy-coast-98929.herokuapp.com/

---
## Technologies
##### The main technologies used for the creation of this application were:
* Express
* Node.JS
* MongoDB
* Handlebars
* jQuery

---
## Dependencies
* BCryptJs - Used for safely storing user passwords.
* Body Parser - Allows the body of the request to be parsed for necessary information by the back end of the application.
* Cookie - Used for authentication and the storage of tokens in a cookie.
* Dot Env - Allows access to global variables.
* EJS - for viewing HTML pages embedded with Javascript.
* Mongoose - used to create our data schema in the models.
* Morgan - a middleware used for verbose statuses on our server side console.
* Request - used for making XML AJAX requests to a 3rd Party API.
* XML2JS - a plugin used to translate our XML formatted API into a JSON object we were more easily able to consume.
