class Command {
    constructor(
        client,
        {
            name = null, //set default name to null, we will be providing it anyways
            description = "No description provided.", // set default description to this
            category = "Other", //set default category to other
            usage = "No usage provided.", //set default example usage to no example usage
            enabled = true, //default enabled to true
            guildOnly = true, //default make the command only work in guilds, if this is false it works in dms
            aliases = new Array(), //set aliases to be an array
            cooldown = 1000//Set default cooldown to 1 second
        }
    ) {
        this.client = client; //initialise the client used in the command
        this.cooldown = new Set() //we will be storing user id's on cooldown here
        this.conf = { enabled, guildOnly, aliases, cooldown }; // this is the basic config
        this.help = { name, description, category, usage }; //we name this help because these are used in a help command
    }
    startCooldown(user) {
        // Adds the user to the set
        this.cooldown.add(user);

        // Removes the user from the set after the cooldown is done
        setTimeout(() => {
            this.cooldown.delete(user);
        }, this.conf.cooldown);
    }

    setMessage(message) {
        this.message = message; //set message to the message value
    }

}
module.exports = Command;
