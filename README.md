
# Node Todo Api
A Todo Api implemented using NodeJS to perform basic CRUD operations and simulate a To-Do list app.


## Libraries / Frameworks used
- Mongoose ORM for MongoDB
- Express
- Body-Parser module

## API URL
  Hosted on Heroku at https://ash-todo-api.herokuapp.com/
  
## GET Routes
- **Get all Todo list items**: 
```
  url: 'https://ash-todo-api.herokuapp.com/todos'
  method: 'GET'
  response: Array of JSON Objects
  ```
- **Get list item by ID**: 
```
   url : 'https://ash-todo-api.herokuapp.com/todos/id'
   method: 'GET'
   response: JSON Object
   ```

## POST Routes
- **Insert a todo list item**: 
```
  url: 'https://ash-todo-api.herokuapp.com/todos'
  method: 'POST'
  body : {
    text : String,
    completed : Boolean,
    completedAt : timestamp
  }
  ```
  
## Building Project Locally
  - `cd` into the project directory. 
  - Run `npm init` and then `npm install` to install all the required dependencies.
  - Update local MonngoDB url in the server/db/mongo-connect.js file
  - `node server/server.js`
  -  Default Port: 3000 
  


