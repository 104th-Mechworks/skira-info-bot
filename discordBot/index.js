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

client.on('messageCreate', (message) => {
  if (message.content.startsWith('!passbct')) {
    // Get the mentioned user
    const mentionedUser = message.mentions.users.first();
  
    // Check if a user was mentioned
    if (!mentionedUser) {
      return message.reply('Please mention a user!');
    }
  
    // Get the guild member object
    const member = message.guild.members.cache.get(mentionedUser.id);
  
    // Check if the member exists
    if (!member) {
      return message.reply('That user is not a member of this server!');
    }
  
    // Define the roles to give
    const rolesToGive = ['BCT Certified', 'Role 2', 'Role 3']; // Replace with the actual role names
  
    // Give the roles
    rolesToGive.forEach(roleName => {
      const role = message.guild.roles.cache.find(r => r.name === roleName);
      if (role) {
        member.roles.add(role);
      } else {
        console.log(`Role ${roleName} not found!`);
      }
    });
  
    // Send a success message
    message.reply(`Roles given to ${mentionedUser.username}!`);
  }
});

const channel = client.channels.cache.find(channel => channel.name === channelName)

//console.log(bot.channels);

//const send =  client.channels.cache.get(channel.id) 

//const user = client.users.cache.get(UserID)

const excludedRoleNames = ['@everyone','@Brigadier','@Colonel','@Major','@Captain','@Squadron Commander','@Squadron Executive','@Wing Commander','@Squadron Leader','@Lieutenant','@2nd. Lieutenant','@Warrent Officer 1','@Warrent Officer 2','@Staff Sergeant,','@Fight Lieutentant','@Sergeant','@Corporal','@Flying Officer','@[NCO]','@Lance Corporal','@Pilot Officer','@Infantry Specialist','@Armour Trooper','@Armour Cadet','@Officer Cadet','@Private','@[Enlisted]','@[Skr] Trainee','@Reservist','@Community Member','@Castellan','@Sword Brethren','@Apothecary','@Initiate','@Neophyte','@Aspirant','@Armour School','@Event Organizer','@BLUEFOR','@REDFOR','@Red Devils','@Iron Wolves','@Golden Eagles','@Legionaries','@Ravens','@Regular','@OHM Clan [Ω]','@Raidr Clan [RAIDR]','@[6thAB]','@[MAD]','@Lost Legion Clan [LL]','@[CH_SQ]','@[HOG]','@[EBOO]','@[TGM]','@Squad Community','@Community Member','@Operation Skira','@Administration Team','@Recruitment Team','@Events Team','@Looking for Group','@Galactic Contention','@Middle Eastern Escalation','@Ready or Not','@Hell Let Loose','@Ground Branch','@Hearts of Iron 4','@Caliber','@Squad 44','@Helldivers','@Civilization VI','@Project Zomboid','@Stellaris','@Chivalry 2','@Project Reality','@Config Manager','@!ADMIN','@Server Senior Admin','@Server Admin','@Server Moderator','@Server Booster','@L.O.A.',"@Nyk's Boys",'@N.F.F.C.','@GMT','@EU','@EST/CST','@PST/MST','@WP','@Asia/Africa','@mark'];

