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
The main concept behind the site is to allow people the ability to order items from different locations, for example: groceries from a grocery store, then have those items delivered to their door. Though a good lot of the concept has not yet been implemented, users **will** soon be able to create accounts to test out the API's usefulness. 

------------

The MongoDB database is utilizing mLab as a means to store the data. 

------------
## Getting Started

To start Express.js and connect to the database, follow the instructions at the top of this README.md file. Postman has been heavily used to make HTTP _GET_ and _POST_ requests to several of the collection paths. Not all HTTP methods are working 100%.

Resources:

_(Users - Vulcans)_
(Attributes):
 * Name _(Order)_
 * Address _(address.street)_
 * City _(address.city)_
 * State _(address.state)_
 * Zip Code _(address.zip)_
 * Rating _(rating)_
 * Logo _(logo_url)_

 _(Users - Admins)_
(Attributes):
 * Name _(Order)_
 * Address _(address.street)_
 * City _(address.city)_
 * State _(address.state)_
 * Zip Code _(address.zip)_
 * Rating _(rating)_
 * Logo _(logo_url)_

 _(Users - Droppers)_
(Attributes):
 * Name _(Order)_
 * Address _(address.street)_
 * City _(address.city)_
 * State _(address.state)_
 * Zip Code _(address.zip)_
 * Rating _(rating)_
 * Logo _(logo_url)_

 _(Users - Shoppers)_
(Attributes):
 * Name _(Order)_
 * Address _(address.street)_
 * City _(address.city)_
 * State _(address.state)_
 * Zip Code _(address.zip)_
 * Rating _(rating)_
 * Logo _(logo_url)_

 _(Users - Guests)_
(Attributes):
 * Name _(Order)_
 * Address _(address.street)_
 * City _(address.city)_
 * State _(address.state)_
 * Zip Code _(address.zip)_
 * Rating _(rating)_
 * Logo _(logo_url)_

 _(Locations)_
(Attributes):
 * Name _(name)_
 * Email _(email)_
 * Avatar Url _(avatar_url)_

  _(Brands)_
(Attributes):
 * Name _(name)_
 * Email _(email)_
 * Avatar Url _(avatar_url)_

  _(Products)_
(Attributes):
 * Name _(name)_
 * Email _(email)_
 * Avatar Url _(avatar_url)_

  _(Orders)_
(Attributes):
 * Name _(name)_
 * Email _(email)_
 * Avatar Url _(avatar_url)_

 _(Content)_
(Attributes):
 * Name _(name)_
 * Email _(email)_
 * Avatar Url _(avatar_url)_

  _(Queries)_
(Attributes):
 * Name _(name)_
 * Email _(email)_
 * Avatar Url _(avatar_url)_

------------
 ### User Endpoints:
HTTP method | Path | Name
--- | --- | ---
POST | /users/vulcans | Create
GET | /users/vulcans | List
GET | /users//vulcans/:id | Retrieve
PUT | /users/vulcans/:id | Update/Replace
DELETE | /users/vulcans/:id | Delete
POST | /users/admins | Create
GET | /users/admins | List
GET | /users//admins/:id | Retrieve
PUT | /users/admins/:id | Update/Replace
DELETE | /users/admins/:id | Delete
POST | /users/droppers | Create
GET | /users/droppers | List
GET | /users//droppers/:id | Retrieve
PUT | /users/droppers/:id | Update/Replace
DELETE | /users/droppers/:id | Delete
POST | /users/shoppers | Create
GET | /users/shoppers | List
GET | /users//shoppers/:id | Retrieve
PUT | /users/shoppers/:id | Update/Replace
DELETE | /users/shoppers/:id | Delete
POST | /users/guests | Create
GET | /users/guests | List
GET | /users//guests/:id | Retrieve
PUT | /users/guests/:id | Update/Replace
DELETE | /users/guests/:id | Delete

 ### Brand Endpoints:
HTTP method | Path | Name
--- | --- | ---
POST | /brands | Create
GET | /brands | List
GET | /brands/:id | Retrieve
PUT | /brands/:id | Update/Replace
DELETE | /brands/:id | Delete

 ### Location Endpoints:
HTTP method | Path | Name
--- | --- | ---
POST | /locations | Create
GET | /locations | List
GET | /locations/:id | Retrieve
PUT | /locations/:id | Update/Replace
DELETE | /locations/:id | Delete

 ### Product Endpoints:
HTTP method | Path | Name
--- | --- | ---
POST | /products | Create
GET | /products | List
GET | /products/:id | Retrieve
PUT | /products/:id | Update/Replace
DELETE | /products/:id | Delete

 ### Orders Endpoints:
HTTP method | Path | Name
--- | --- | ---
POST | /orders | Create
GET | /orders | List
GET | /orders/:id | Retrieve
PUT | /orders/:id | Update/Replace
DELETE | /orders/:id | Delete

------------
## Deployment

Deplyed live on [Heroku](https://xxx.herokuapp.com)

------------
## Built With

* [Node](https://nodejs.org/en/docs/) - Used as the runtime environment
* [Express](http://expressjs.com/en/4x/api.html) - Used as the server-side framework
* [MongoDB](https://docs.mongodb.com/manual/) - Used as a noSQL database
* [Mongoose](http://mongoosejs.com/docs/guide.html) - Used to create models and schema for database
* [mLab](http://docs.mlab.com/) - Used as cloud storage for the database
* [Vue.js](https://vuejs.org/) - Used to handle the client-side 
* [Nuxt](https://nuxtjs.org/) - 
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - Password Encryption
* [Passport](http://www.passportjs.org/docs/) - Authentication
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - Session Data Encryption
* [marked](https://marked.js.org/#/README.md) - Markdown to HTML 

### Helpers

* [Tipe.io](https://tipe.io/) - 
* [Walmart Open API](https://developer.walmartlabs.com/)

------------
## Acknowledgments

* This is intended for business use. Any duplication of unique code or within the scope of the class.
* [Github Repo](https://github.com/skyler-saville/shopdrop)
