# shopdrop-nuxt

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).




# ShopDrop Delivery Service

## Purpose of the site
The main concept behind the site is to allow people the ability to order items from different locations, for example: groceries from a grocery store, then have those items delivered to their door. create "potential" reservations to several different locations. Though a good lot of the idea is not yet implemented, users **can** create reservations and delete them. 

------------
Based the previous assignments, this assignment uses Node, Express, MongoDB, Mongoose, and Vue.js. 
Live current version of the app can be found [Here](https://grubspy-midterm.herokuapp.com/).

The MongoDB database is utilizing mLab as a means to store the data. 
### mongodb://<dbuser>:<dbpassword>@ds113628.mlab.com:13628/prieor_db
*need to create a variable for the uri path to keep information private*
------------
## Getting Started

To start Express.js and connect to the database, run `node server.js` or `npm run start`. Postman is required to make http _GET_ and _POST_ requests to several of the unimplemented collection paths. 

Resources: 
_(restaurants)_
(Attributes):
 * Name _(Order)_
 * Address _(address.street)_
 * City _(address.city)_
 * State _(address.state)_
 * Zip Code _(address.zip)_
 * Rating _(rating)_
 * Logo _(logo_url)_

 _(users)_
(Attributes):
 * Name _(name)_
 * Email _(email)_
 * Avatar Url _(avatar_url)_

  _(reservations)_
(Attributes):
 * Location _(location)_
 * Total Attendees _(total)_
 * Attendees List _(attendees)_
 * Date & Time _(date)_
 * Point of contact _(pointOfContact)_


------------
 ### Rest Endpoints:
HTTP method | Path | Name
--- | --- | ---
 GET | /restaurants | List
 GET | /users | List
 GET | /users/:id | Retrieve
 GET | /reservations | Index/List
 GET | /reservations/:id | Delete

Not implemented in the current version:
HTTP method | Path | Name
--- | --- | ---
 PUT | /reservations/:id | Replace
------------
## Deployment

Deplyed live on [Heroku](https://grubspy-midterm.herokuapp.com)

------------
## Built With

* [Node](https://nodejs.org/en/docs/) - Used as the runtime environment
* [Express](http://expressjs.com/en/4x/api.html) - Used as the server-side framework
* [MongoDB](https://docs.mongodb.com/manual/) - Used as a noSQL database
* [Mongoose](http://mongoosejs.com/docs/guide.html) - Used to create models and schema for database
* [mLab](http://docs.mlab.com/) - Used as cloud storage for the database
* [Vue.js](https://vuejs.org/) - Used to handle the client-side 

------------
## Acknowledgments

* This was built as part of an assignment and intended to only be used within the scope of the class.
* [Github Repo](https://github.com/dsu-cit-csweb4200/s18-project1-skyler-saville)
