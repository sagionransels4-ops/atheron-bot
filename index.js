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

let respuestas = {};

client.on('messageCreate', async (message) => {
  if (message.content === '!formulario') {

    respuestas[message.author.id] = [];

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('empezar')
          .setLabel('🟢 Empezar')
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId('acabar')
          .setLabel('🔴 Acabar')
          .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
          .setCustomId('enviar')
          .setLabel('📩 Enviar')
          .setStyle(ButtonStyle.Primary),
      );

    message.channel.send({
      content: "📋 **FORMULARIO ATHERON**\nSelecciona una opción:",
      components: [row]
    });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const userId = interaction.user.id;

  if (interaction.customId === 'empezar') {

    interaction.reply("🟢 Escribe tu respuesta:");

    const filter = m => m.author.id === userId;

    interaction.channel.awaitMessages({ filter, max: 1, time: 60000 })
      .then(collected => {
        const msg = collected.first().content;
        respuestas[userId].push(msg);
      });

  }

  if (interaction.customId === 'acabar') {
    respuestas[userId] = [];
    interaction.reply("🔴 Formulario cancelado");
  }

  if (interaction.customId === 'enviar') {
    interaction.reply("📨 Enviando formulario...");

    const canal = interaction.channel;

    canal.send(
      `📋 FORMULARIO ENVIADO\n\n` +
      respuestas[userId].map((r, i) => `Pregunta ${i + 1}: ${r}`).join("\n")
    );
  }
});
