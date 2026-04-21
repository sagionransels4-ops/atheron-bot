const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log('?? Atheron Bot está encendido');
});

client.on('messageCreate', message => {
  if (message.content === '!hola') {
    message.reply('?? Atheron activo');
  }
});

client.login(process.env.TOKEN);

client.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    message.reply('🏓 Pong!');
  }
});

