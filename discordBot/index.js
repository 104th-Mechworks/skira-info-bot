require('dotenv').config(); //initializes dotenv
const Discord = require('discord.js'); //imports discord.js
const { MessageEmbed } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { Client, Intents } = require('discord.js');
const { ActivityType } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { SelectMenuBuilder } = require('discord.js');

const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.GuildMembers,
  Discord.GatewayIntentBits.MessageContent
]})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Operation Skira! Bot is WIP and therefore is only up from around 10am-11pm BST.', { type: ActivityType.Playing });
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

client.on('messageCreate', (message) => {
  if (message.content === '!howto') {
    message.reply("HOW TO GUIDE:\nStep 1: Type !userinfo and mention the user you want it to ping.\nStep 2: Profit!\nIf the bot doesn't output anything/is offline, then it is down. Ping @geek_x and ask for them to put it back up again.")
  }
});


//const channel = client.channels.cache.find(channel => channel.name === channelName)

//console.log(bot.channels);

//const send =  client.channels.cache.get(channel.id) 

//const user = client.users.cache.get(UserID)

const excludedRoleNames = ['@everyone','@Brigadier','@Colonel','@Major','@Captain','@Squadron Commander','@Squadron Executive','@Wing Commander','@Squadron Leader','@Lieutenant','@2nd. Lieutenant','@Warrent Officer 1','@Warrent Officer 2','@Staff Sergeant,','@Fight Lieutentant','@Sergeant','@Corporal','@Flying Officer','@[NCO]','@Lance Corporal','@Pilot Officer','@Infantry Specialist','@Armour Trooper','@Armour Cadet','@Officer Cadet','@Private','@[Enlisted]','@[Skr] Trainee','@Reservist','@Community Member','@Castellan','@Sword Brethren','@Apothecary','@Initiate','@Neophyte','@Aspirant','@Armour School','@Event Organizer','@BLUEFOR','@REDFOR','@Red Devils','@Iron Wolves','@Golden Eagles','@Legionaries','@Ravens','@Regular','@OHM Clan [Ω]','@Raidr Clan [RAIDR]','@[6thAB]','@[MAD]','@Lost Legion Clan [LL]','@[CH_SQ]','@[HOG]','@[EBOO]','@[TGM]','@Squad Community','@Community Member','@Operation Skira','@Administration Team','@Recruitment Team','@Events Team','@Looking for Group','@Galactic Contention','@Middle Eastern Escalation','@Ready or Not','@Hell Let Loose','@Ground Branch','@Hearts of Iron 4','@Caliber','@Squad 44','@Helldivers','@Civilization VI','@Project Zomboid','@Stellaris','@Chivalry 2','@Project Reality','@Config Manager','@!ADMIN','@Server Senior Admin','@Server Admin','@Server Moderator','@Server Booster','@L.O.A.',"@Nyk's Boys",'@N.F.F.C.','@GMT','@EU','@EST/CST','@PST/MST','@WP','@Asia/Africa','@mark'];
const userinfo = require('./userinfo');

client.on('messageCreate', (message) => {
  if (message.content.startsWith('!userinfo')) {
    userinfo.handleUserinfoCommand(client, message, excludedRoleNames);
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
