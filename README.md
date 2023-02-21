# Part 3a (Node.js and Express)
a. Package.json Installation
- In node, package.json is installed by running 'npm init' in the root folder of the project, and completed by answering the questions that it brings. It is worthy to note that the create-react-app isn't used since this is not a react project.

- Manually add the  "start": "node index.js" to the script dependency, this helps to be able to use the command 'npm start'

b. REST
-In REST, singular things are called 'resources' and every resource has an associated URL which is the resource's unique address

- Development dependencies are tools that are needed only during the development of the application, e.g. for testing or automatically restarting the application, like nodemon.

FETCHING A SINGLE RESOURCE
- If no data is attached to the response, we use the 'status()' method for setting the status and the 'end()' method for responding to the request without sending any data.

c. POSTMAN
- This helps to test backend apps such as deleting an item from a resource instead of writing some JavaScript for testing deletion from the server
- Postman can be replaced with 'REST client'

d. REST CLIENT
- This is a VS code plug in. It helps to send HTTP request and view the response in Visual Studio Code directly  
- To use, make a directory at the root of the application named requests. We save all the REST client requests in the directory as files that end with the .rest extension.

e. MIDDLEWARE
- These are functions that can be used for handling request and response objects. An example of middleware is morgan.

# Part 3b (Deploying app to the internet)
a. Same-Origin Policy and CORS
- This is a security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities
- Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. 
- Both are not specific to React or Node. They are universal principles regarding the safe operation of web applications
- In short, CORS helps to link the backend to the frontend.i.e. helps the frontend to fetch data from the backend server 

b. Application to the internet
- There are some websites that helps with hosting of NodeJS.e.g. Fly.io, Render, Replit, CodeSandBox, etc
- For both Fly.io and Render, there is need to change the definition of the port the application uses at the bottom of the index.js file to 'const PORT = process.env.PORT || 3001' which is a port defined by the environmental variable or port 3001 (if the env'tal variable is ot available)