# Login-Signup-Form-with-JWT-Tokens

Install necessary dependency using "npm" coomands while executing

Documentation for src/index.js

=> Express Setup: The code initializes an Express application by importing the express module and creating an instance of the Express app using express(). It also sets the port number for the server to listen on (process.env.PORT or 3000).

=> Middleware and Static Files: The code utilizes various middleware provided by Express. It uses express.json() middleware to parse incoming JSON requests, express.urlencoded() middleware to handle URL-encoded form data, and express.static() middleware to serve static files from the public directory.

=> JWT Authentication: The code imports the jsonwebtoken module for handling JSON Web Tokens (JWT). It includes a middleware function called authenticate that verifies the presence and validity of a JWT token in the request headers. This middleware is used to protect the /protected route.

=> User Registration: The code handles the /signup POST route, where it checks if the user already exists in the database (LogInCollection). If the user does not exist, the password is hashed using bcrypt and the user details are saved in the database. A JWT token is then created and sent back in the response.

=> User Login: The code handles the /login POST route, where it checks if the user exists in the database. If the user exists, it compares the provided password with the hashed password stored in the database using bcrypt.compare(). If the passwords match, a JWT token is created and sent back in the response.

=> Protected Route: The code includes a /protected GET route that is protected using the authenticate middleware. This route can only be accessed if a valid JWT token is provided in the request headers.

=> Views and Templating: The code sets up the view engine as hbs (Handlebars) and specifies the path to the view templates (tempelatePath). It uses the res.render() method to render the signup and login views, passing data to the views if necessary.

=> Error Handling: The code includes basic error handling using try-catch blocks to catch and handle any errors that may occur during user registration, login, or other operations. Error messages are sent back as responses to the client.

=> Logging and Debugging: The code includes console log statements at key points to indicate successful connections and operations, such as when the server is listening on the specified port.

=> Modularization: The code demonstrates modularization by separating the route handling logic and database operations into a separate module (LogInCollection). This promotes code organization, reusability, and maintainability.

=> Security: The code takes security measures by hashing user passwords using bcrypt before storing them in the database. It also uses JWT for authentication and protects certain routes using the authenticate middleware.

=> Flexibility: The code allows for flexibility in configuring the secret key used for JWT authentication (secretKey) and the paths for static files and views (publicPath and tempelatePath).


Documentation for src/mongo.js

=> Database Connection: The code imports the mongoose module and establishes a connection to a MongoDB database using the mongoose.connect() method. It specifies the database URL (mongodb://localhost:27017/LoginFormPractice) and handles the promise-based connection resolution.

=> Schema Definition: The code defines a schema for the LogInCollection collection using mongoose.Schema(). The schema specifies the structure and data types for the name, password, and email fields. It also sets the required flag for these fields, indicating that they must be present when creating a document.

=> Model Creation: The code creates a model named LogInCollection using mongoose.model(). The model is based on the defined schema and represents a collection in the MongoDB database. This model provides an interface for interacting with the database collection and performing CRUD (Create, Read, Update, Delete) operations.

=> Export: The code exports the LogInCollection model, making it available for use in other modules. This allows other parts of the application to access and work with the LogInCollection collection in the database.

=> Database Connection Logging: The code includes console log statements to indicate whether the connection to the MongoDB database was successful ('mongoose connected') or failed ('failed').

=> Reusability: By defining the schema and creating a model, the code promotes code reusability. Other parts of the application can import the LogInCollection model and use it to interact with the database, without needing to define the schema again.

=> Error Handling: The code handles errors that may occur during the database connection using the catch block. If the connection fails, it logs a failure message ('failed') to the console.

Overall, the code establishes a connection to a MongoDB database, defines a schema, creates a model, and exports the model for use in other modules. 
It provides a convenient way to interact with the LogInCollection collection in the database, allowing for CRUD operations and data manipulation.

