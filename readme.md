# UNISON
###### Summary

The idea for Unison came from my love for board games and a need to find other fellow hobbyists in my area. I was also inspired by Board Game Geek and their API while not being a big fan of their design and UI. I combined these interests with Google Maps to create this project.

---

## User Stories

As a user I would like to log in and see other users who want to play games.
![Logged-in Home Page](/public/img/home.jpg)


If a user wants more information on a given game they may click on the info logo next to the game title. A modal appears with the top 5 results from the Board Game Geek API with info boxes that slide down.
![Game Information](/public/img/info_modal.jpg)


The user has the ability to click the sign-posts and re-center the map based on the location. Each marker on the map represents a post on the left which was added by another user.

![Marker](/public/img/marker.jpg)

The user has the ability to add a post of their own:

![Add-Post](/public/img/add_post.jpg)

If the user wants to change their profile they can do so by selecting it from the navigation bar and accessing the page:

![User Profile](/public/img/user_profile.jpg)

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
* Bootstrap

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

---

### Future Updates

###### Future updates to Unison would include:
* A more robust friend system, which would allow viewing games and user profiles.
* A socket based chat system between users rather than an e-mail based system.
