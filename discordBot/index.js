require('dotenv').config(); //initializes dotenv
const Discord = require('discord.js'); //imports discord.js
const { MessageEmbed } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { Client, Intents } = require('discord.js');

const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.GuildMembers,
  Discord.GatewayIntentBits.MessageContent
]})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
 if (message.content === '!ping') {
    message.reply('pong');
  }
});

client.on('messageCreate', (message) => {
  if (message.content === '!help') {
    message.reply('!ping - pong\n!help - this message\n!userinfo <@username> - user panel\n!serverinfo - server panel\n')
  }
});

const channel = client.channels.cache.find(channel => channel.name === channelName)

//console.log(bot.channels);

//const send =  client.channels.cache.get(channel.id) 

//const user = client.users.cache.get(UserID)

client.on('messageCreate', (message) => {
  if (message.content.startsWith('!userinfo')) {
    const mention = message.mentions.users.first();
    if (mention) {
      const UserID = mention.id;
      const user = client.users.cache.get(UserID);
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('User Profile')
        .setAuthor({ name: 'Skira Information Bot' })
        .addFields(
          { name: 'User Info:', value: user.tag },
          { name: 'Highest Ratings:' },
          { name: '\u200B', value: '\u200B' },

        );
      message.channel.send({ embeds: [embed] });
    } else {
      message.reply('Please mention a user!');
    }
  }
});

//const embed = new EmbedBuilder()
  //.setColor(0x0099FF)
  //.setTitle('User Profile')
  //.setURL('https://discord.js.org/')
  //.setAuthor({ name: 'Skira Information Bot' })
  //.setDescription('Some description here')
  //.addFields(
    //{ name: 'User Info:', value: user },
    //{ name: 'Highest Ratings:', value: 'Some value here' },
    //{ name: '\u200B', value: '\u200B' },
    //{ name: 'Inline field title', value: 'Some value here', inline: true },
    //{ name: 'Inline field title', value: 'Some value here', inline: true },
  //);

client.on('ready', () => {
  //console.log(`Logged in as ${client.user.tag}!`);

  //You can access the channels cache here
  const channel = client.channels.cache.find(channel => channel.name === 'channel-name');
  if (channel) {
    channel.send({ embeds: [embed] });
  } else {
    console.log('Channel not found');
  }
});

client.on('messageCreate', (message) => {
  if (message.content === '!userinfo') {
    send(message.channel.id, { embeds: [embed] });
  }
});

const send = async (channelId, content) => {
  const channel = client.channels.cache.get(channelId);
  if (!channel) {
    console.error(`Channel not found: ${channelId}`);
    return;
  }
  try {
    await channel.send(content);
  } catch (error) {
    console.error(`Error sending message: ${error}`);
  }
};

//this line must be at the very end
client.login(process.env.CLIENT_TOKEN); //signs the bot in with token