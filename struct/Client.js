const { Client, Collection } = require("discord.js"); //require from discord.js
const { readdir } = require("fs"); // we will be needing this to load commands and events

class CustomClient extends Client {
    constructor(options){
        super(options.clientOptions || {});
        /**
         * We will be storing our commands in this collection
         * @type {CDiscord.collection}
         */
        this.commands = new Collection(); 
        

        
        /**
         * We will be storing our aliases in this Collection
         * @type {Discord.collection}
         */
        this.aliases = new Collection()

        this.config = require('../config'); //Set our config file


        
       
    }
    // now lets define some functions
    /**
     * login function
     * @param {string} token The token used to login to the bot 
     */
    login(token){
        super.login(token)
        return this; //we return this so we can easily chain our commands if we want to
    }
 
    

   

    /**
     * Loads all commands in the directory
     * @param {String} path The path where the commands are located
     */
    loadCommands(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(cmd => {
                const command = new (require(`../${path}/${cmd}`))(this); // this requires the class in the command file

                this.commands.set(command.help.name, command);

                command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
            });
        });

        return this;
    }
    /**
     * Loads all events in the directory
     * @param {String} path The path where the events are located
     */
    loadEvents(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(evt => {
                const event = new (require(`../${path}/${evt}`))(this); //this requires the class in the event file

                super.on(evt.split(".")[0].toLowerCase(), (...args) => event.run(...args));
            });
        });

        return this;
    }

}
module.exports = CustomClient 
//Export our client!
//IF YOUVE REACHED THIS POINT GO TO Command.js
