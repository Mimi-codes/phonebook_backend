# NODE.JS AND EXPRESS (PART 3a) 
a. Package.json Installation
- In node, package.json is installed by running 'npm init' in the root folder of the project, and completed by answering the questions presented by the utility and the result will be an automatically generated package.json file at the root of the project that contains information about the project. It is worthy to note that the create-react-app isn't used since this is not a react project.

- Manually add the  "start": "node index.js" to the script dependency, this helps to be able to use the command 'npm start' to run the program

## NODEMON
- It's a dev dependency. Development dependencies are tools that are needed only during the development of the application, e.g. for testing or automatically restarting the application, like nodemon.

## EXPRESS
- It helps to ease server-side development with Node
- Run 'npm install express' to define it as a project dependency
- Express is imported but as a function that is used to create an express application stored in the app variable
- Route to the app is defined with an event handler that is used to handle HTTP GET requests made to the application's / root
- The event handler function accepts two parameters:
i) 'request': contains all of the information of the HTTP request 
ii) 'response': defines how the request is responded to
- The request is answered by using the' send' method of the response object.
- We can define parameters for routes in express by using the colon syntax.i.e '/api/notes/:id
- Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.i.e
a) Route path => /users/:userId/books/:bookId
b) Request URL => http://localhost:3000/users/34/books/8989
c) req.params => { "userId": "34", "bookId": "8989" }

## REST
-In REST, singular things are called 'resources' and every resource has an associated URL which is the resource's unique address
- Different operations on resource can be executed using HTTP verb. HTTP verbs are:
i) GET => fetches a single/all resources in the collection
ii) POST => creates a new resource based on the request data
iii) DELETE => removes the identified resource
iv) PUT => replaces the entire identified resource with the request data
v) PATCH => replaces a part of the identified resource with the request data
- The 'status() method' is for setting the status and the 'end() method' is for responding to the request without sending any data.

FETCHING A SINGLE RESOURCE
- If no data is attached to the response, we use the 'status()' method for setting the status and the 'end()' method for responding to the request without sending any data.

## POSTMAN
- This helps to test backend apps such as deleting an item from a resource instead of writing some JavaScript for testing deletion from the server
- Postman can be replaced with 'REST client'

## REST CLIENT
- This is a VS code plug in. It helps to send HTTP request and view the response in Visual Studio Code directly  
- To use, make a directory at the root of the application named 'requests'. We save all the REST client requests in the directory as files that end with the .rest extension.e.g get_all.rest
- Then, define the request you want.
- Click the Send Request text, the REST client will execute the HTTP request and the response from the server is opened in the editor.

## MIDDLEWARE
- These are functions that can be used for handling request and response objects. Examples middleware are morgan, json-parser,etc.
- The json-parser functions so that it takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called
# DEPLOYING APP TO THE INTERNET (PART 3b)
- Firstly, change the base url in the src/services folder in the frontend to match with the backend url even though, it still won't work due to SOP/CORS
- To  allow requests from other origins, there is need for Node's cors middleware.
- Install cors and declare like other middlewares as earlier used and the frontend works

a. Same-Origin Policy and CORS
- This is a security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities
- Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. 
- Both are not specific to React or Node. They are universal principles regarding the safe operation of web applications
- In short, CORS helps to link the backend to the frontend.i.e. helps the frontend to fetch data from the backend server 

b. Application to the internet
- There are some websites that helps with hosting of NodeJS.e.g. Fly.io, Render, Replit, CodeSandBox, etc
- For both Fly.io and Render, there is need to change the definition of the port the application uses at the bottom of the index.js file to 'const PORT = process.env.PORT || 3001' which is a port defined by the environmental variable or port 3001 (if the env'tal variable is ot available)

# Frontend production build
- When the application is deployed, create a production build with the command 'npm run build' in the root folder
- To serve the build folder from the backend, copy it from the frontend to the exact directory in the backend
- To make express show static content index.html and the JavaScript, etc.) it fetches, there is need for a built-in middleware from express called static which is added amidst the declarations of middlewares with 'app.use(express.static('build'))'
- Run the build command once again, push to git, update it on render
and boom, the site is ready


# ONLINE APPLICATION LINK
https://phonebook-backend-80gy.onrender.com/

# MongoDB
- For the data to be retrieved on mongo db, remove the angle brackets surrounding password in the url and replace the password with the database user password. Then run node mongo.js password in the CLI and view the data in browse collections on mongodb database deployment

# SCHEMA
- After establishing the connection to the database, schema and a matching model are both defined for the database
- The schema tells Mongoose how objects are to be stored in the database
- Models are so-called constructor functions that create new JavaScript objects based on the provided parameters
- Objects are saved to the database with the save method, which is provided with an event handler with the 'then()' method
- The event handler closes the database connection with the command mongoose.connection.close(). NB:
i) If the connection is not closed, the program will never finish its execution
ii) Do not close the connection in the wrong place else the code will not work
- If the entry contains whitespace characters, it must be enclosed in quotes .e.g "Mariam Ismael"
