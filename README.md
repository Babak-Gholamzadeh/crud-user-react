# Test User React

This is a test project for implementing some `CRUD` operations with both Server side and Client side.

Here you are able to do some operations like:

- `Create a new user`
- `Fetch all the existing users`
- `Fetch only one user`
- `Edit the info of a user`
- `Remove a user`

This project has been implemented as a full-stack project.

The client-side is a Single Web Application that has been implemented with [ReactJS](reactjs.org/) and communicates with the server through some Restful APIs.

The Server side is also a [Node.js](https://nodejs.org/) web service that uses [Express.js](https://expressjs.com/) framework to serve the Restful APIs.

Also, the project doesn't use any database and just uses a `JSON` file to store/fetch the data to make the project to be deployed and run much simpler.

---

## Getting Started

After cloning the whole repository, for running the project in the `development` mode, you can run each side (Server and Client) separately.

### Start the Server

In order to run the Server, first, you need to go to the `./api` directory from the root of the repository.

```bash
cd ./api
```

#### Config the Server

Here there exists a file named `.env.example` which contains some environment variable that is used inside the project.

You should rename it to `.env` and fill the variables.

```bash
mv .env.example .env
```

The file only containes one variable which is the defined `PORT` for the server to listen to it.

You can put your desire port number here or just copy the line below in the file:

```
PORT = 9000
```

#### Install the Server Dependencies

Now you need to install the Server dependencies by running the following code:

```bash
npm install
```

or

```bash
yarn install
```

After installing the dependencies, the Server is ready to be run.

#### Run the Server

For running the Server there are some scripts in the `package.json` file that you can take advantage of them.

Run the project in development mode:

```bash
npm run start:dev
```

_Or use `yarn` if it works better for you_

#### Test the Server

And also there are some integration tests in the `./tests` directory that you can execute them by running this command:

```bash
npm test
```

#### Add some dummy data

At this point the server is ready to work, but there is any pre-defined data to be fetched.

By running the command below you can create some dummy user data:

```bash
npm run seed 100  # Put the number of records you want to be generated (default is 10)
```

### Start the Client

In order to run the Client, first, you need to go to the `./client` directory from the root of the repository.

```bash
cd ./client
```

#### Config the Client

Here there exists a file named `.env.example` which contains some environment variable that is used inside the project.

You should rename it to `.env` and fill the variable.

```bash
mv .env.example .env
```

The only variable here is the URL of the server.

You can fill the variable based on your Server config, or just use the sample value below if you have the same config as the sample values here for your Server:

```
REACT_APP_SERVER_URL = http://localhost:9000
```

#### Install the Client Dependencies

Now you need to install the Client dependencies by running the following code:

```bash
npm install
```

or

```bash
yarn install
```

After installing the dependencies, the Client is ready to be run.

#### Run the Client

If you are familiar with the [create-react-app](https://create-react-app.dev/) tool, you probably know about the useful script inside the `package.json` file that you can take advantage of them.

Run the project in development mode:

```bash
npm start
```

_Or use `yarn` if it works better for you_

Now the Client is ready, and you can play with that.

---

## Project Structure

### Server Directory Structure

```bash
|   app.js                    # Express app
|   seed.js                   # Generate dummy data
+---bin                       # Server entry point
+---controllers               # The controller layer
+---data                      # The data that is store on the disk (as a DB)
+---docs                      # Swagger Restful APIs documentation
+---middlewares
|   +---express-error-handler # Hanlde the errors and structure error responses
|   \---validation            # Validate the request body data by using Ajv pkg
+---routes                    # Define routes and call the controllers
+---services                  # Business logic (Service layer)
+---tests                     # Includes some integeration tests
\---utils                     # some useful generic utilities and are used in any project

```

### Client Directory Structure

```bash
+---public
\---src
    |   App.js                # App components which handle the routing
    |   index.js              # Client entry point and also contains the provider components
    +---assets                # Static files that are imported in the Components
    |   \---images
    +---components            # All the Components of the project
    |   +---AddButton         # The button for redirecting to Create user page
    |   +---ConfirmDialog     # The confirmation dialog box that is shown to delete user
    |   +---ErrorDialog       # The dialog box for showing errors
    |   +---Form              # The form that is used for both creating and editing a user
    |   |   +---ButtonInput
    |   |   \---TextInput
    |   +---Header            # Header of the site that is shown the project name
    |   +---List              # The list of users in the Home page
    |   |   +---DeleteButton  # The button for delete a user
    |   |   \---EditButton    # The button to redirect to Edit user page
    |   +---Pagination        # The pagination arrows that is shown in the Home page for loading another chunk of data
    |   +---Spinning          # Uses to show a spining animation to represent the loading process
    |   \---SpinningDialog    # The dialog box to show the spinning animation
    +---pages
    |   +---CreateUser        # The layout to represent the form for creating a new user and handle related states
    |   +---EditUser          # The layout to represent the form for editing a user and handle related states
    |   \---Home              # The layout to represent the required components on the Home page and track some necessary states
    \---utils
```

---

## API Documentation

The API documentation is generated by using [Swagger](https://swagger.io/), and it is accessible via the `/docs` endpoint.
