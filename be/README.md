# Express BE

### Tech Stack
+ Express
+ Basic express config libraries (cors, helmet, morgan, etc)
+ Swagger + swagger jsdocs
+ Mongoose
+ Mongoose UniqueValidator
 for handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The mongoose-unique-validator plugin helps us by formatting the error like a normal mongoose ValidationError.

### Requirements:

* [Node.js](http://nodejs.org/download/) (with npm or yarn)
* [MongoDB](http://www.mongodb.org/downloads)

Set the NODE_ENV to be either 'development' or 'production'
````
EXPORT NODE_ENV=development
````
### Installation:

```bash
yarn install
npm install
```

After installing, start the application using Node/npm:

I have included a DB seed(config/seed.js), by default you run the seeder and then the app.
```bash
npm start
```
or without seeding:
```bash
node server.js
node run start-no-seed
```

You can now view the application in your browser by navigating to [http://localhost:3000/](http://localhost:3000/)

API docs can be found at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains express configurations, both with the route config
- `app/controllers` - This folder contains the route definitions for our API.
- `app/models` - This folder contains the schema definitions for our Mongoose models.

Mentions:
+ Because of the lack of a favicon, you will get a nasty 404 dev enabled only stack trace
when you first get the static files 
+ Does not include numeric and incrementing IDs.