client.on('messageCreate', (message) => {
  if (message.content.startsWith('!userinfo')) {
    const mention = message.mentions.users.first();
    if (mention) {
      const UserID = mention.id; //get the userID
      const user = client.users.cache.get(UserID); // get the user themself 
      const guild = message.guild; // Get the guild from the message
      const member = guild.members.cache.get(UserID); // Get the member from the guild
      const nickName = member.nickname; // Get the nickname of the member
      
      const roles = member.roles.cache.filter(role =>!excludedRoleNames.includes(`@${role.name}`) && role.name!== '@everyone').sort((a, b) => b.position - a.position).map(role => role.name).join("\n");

      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('User Profile')
        .setAuthor({ name: 'Skira Information Bot' })
        .addFields(
          { name: 'Discord Username:', value: user.tag, inline: true },
          { name: 'Server Username:', value: nickName, inline: true},
          //{ name: "\t", value: "\t" },
          { name: 'User ID:', value: user.id, inline: true },
          { name: "\t", value: "\t" },
          { name: 'Discord Join Date:', value: user.createdAt.toLocaleString(), inline: true },
          //{ name: "\t", value: "\t" },
          { name: 'Server Join Date:', value: guild.members.cache.get(user.id).joinedAt.toLocaleString(), inline: true }, // Use guild here
          { name: "\t", value: "\t" },
          { name: 'Roles:', value: roles, inline: true }, // Display the roles
        )
        .setFooter({ text: 'If there is any issues, dm "geek_x".' });

        const row1 = new ActionRowBuilder()
        .addComponents(
           new ButtonBuilder()
            .setCustomId('rating-roles')
            .setLabel('Add Rating Roles')
            .setStyle(ButtonStyle.Success),
           new ButtonBuilder()
            .setCustomId('medbay-roles')
            .setLabel('Add Medbay Roles')
            .setStyle(ButtonStyle.Success),
           new ButtonBuilder()
            .setCustomId('battalion-roles')
            .setLabel('Add Battalion Roles')
            .setStyle(ButtonStyle.Success),
         );
       
       const row2 = new ActionRowBuilder()
        .addComponents(
           new ButtonBuilder()
            .setCustomId('company-roles')
            .setLabel('Add Company Roles')
            .setStyle(ButtonStyle.Success),
           new ButtonBuilder()
            .setCustomId('remove-roles')
            .setLabel('Remove Roles')
            .setStyle(ButtonStyle.Danger),
         );
       
       message.reply({ embeds: [embed], components: [row1, row2] });
       

        client.on('interactionCreate', async interaction => {
          if (!interaction.isButton() && !interaction.isSelectMenu()) return;
        
          if (interaction.isButton()) {
            switch (interaction.customId) {
              case 'rating-roles':
                const ratingRoles = [
                  { label: "Leadership Ratings", value: "Leadership Ratings" },
                  { label: "Rifle Ratings", value: "Rifle Ratings" },
                  { label: "Medical Ratings", value: "Medical Ratings"},
                  { label: "Explosive Ratings", value: "Explosive Ratings" },
                  { label: "Weapon Ratings", value: "Weapon Ratings" },
                  { label: "Pilot Ratings", value: "Pilot Ratings" },
                  { label: "Armoured Leadership Ratings", value: "Armoured Leadership Ratings" },
                  { label: "Gunning Ratings", value: "Gunning Ratings" },
                  { label: "Driver Ratings", value: "Command Ratings" },
                  { label: "BCT Certified", value: "BCT Certified" },
                ];
        
                const ratingCat = new ActionRowBuilder()
                  .addComponents(
                    new SelectMenuBuilder()
                      .setCustomId('rating-select')
                      .setPlaceholder('Select a rating role')
                      .addOptions(ratingRoles),
                  );
        
                await interaction.reply({ content: 'Select a rating role:', components: [ratingCat] });
                break;
            }
          } else if (interaction.isSelectMenu()) {
            switch (interaction.customId) {
              case 'rating-select':
                const selectedRole = interaction.values[0];
                const rolesForSelectedRole = [];
        
                // Generate roles based on the selected role
                switch (selectedRole) {
                  case "Leadership Ratings":
                    rolesForSelectedRole.push({ label: "Leadership Rating: Commander", value: "Leadership Rating: Commander" });
                    rolesForSelectedRole.push({ label: "Leadership Rating: Senior Squad Lead", value: "Leadership Rating: Senior Squad Lead" });
                    rolesForSelectedRole.push({ label: "Leadership Rating: Squad Leader", value: "Leadership Rating: Squad Leader" });
                    rolesForSelectedRole.push({ label: "Leadership Rating: Senior Team Lead", value: "Leadership Rating: Senior Team Lead" });
                    rolesForSelectedRole.push({ label: "Leadership Rating: Team Leader", value: "Leadership Rating: Team Leader" });
                    rolesForSelectedRole.push({ label: "Leadership Rating: Marker Rated", value: "Leadership Rating: Marker Rated" });
                    rolesForSelectedRole.push({ label: "Leadership Rating: Trooper Rated", value: "Leadership Rating: Trooper Rated" });
                    rolesForSelectedRole.push({ label: "Leadership Rating: No Rating", value: "Leadership Rating: No Rating" });
                    break;
                  case "Rifle Ratings":
                    rolesForSelectedRole.push({ label: "Rifle Rating: Rifle Expert", value: "Rifle Rating: Rifle Expert" });
                    rolesForSelectedRole.push({ label: "Rifle Rating: Rifle Specialist", value: "Rifle Rating: Rifle Specialist" });
                    rolesForSelectedRole.push({ label: "Rifle Rating: Sharpshooter Rated", value: "Rifle Rating: Sharpshooter Rated" });
                    rolesForSelectedRole.push({ label: "Rifle Rating: Shooter Rated", value: "Rifle Rating: Shooter Rated" });
                    rolesForSelectedRole.push({ label: "Rifle Rating: Rifle Trained", value: "Rifle Rating: Rifle Trained" });
                    rolesForSelectedRole.push({ label: "Rifle Rating: No Rating", value: "Rifle Rating: No Rating" });
                    break;
                  case "Medical Ratings":
                    rolesForSelectedRole.push({ label: "Medical Rating: Guardian Angel", value: "Medical Rating: Guardian Angel" });
                    rolesForSelectedRole.push({ label: "Medical Rating: Primary Medic", value: "Medical Rating: Primary Medic" });
                    rolesForSelectedRole.push({ label: "Medical Rating: Secondary Medic", value: "Medical Rating: Secondary Medic" });
                    rolesForSelectedRole.push({ label: "Medical Rating: First Aid Trained", value: "Medical Rating: First Aid Trained" });
                    rolesForSelectedRole.push({ label: "Medical Rating: No Rating", value: "Medical Rating: No Rating" });
                    break;
                  case "Explosive Ratings":
                    rolesForSelectedRole.push({ label: "Explosive Rating: Explosive Expert", value: "Explosive Rating: Explosive Expert" });
                    rolesForSelectedRole.push({ label: "Explosive Rating: Explosive Specialist", value: "Explosive Rating: Explosive Specialist" });
                    rolesForSelectedRole.push({ label: "Explosive Rating: Mortar Man", value: "Explosive Rating: Mortar Man" });
                    rolesForSelectedRole.push({ label: "Explosive Rating: ENGR + HAT Rated", value: "Explosive Rating: ENGR + HAT Rated" });
                    rolesForSelectedRole.push({ label: "Explosive Rating: HAT Rated", value: "Explosive Rating: HAT Rated" });
                    rolesForSelectedRole.push({ label: "Explosive Rating: LAT Rated", value: "Explosive Rating: LAT Rated" });
                    rolesForSelectedRole.push({ label: "Explosive Rating: ENGR Rated", value: "Explosive Rating: ENGR Rated" });
                    rolesForSelectedRole.push({ label: "Explosive Rating: Rookie LAT", value: "Explosive Rating: Rookie LAT" });
                    rolesForSelectedRole.push({ label: "Explosive Rating: Rookie ENGR", value: "Explosive Rating: Rookie ENGR" });
                    rolesForSelectedRole.push({ label: "Explosive Rating: No Rating", value: "Explosive Rating: No Rating" });
                    break;
                  case "Weapon Ratings":
                    rolesForSelectedRole.push({ label: "Weapons Rating: Weapons Expert", value: "Weapons Rating: Weapons Expert" });
                    rolesForSelectedRole.push({ label: "Weapons Rating: Weapons Specialist", value: "Weapons Rating: Weapons Specialist" });
                    rolesForSelectedRole.push({ label: "Weapons Rating: Scout Rated", value: "Weapons Rating: Scout Rated" });
                    rolesForSelectedRole.push({ label: "Weapons Rating: Sniper Rated", value: "Weapons Rating: Sniper Rated" });
                    rolesForSelectedRole.push({ label: "Weapons Rating: LMG Rated", value: "Weapons Rating: LMG Rated" });
                    rolesForSelectedRole.push({ label: "Weapons Rating: AR Rated", value: "Weapons Rating: AR Rated" });
                    rolesForSelectedRole.push({ label: "Weapons Rating: MKM Rated", value: "Weapons Rating: MKM Rated" });
                    rolesForSelectedRole.push({ label: "Weapons Rating: GREN Rated", value: "Weapons Rating: GREN Rated" });
                    rolesForSelectedRole.push({ label: "Weapons Rating: No Rating", value: "Weapons Rating: No Rating" });
                    break;
                  case "Pilot Ratings":
                    rolesForSelectedRole.push({ label: "Pilot Rating: Ace Pilot", value: "Pilot Rating: Ace Pilot" });
                    rolesForSelectedRole.push({ label: "Pilot Rating: Proficient Pilot", value: "Pilot Rating: Proficient Pilot" });
                    rolesForSelectedRole.push({ label: "Pilot Rating: Standard Pilot", value: "Pilot Rating: Standard Pilot" });
                    rolesForSelectedRole.push({ label: "Pilot Rating: Rookie Pilot", value: "Pilot Rating: Rookie Pilot" });
                    rolesForSelectedRole.push({ label: "Pilot Rating: Noob Pilot", value: "Pilot Rating: Noob Pilot" });
                    rolesForSelectedRole.push({ label: "Pilot Rating: No Rating", value: "Pilot Rating: No Rating" });
                    break;
                  case "Armoured Leadership Ratings":
                    rolesForSelectedRole.push({ label: "Armoured Leadership Rating: Veteran Leader", value: "Armoured Leadership Rating: Veteran Leader" });
                    rolesForSelectedRole.push({ label: "Armoured Leadership Rating: Seasoned Leader", value: "Armoured Leadership Rating: Seasoned Leader" });
                    rolesForSelectedRole.push({ label: "Armoured Leadership Rating: Armoured Leader", value: "Armoured Leadership Rating: Armoured Leader" });
                    rolesForSelectedRole.push({ label: "Armoured Leadership Rating: Rookie Leader", value: "Armoured Leadership Rating: Rookie Leader" });
                    rolesForSelectedRole.push({ label: "Armoured Leadership Rating: No Rating", value: "Armoured Leadership Rating: No Rating" });
                    break;
                  case "Gunning Ratings":
                    rolesForSelectedRole.push({ label: "Gunning Rating: Gunning Expert", value: "Gunning Rating: Gunning Expert" });
                    rolesForSelectedRole.push({ label: "Gunning Rating: MBT + IFV Rated", value: "Gunning Rating: MBT + IFV Rated" });
                    rolesForSelectedRole.push({ label: "Gunning Rating: MBT Rated", value: "Gunning Rating: MBT Rated" });
                    rolesForSelectedRole.push({ label: "Gunning Rating: IFV Rated", value: "Gunning Rating: IFV Rated" });
                    rolesForSelectedRole.push({ label: "Gunning Rating: Armour Rookie", value: "Gunning Rating: Armour Rookie" });
                    rolesForSelectedRole.push({ label: "Gunning Rating: RWS Rated", value: "Gunning Rating: RWS Rated" });
                    rolesForSelectedRole.push({ label: "Gunning Rating: .50 Rated", value: "Gunning Rating: .50 Rated" });
                    rolesForSelectedRole.push({ label: "Gunning Rating: No Rating", value: "Gunning Rating: No Rating" });
                    break;
                  case "Driver Ratings":
                    rolesForSelectedRole.push({ label: "Driving Rating: Driving Expert", value: "Driving Rating: Driving Expert" });
                    rolesForSelectedRole.push({ label: "Driver Rating: MBT + IFV License", value: "Driver Rating: MBT + IFV License" });
                    rolesForSelectedRole.push({ label: "Driver Rating: MBT License", value: "Driver Rating: MBT License" });
                    rolesForSelectedRole.push({ label: "Driver Rating: IFV License", value: "Driver Rating: IFV License" });
                    rolesForSelectedRole.push({ label: "Driver Rating: Armour Rookie", value: "Driver Rating: Armour Rookie" });
                    rolesForSelectedRole.push({ label: "Driver Rating: Light Vehicle License", value: "Driver Rating: Light Vehicle License" });
                    rolesForSelectedRole.push({ label: "Driver Rating: Truck License", value: "Driver Rating: Truck License" });
                    rolesForSelectedRole.push({ label: "Driver Rating: No Rating", value: "Driver Rating: No Rating" });
                    break;
                  case "BCT Certified":
                    rolesForSelectedRole.push({ label: "BCT Certified", value: "BCT Certified"});
                    break;
                }
        
                const roleSelectRow = new ActionRowBuilder()
                  .addComponents(
                    new SelectMenuBuilder()
                      .setCustomId('role-select')
                      .setPlaceholder('Select a role')
                      .addOptions(rolesForSelectedRole),
                  );
        
                await interaction.update({ content: 'Select a role:', components: [roleSelectRow] });
                break;
        
              case 'medbay-roles':
                const medbayRoles = [
                  { label: "N.F.F.C.", value: "N.F.F.C." },
                  { label: "L.O.A.", value: "L.O.A." },
                ];
        
                const medbayRow = new ActionRowBuilder()
                  .addComponents(
                    new SelectMenuBuilder()
                      .setCustomId('medbay-select')
                      .setPlaceholder('Select a medbay role')
                      .addOptions(medbayRoles),
                  );
        
                await interaction.reply({ content: 'Select a medbay role:', components: [medbayRow] });
                break;
        
              case 'battalion-roles':
                const battalionRoles = [
                  { label: "3rd Rifles Infantry Battalion", value: "3rd Rifles Infantry Battalion" },
                  // Add more roles here
                ];
        
                const battalionRow = new ActionRowBuilder()
                  .addComponents(
                    new SelectMenuBuilder()
                      .setCustomId('battalion-select')
                      .setPlaceholder('Select a battalion role')
                      .addOptions(battalionRoles),
                  );
        
                await interaction.reply({ content: 'Select a battalion role:', components: [battalionRow] });
                break;
        
              case 'company-roles':
                const companyRoles = [
                  { label: "Headquarters Company", value: "Headquarters Company" },
                  { label: "Black Templars", value: "Black Templars" },
                  { label: "20th Hussars Armour Squadron", value: "20th Hussars Armour Squadron" },
                  { label: "20th Reserve Armoured Squadron", value: "20th Reserve Armoured Squadron" },
                  { label: "230 Aviation Squadron", value: "230 Aviation Squadron" },
                  { label: "Training Company", value: "Training Company" },
                  { label: "Auxiliary Company", value: "Auxiliary Company" },
                  { label: "Reserve Infantry Company", value: "Reserve Infantry Company" },
                ];
        
                const companyRow = new ActionRowBuilder()
                  .addComponents(
                    new SelectMenuBuilder()
                      .setCustomId('company-select')
                      .setPlaceholder('Select a company role')
                      .addOptions(companyRoles),
                  );
        
                await interaction.reply({ content: 'Select a company role:', components: [companyRow] });
                break;
        
              case 'remove-roles':
                // Remove roles from the user
                break;
            }
          } else if (interaction.isSelectMenu()) {
            const member = interaction.guild.members.cache.get(interaction.user.id);
            const role = interaction.guild.roles.cache.find(role => role.name === interaction.values[0]);
        
            if (role) {
              member.roles.add(role);
              interaction.reply(`You have been given the role ${role.name}`);
            } else {
              interaction.reply("Role not found!");
            }
        }
      })
    }
}});

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
