const Command = require('../struct/Command') //require the Command class

module.exports = class Ping extends Command{
    constructor(client){
        super(client,{
            name: 'ping',
            description: 'Ping command',
            category: 'information',
            usage: '', //usage is the arguments needed
            aliases: ['latency', 'pong'],
        
        })
    }
    async run(message,args){
        message.channel.send(`Pong ${this.client.ws.ping}ms`) //client is now accessed through this.client
    }
}
