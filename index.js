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

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

client.on('messageCreate', async (message) => {
  if (message.content === '!formulario') {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('iniciar_form')
          .setLabel('🟢 Iniciar formulario')
          .setStyle(ButtonStyle.Success)
      );

    message.channel.send({
      content: "📋 Formulario de staff listo",
      components: [row]
    });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'iniciar_form') {

    await interaction.reply({ content: "📩 Revisa tu privado", ephemeral: true });

    interaction.user.send("📋 Empezamos tu formulario de staff. (Próximo paso: preguntas)");
  }
});
