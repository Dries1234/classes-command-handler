module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run(message) {
        if (message.author.bot || !message.content.startsWith(this.client.config.prefix)) return;
        
        const args = message.content.split(/\s+/g); // get the args
        const command = args.shift().slice(this.client.config.prefix.length); // get command name
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command)); // find the command
                
        if (!cmd) return; // if the command doesnt exist return

        if (cmd.cooldown.has(message.author.id)) return message.delete(); //if the person has a cooldown delete the command and return

        // if the command is not in a guild, and it should be. return
        if (cmd && !message.guild && cmd.conf.guildOnly)return message.channel.send( "This command is unavailable via private message. Please run this command in a guild.");


        
        cmd.setMessage(message);
        cmd.run(message, args);

        // Uncomment the line below this if you want to have commands deleted
        // message.delete();

        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id); //set the cooldown
    }
};