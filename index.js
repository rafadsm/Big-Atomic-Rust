const Discord = require('discord.js');
const SourceQuery = require('sourcequery');

const BOT_TOKEN = process.env.BOT_TOKEN;
const RUST_IP = process.env.RUST_IP;
const RUST_PORT = process.env.RUST_PORT;

const OnlineStr = "Players Online";
const OfflineStr = "Offline";



const client = new Discord.Client();
var sq = new SourceQuery(1500);
<<<<<<< HEAD
var ws = new WS(BOT_TOKEN, 80, client)

console.log(BOT_TOKEN)
=======
>>>>>>> parent of 4453832... test server

const TermosMessage = "```Você concorda com os termos? Responda reagindo abaixo para ter acesso ao discord.```";

function GetMyGuild()
{
    return client.guilds.find(guild => guild.id == 388044994210168832);
}
const prefix = '!';

client.on('ready', () => {


    console.log(`Conectado como ${client.user.tag}!`);

    client.user.setStatus('dnd');

    const cntwo = client.channels.find(cn => cn.id == 514455704686428161);

    cntwo.fetchMessages({limit: 100}).then(messages => messages.forEach(x => {
        if(x.content == TermosMessage)
        x.delete();
    }));

    cntwo.send(TermosMessage).then(msg =>{
        msg.react('👍');
        setTimeout(() => msg.react('👎'), 500);
    });

  try{
    sq.open(RUST_IP, RUST_PORT);

    sq.getInfo(function(err, info){
        if (err)
        {
            client.user.setActivity(OfflineStr, { type: 'PLAYING' });
        }
        else
			client.user.setActivity(`${info.players} ${OnlineStr}`, {type: 'WATCHING'});
            sq.close();
        });
        
    }
    catch(ex)
    {
        client.user.setActivity(OfflineStr, {type: 'PLAYING'});
    }

});

client.on('message', message => {

    const user = message.member;
    const author = message.author;
    const channel = message.channel;
    
    if (author.bot) return;

    if (message.isMentioned(client.user)) {
        
        if(isAdmin)
        {
            message.react("👍");
            return;
        }
        message.reply('Sou apenas um bot, não tenho capacidade para continuar esta conversa.').then(function(msg){
            msg.react("👍");
            message.react("👎");
        });

        return;
    }
    
    if(!channel.name)
    {
        message.reply('Sou apenas um bot, não tenho capacidade para continuar esta conversa.').then(function(msg){
            msg.react("👍");
            message.react("👎");
        });
        return;
    }

    if(message.content[0] != prefix || message.content[1] == ' ')
        return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const isAdmin = message.member.hasPermission("ADMINISTRATOR");

    switch(command)
    {
        case 'sayr':
        {
            if(!isAdmin)
                return;

            message.delete();
            channel.send(args.join(' ')).then(function(msg){
                msg.react("👍");
            });
        }
        break;

        case 'say':
        {
            if(!isAdmin)
                return;

            
            channel.send(args.join(' ')).then(function(msg){
                message.delete();
            });
        }
        break;

        case 'termos':
        {
            if(!isAdmin)
            return;
            channel.send(TermosMessage).then(msg =>{
                msg.react('👍');
                msg.react('👎');
            })
        }
        break;

        case 'prune':
        {
            if(!isAdmin)
                return;

            channel.fetchMessages({limit: 100}).then(messages => channel.bulkDelete(messages));
        }
        break;
    }
});



client.on("guildMemberAdd", (member) => {
    const cntwo = client.channels.find(cn => cn.id == 514534673712676865);
    cntwo.send(member.user + " Seja bem vindo, para ter acesso ao discord, vá até #termos-discord e aceite os termos!");
});


client.on('messageReactionAdd', (reaction, user) => {

    if(user.bot)
        return;
        
    if(reaction.message.content == TermosMessage) {

        const member = GetMyGuild().members.find(m => m.id == user.id)

        if(member.hasPermission("ADMINISTRATOR"))
            return;
        
        if(reaction.emoji.name == '👍')
        {
            let role = GetMyGuild().roles.find(r => r.name === "Membro");
            member.addRole(role);

            user.send("Agora você faz parte de nosso discord!\nTome cuidado para não ser expulso.");
        }
        if(reaction.emoji.name == '👎')
        {
            user.send("Você não concordou com os termos, sinto muito, você não é bem-vindo aqui!");
            setTimeout(() => member.kick(), 500);
        }
    }
});

client.login(BOT_TOKEN);

var interv = setInterval(()=>{
    try{
        sq.open(RUST_IP, RUST_PORT);
        sq.getInfo(function(err, info){
            
            if (err) {
                client.user.setActivity(OfflineStr, { type: 'PLAYING' });
            }
            else
				client.user.setActivity(`${info.players} ${OnlineStr}`, {type: 'WATCHING'});
            //client.user.setPresence()
            sq.close();
        });
        
    }
    catch(ex)
    {
        client.user.setActivity(OfflineStr, {type: 'PLAYING'});
    }
}, 5000);

function ShutdownBotServer()
{
    clearInterval(interv);
    sq.close();

    client.destroy();
    process.exit(0);
}

[`exit`, 'SIGINT', `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, ShutdownBotServer);
});




