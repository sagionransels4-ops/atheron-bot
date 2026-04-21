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

const sesiones = {};

const preguntas = [
"¿Cuál es tu experiencia como staff?",
"¿Has moderado antes?",
"¿Cuántas horas estás activo?",
"¿Cómo manejas conflictos?",
"¿Qué harías si un usuario insulta?"
];

client.on('messageCreate', (message) => {
  if (message.content === '!formulario') {

    sesiones[message.author.id] = {
      paso: 0,
      respuestas: []
    };

    message.channel.send("📋 Formulario iniciado");
    message.channel.send(preguntas[0]);
  }
});
