# TestUserApp
Test Interview React and Node JS test


Technical Sample Application

Using Node.js and React create a set of REST services that can be used to manage a
User class. The user object shall contain the following properties: 
```JSON
{
    "userObj": {
        "type": "object",
        "properties": {
            "id": {
                "type": "guid",
                "required": true
                },
            "userName": {
                "type": "string",
                "required": true
                },
            "givenName": {
                "type": "string",
                "required": false
            },
            "surName": {
                "type": "string",
                "required": false
            },
            "DOB": {
                "type": "string",
                "required": false
            }
        }
    }
}
```

The most important success factor is to produce the best solution you can to
solve the problem. There are many aspects to consider within that context -
efficiency, performance, documentation,etc. Code to perform the algorithm is
the minimum requirement. 



Your deliverable should contain enough to give us a
glimpse into your analysis, your approach, your skills, or anything else
that will demonstrate your ability as a software developer. We will be
looking for a good approach, a glimpse into your thought process, things you
can do to impress us, and clean and efficient code.

Your deliverable will be something that we can execute (to test the
results) along with whatever explanation of the code/program that you feel
is necessary.  



Attached is a node.js/Express application skeleton. You will need to install the node
package manager (npm) and run: npm install in the sample application
directory to install dependencies. 



## About the app
Actually, there are two separated apps. The Client which serves the FrontEnd (using React), and the API (in Node/Express).

## How to run the API
1. In your terminal, navigate to the `api` directory.
2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the app.

## How to run the Client
1. In another terminal, navigate to the `client` directory.
2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the app

## Check if they are connected
1. With the two apps running, open your browser in http://localhost:3000/.
2. If you see a webpage saying `Welcome to React`, it means the FrontEnd is working.
3. If the same webpage has the phrase `API is working properly`, it means the API is working.
4. Enjoy!