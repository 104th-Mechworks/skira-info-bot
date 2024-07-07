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

const excludedRoleNames = ['@everyone','@3rd UK Divison','@12th Armoured Infantry Bridgade','@Brigadier','@Colonel','@Major','@Captain','@Squadron Commander','@Squadron Executive','@Wing Commander','@Squadron Leader','@Lieutenant','@2nd. Lieutenant','@Warrent Officer 1','@Warrent Officer 2','@Staff Sergeant,','@Fight Lieutentant','@Sergeant','@Corporal','@Flying Officer','@[NCO]','@Lance Corporal','@Pilot Officer','@Infantry Specialist','@Armour Trooper','@Armour Cadet','@Officer Cadet','@Private','@[Enlisted]','@[Skr] Trainee','@Reservist','@Community Member','@Headquarters Company','@{{3rd Rifles Infantry Battalion}}','@{Black Templars Platoon}','@{Place Holder Testing}','@Castellan','@Sword Brethren','@Apothecary','@Initiate','@Neophyte','@Aspirant','@{20th Hussars Armour Squadron}','@{20th Reserve Armoured Squadron}','@Armour School','@230 Aviation Squadron','@Flight School','@Training Company','@Training Platoon Alpha (UK/EU)','@Training Platoon Bravo (NA/WP)','@Auxiliary Company','@{Reserve Infantry Company}','@Event Organizer','@BLUEFOR','@REDFOR','@Red Devils','@Iron Wolves','@Golden Eagles','@Legionaries','@Ravens','@Regular','@OHM Clan [Ω]','@Raidr Clan [RAIDR]','@[6thAB]','@[MAD]','@Lost Legion Clan [LL]','@[CH_SQ]','@[HOG]','@[EBOO]','@[TGM]','@Squad Community','@Community Member','@Operation Skira','@Administration Team','@Recruitment Team','@Events Team','@Looking for Group','@Galactic Contention','@Middle Eastern Escalation','@Ready or Not','@Hell Let Loose','@Ground Branch','@Hearts of Iron 4','@Caliber','@Squad 44','@Helldivers','@Civilization VI','@Project Zomboid','@Stellaris','@Chivalry 2','@Project Reality','@Config Manager','@!ADMIN','@Server Senior Admin','@Server Admin','@Server Moderator','@Server Booster','@L.O.A.',"@Nyk's Boys",'@N.F.F.C.','@GMT','@EU','@EST/CST','@PST/MST','@WP','@Asia/Africa','@mark'];

client.on('messageCreate', (message) => {
  if (message.content.startsWith('!userinfo')) {
    const mention = message.mentions.users.first();
    if (mention) {
      const UserID = mention.id; //get the userID
      const user = client.users.cache.get(UserID); // get the user themself 
      const guild = message.guild; // Get the guild from the message
      const member = guild.members.cache.get(UserID); // Get the member from the guild
      const nickName = member.nickname; // Get the nickname of the member
      
      const roles = member.roles.cache.filter(role =>!excludedRoleNames.includes(`@${role.name}`) && role.name!== '@everyone').sort((a, b) => b.position - a.position).map(role => role.name).join(', ');

      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('User Profile')
        .setAuthor({ name: 'Skira Information Bot' })
        .addFields(
          { name: 'Discord Username:', value: user.tag, inline: true },
          { name: 'Server Username:', value: nickName, inline: true},
          { name: "\t", value: "\t" },
          { name: 'User ID:', value: user.id, inline: true },
          //{ name: "\t", value: "\t" },
          { name: 'Discord Join Date:', value: user.createdAt.toLocaleString(), inline: true },
          { name: "\t", value: "\t" },
          { name: 'Server Join Date:', value: guild.members.cache.get(user.id).joinedAt.toLocaleString(), inline: true }, // Use guild here
          { name: "\t", value: "\t" },
          { name: 'Roles:', value: roles, inline: true }, // Display the roles
        )
        .setFooter({ text: 'If there is any issues, dm "geek_x".' });
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