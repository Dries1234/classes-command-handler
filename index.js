// !!!!!!! THIS FILE IS THE RUN FILE !!!!!!!!!

// Import custom client we will be making
const Client = require("./struct/Client");

// Initialise client
const client = new Client({config : './config'});

// Login with config token
client.login(client.config.token);

// Load commands with the loadCommands function in Client.js
client.loadCommands('./commands'); 

// Load events with the loadEvents function in Client.js
client.loadEvents('./events');

//Go to .env to see what your .env should look like
// Go to the config.js file to see what that should look like
//after that go to ./struct/Client.js