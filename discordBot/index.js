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
      
      const UserID = mention.id; //get the userID
      const user = client.users.cache.get(UserID); // get the user themself 
      const guild = message.guild; // Get the guild from the message
      
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('User Profile')
        .setAuthor({ name: 'Skira Information Bot' })
        .addFields(
          { name: 'User Info:', value: user.tag, inline: False },
          { name: 'User ID:', value: user.id, inline: False },
          { name: 'Discord Join Date:', value: user.createdAt.toLocaleString(), inline: False },
          { name: 'Server Join Date:', value: guild.members.cache.get(user.id).joinedAt.toLocaleString(), inline: False }, // Use guild here
          //{ name: '\u200B', value: '\u200B' },
          //{ name: 'Rank:', value: 'Some value here' },
          //{ name: 'MOS', value: 'Some Value here'},
          { name: '\u200B', value: '\u200B', inline: False },
          { name: 'Battalion:', value: 'Some value here', inline: False },
          { name: 'Company:', value: 'Some value here', inline: False },
          { name: 'Platoon:', value: 'Some value here', inline: False },
          //{ name: '\u200B', value: '\u200B' },
          { name: 'Highest Leadership Rating:', value: 'Some value here', inline: True},
          { name: '\u200B', value: '\u200B', inline: True },
          { name: 'Highest Rifle Rating:', value: 'Some value here', inline: True },
          { name: 'Highest Medical Rating:', value: 'Some value here', inline: True },
          { name: '\u200B', value: '\u200B', inline: True },
          { name: 'Highest Explosive Rating:', value: 'Some value here', inline: True },
          { name: 'Highest Weapons Rating:', value: 'Some value here', inline: True },
          { name: '\u200B', value: '\u200B', inline: True },
          { name: 'Highest Pilot Rating:', value: 'Some value here', inline: True },
          { name: '\u200B', value: '\u200B', inline: True },
          { name: 'Armour Leader Rating:', value: 'Some value here', inline: True },
          { name: 'Armour Gunning Rating:', value: 'Some value here', inline: True },
          { name: 'Armour Driver Ratings:', value: 'Some value here', inline: True }
        );
      message.channel.send({ embeds: [embed] });
    } else {
      message.reply('Please mention a user!');
    }
  }
});

//client.on('ready', () => {
  //console.log(`Logged in as ${client.user.tag}!`);

  //You can access the channels cache here
  //const channel = client.channels.cache.find(channel => channel.name === 'channel-name');
 // if (channel) {
    //channel.send({ embeds: [embed] });
  //} else {
    //console.log('Channel not found');
  //}
//});

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