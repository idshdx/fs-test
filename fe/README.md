# Vue FE

### Tech stack
+ Vue 2.x
+ Vuex
+ Bootstrap 4
+ Octicons: icons from Github
+ Axios

### Project setup
```
yarn install
npm install
```

### Compiles and hot-reloads for development
```
yarn run serve
npm run serve
```
You can now view the application in your browser by navigating to [http://localhost:8080/](http://localhost:8080/)

### Compiles and minifies for production
Builds in the public directory of the express BE. Referenced in vue.config.js
```
yarn run build
npm run build
```

### Application Structure

- `src` - All implementation files. Root path contains Vue boostrapping and the router
- `src/common` - Importable code: API service, config, error handler formatter
- `src/components` - Vue Components
- `src/store` - State management related code
- `src/views` - Vue views


MENTIONS!

###### 1
Does not have proper display of errors, but it catches them....

BE has proper errors that the client can understand like:

`{"errors":{"email":"is invalid","phone":"12321321 is not a valid 10 digit number!"}}`

###### 2

Pagination is set to 3 to see it in action (because it hides itself when there is only 1 page)

You can change it the config file (`src/common/config.js`).
