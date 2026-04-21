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

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

client.on('messageCreate', async (message) => {
  if (message.content === '!formulario') {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('empezar')
          .setLabel('Empezar')
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId('acabar')
          .setLabel('Acabar')
          .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
          .setCustomId('enviar')
          .setLabel('Enviar')
          .setStyle(ButtonStyle.Primary),
      );

    message.channel.send({
      content: "📋 Formulario Atheron",
      components: [row]
    });
  }
});
