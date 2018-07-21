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

## Resource Models:

_(Users - Vulcans)_
(Attributes):
  * First Name _(name.first)_
  * Last Name _(name.last)_
  * Email _(email)_
  * Ecrypted Password _(password)_
  * Phone Number _(phone)_
  * Account _(account_type)_
  * Active Setting _(_isActive)_

 _(Users - Admins)_
(Attributes):
  * First Name _(name.first)_
  * Last Name _(name.last)_
  * Email _(email)_
  * Ecrypted Password _(password)_
  * Phone Number _(phone)_
  * Account _(account_type)_
  * Active Setting _(_isActive)_

 _(Users - Droppers)_
(Attributes):
  * First Name _(name.first)_
  * Last Name _(name.last)_
  * Email _(email)_
  * Ecrypted Password _(password)_
  * Phone Number _(phone)_
  * Account _(account_type)_
  * Active Setting _(_isActive)_
  * Current Orders [_(orders.current)_]
  * Previous Orders [_(orders.previous)_]
  * Cancelled Orders [_(orders.cancelled)_]
  * Drivers License Number _(drivers_license.number)_
  * Drivers License State _(drivers_license.state)_

 _(Users - Shoppers)_
(Attributes):
  * First Name _(name.first)_
  * Last Name _(name.last)_
  * Email _(email)_
  * Ecrypted Password _(password)_
  * Phone Number _(phone)_
  * Account _(account_type)_
  * Active Setting _(isActive)_
  * Street Address _(address.street)_
  * Aptartment/Unit _(address.apt)_
  * City _(address.city)_
  * State _(address.state)_
  * Zipcode _(address.zip)_
  * Delivery Instructions _(address.instructions)_
  * Current Orders [_(orders.current)_]
  * Previous Orders [_(orders.previous)_]
  * Cancelled Orders [_(orders.previous)_]

> Had considered using "Guest" logins... But poses authentication issues for other user types.

 _(Locations)_
(Attributes):
  * Location Name _(name)_
  * Website URL _(website)_
  * Phone Number _(phone)_
  * Street Address _(address.street)_
  * Aptartment/Unit _(address.apt)_
  * City _(address.city)_
  * State _(address.state)_
  * Zipcode _(address.zip)_
  * Delivery Instructions _(address.instructions)_
  * Associated Brands _(associated_brands)_
   

  _(Brands)_
(Attributes):
  * Brand Name _(name)_
  * Brand API URI _(api)_
  * Website _(website)_
  * Activity Status _(active)_
  * Product ID's [_(products)_]

  _(Products)_
(Attributes):
  * Product Name _(name)_
  * Size _(size)_
  * Variation _(variation)_
  * Activity Status _(active)_
  * Estimated Price _(estimated_price)_
  * Image URL _(img_url)_
  * UPC Number _(upc)_
  * Brand Association _(associated_with)_

  _(Orders)_
(Attributes):
  * Ordered By _(ordered_by)_
  * Assigned Dropper _(dropper_assigned)_
  * Order Nickname _(nickname)_
  * Activity Statud _(active)_
  * Order Status _(status)_
  * Know Items Array [_(known_items)_]
  * Unknown Items Array [_(unknown_items)_]
    * Unknown Product Name _(product.name)_
    * Unknown Product Size _(product.size)_
    * Unknown Product Variation _(product.variation)_
    * Unknown Product Activity _(product.active)_
    * Unknown Product UPC _(product.upc)_
    * Unknown Product Brand Name _(product.brand_name)_
  * Order Total Quantity _(order_quantity)_
  * Date Order Was Created _(date_created)_
  * Order Number _(order_number)_

------------
 ### User Endpoints:
HTTP method | Path | Name
--- | --- | ---
POST | /users/vulcans | Create
POST | /users/admins | Create
POST | /users/droppers | Create
POST | /users/shoppers | Create
POST | /users/guests | Create
GET | /users/vulcans | List
GET | /users/admins | List
GET | /users/droppers | List
GET | /users/shoppers | List
GET | /users/guests | List
GET | /users/vulcans/:id | Retrieve
GET | /users/admins/:id | Retrieve
GET | /users/droppers/:id | Retrieve
GET | /users//shoppers/:id | Retrieve
GET | /users//guests/:id | Retrieve
PUT | /users/vulcans/:id | Update/Replace
PUT | /users/admins/:id | Update/Replace
PUT | /users/droppers/:id | Update/Replace
PUT | /users/shoppers/:id | Update/Replace
PUT | /users/guests/:id | Update/Replace
DELETE | /users/vulcans/:id | Delete
DELETE | /users/admins/:id | Delete
DELETE | /users/droppers/:id | Delete
DELETE | /users/shoppers/:id | Delete
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

 ### Content Endpoints (page content):
HTTP method | Path | Name
--- | --- | ---
GET | /content/home | List

 ### Orders Endpoints:
HTTP method | Path | Name
--- | --- | ---
GET | /queries/search | List  _(req.query.query)_ & _(req.query.categoryId)_
GET | /queries/item | List  _(req.query.itemId)_
GET | /queries/upc_search | List  _(req.query.upc)_
GET | /queries/taxonomy | List

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
* [Nuxt](https://nuxtjs.org/) - Vue.js Framework
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - Password Encryption
* [Passport](http://www.passportjs.org/docs/) - Authentication
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - Session Data Encryption
* [marked](https://marked.js.org/#/README.md) - Markdown to HTML 

### Helpers

* [Tipe.io](https://tipe.io/) - API friendly CMS
* [Walmart Open API](https://developer.walmartlabs.com/) - Search API

------------
## Acknowledgments

* This is intended for business use. Any duplication of unique code or within the scope of the class.
* [Github Repo](https://github.com/skyler-saville/shopdrop)
