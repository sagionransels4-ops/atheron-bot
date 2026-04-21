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

const preguntas = [
"¿Experiencia como staff?",
"¿Has moderado antes?",
"¿Cuántas horas estás activo?",
"¿Cómo manejas conflictos?",
"¿Qué harías si alguien insulta?",
"¿Tienes experiencia en Discord?",
"¿Sabes usar comandos básicos?",
"¿Cómo actuarías con spam?",
"¿Por qué quieres ser staff?",
"¿Cómo manejas presión?"
];

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'iniciar_form') {

    const user = interaction.user;

    sesiones[user.id] = {
      paso: 0,
      respuestas: []
    };

    await interaction.reply({ content: "📩 Formulario iniciado en privado", ephemeral: true });

    user.send("📋 Empezando formulario...");
    user.send(preguntas[0]);
  }
});

client.on('messageCreate', async (message) => {

  if (message.guild) return; // solo DM

  const sesion = sesiones[message.author.id];
  if (!sesion) return;

  sesion.respuestas.push(message.content);
  sesion.paso++;

  if (sesion.paso < preguntas.length) {
    message.author.send(preguntas[sesion.paso]);
  } else {
    message.author.send("📋 Formulario terminado. (próximo paso: enviar/cancelar)");
  }
});
