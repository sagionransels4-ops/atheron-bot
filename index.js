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
const sesiones = {};

const preguntas = [
"¿Experiencia como staff?",
"¿Has moderado antes?",
"¿Cuántas horas estás activo?",
"¿Cómo manejas conflictos?",
"¿Qué haces ante spam?",
"¿Tienes experiencia en Discord?",
"¿Sabes usar comandos básicos?",
"¿Cómo tratas usuarios problemáticos?",
"¿Por qué quieres ser staff?",
"¿Qué harías si otro staff falla?",
"¿Cómo reaccionas bajo presión?",
"¿Has sido staff antes?",
"¿Cómo manejas insultos?",
"¿Qué harías con un hacker?",client.on('messageCreate', async (message) => {
  if (message.content === '!formulario') {

    sesiones[message.author.id] = {
      paso: 0,
      respuestas: []
    };

    message.channel.send("📋 Iniciando formulario de staff...");
    message.channel.send(preguntas[0]);
  }
});

client.on('messageCreate', async (message) => {

  const sesion = sesiones[message.author.id];
  if (!sesion) return;

  sesion.respuestas.push(message.content);
  sesion.paso++;

  if (sesion.paso < preguntas.length) {
    message.channel.send(preguntas[sesion.paso]);
  } else {

    const canalStaff = message.guild.channels.cache.find(c => c.name === "revision-staff");

    canalStaff.send(
      "📋 NUEVA POSTULACIÓN STAFF\n\n" +
      sesion.respuestas.map((r, i) => `Q${i+1}: ${r}`).join("\n") +
      "\n\n⚠️ Pendiente de revisión"
    );

    message.channel.send("📨 Tu formulario fue enviado al staff.");

    delete sesiones[message.author.id];
  }
});
"¿Algo más que quieras añadir?"
];

const canalStaff = message.guild.channels.cache.find(c => c.name === "𝐒𝐭𝐚𝐟𝐟-𝐫𝐞𝐜𝐥𝐮𝐭𝐚𝐦𝐢𝐞𝐧𝐭𝐨");
