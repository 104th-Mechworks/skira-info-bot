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
              .setCustomId('rating-roles-1')
              .setLabel('Add Rating Roles, Infantry Set 1')
              .setStyle(ButtonStyle.Success),
             new ButtonBuilder()
              .setCustomId('rating-roles-2')
              .setLabel('Add Rating Roles, Infantry Set 2 and Pilot Set')
              .setStyle(ButtonStyle.Success),
             new ButtonBuilder()
              .setCustomId('rating-roles-3')
              .setLabel('Add Rating Roles, Vehicle Set')
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
                case 'rating-roles-1':
                  const ratingRoles1 = [
                    { label: "Leadership Rating: Commander", value: "Leadership Rating: Commander" },
                    { label: "Leadership Rating: Senior Squad Lead", value: "Leadership Rating: Senior Squad Lead" },
                    { label: "Leadership Rating: Squad Leader", value: "Leadership Rating: Squad Leader" },
                    { label: "Leadership Rating: Senior Team Lead", value: "Leadership Rating: Senior Team Lead" },
                    { label: "Leadership Rating: Team Leader", value: "Leadership Rating: Team Leader" },
                    { label: "Leadership Rating: Marker Rated", value: "Leadership Rating: Marker Rated" },
                    { label: "Leadership Rating: Trooper Rated", value: "Leadership Rating: Trooper Rated" },
                    { label: "Leadership Rating: No Rating", value: "Leadership Rating: No Rating" },
                    { label: "Rifle Rating: Rifle Expert", value: "Rifle Rating: Rifle Expert" },
                    { label: "Rifle Rating: Rifle Specialist", value: "Rifle Rating: Rifle Specialist" },
                    { label: "Rifle Rating: Sharpshooter Rated", value: "Rifle Rating: Sharpshooter Rated" },
                    { label: "Rifle Rating: Shooter Rated", value: "Rifle Rating: Shooter Rated" },
                    { label: "Rifle Rating: Rifle Trained", value: "Rifle Rating: Rifle Trained" },
                    { label: "Rifle Rating: No Rating", value: "Rifle Rating: No Rating" },
                    { label: "Medical Rating: Guardian Angel", value: "Medical Rating: Guardian Angel" },
                    { label: "Medical Rating: Primary Medic", value: "Medical Rating: Primary Medic" },
                    { label: "Medical Rating: Secondary Medic", value: "Medical Rating: Secondary Medic" },
                    { label: "Medical Rating: First Aid Trained", value: "Medical Rating: First Aid Trained" },
                    { label: "Medical Rating: No Rating", value: "Medical Rating: No Rating" },
                  ];
          
                  const ratingRow1 = new ActionRowBuilder()
                    .addComponents(
                      new SelectMenuBuilder()
                        .setCustomId('rating-select')
                        .setPlaceholder('Select a rating role')
                        .addOptions(ratingRoles1),
                    );
          
                  await interaction.reply({ content: 'Select a rating role:', components: [ratingRow1] });
                  break;
  
                case 'rating-roles-2':
                  const ratingRoles2 = [
                    { label: "Explosive Rating: Explosive Expert", value: "Explosive Rating: Explosive Expert" },
                    { label: "Explosive Rating: Explosive Specialist", value: "Explosive Rating: Explosive Specialist" },
                    { label: "Explosive Rating: Mortar Man", value: "Explosive Rating: Mortar Man" },
                    { label: "Explosive Rating: ENGR + HAT Rated", value: "Explosive Rating: ENGR + HAT Rated" },
                    { label: "Explosive Rating: ENGR + LAT Rated", value: "Explosive Rating: ENGR + LAT Rated" },
                    { label: "Explosive Rating: HAT Rated", value: "Explosive Rating: HAT Rated" },
                    { label: "Explosive Rating: LAT Rated", value: "Explosive Rating: LAT Rated" },
                    { label: "Explosive Rating: ENGR Rated", value: "Explosive Rating: ENGR Rated" },
                    { label: "Explosive Rating: Rookie LAT", value: "Explosive Rating: Rookie LAT" },
                    { label: "Explosive Rating: Rookie ENGR", value: "Explosive Rating: Rookie ENGR" },
                    { label: "Explosive Rating: No Rating", value: "Explosive Rating: No Rating" },
                    { label: "Weapons Rating: Weapons Expert", value: "Weapons Rating: Weapons Expert" },
                    { label: "Weapons Rating: Weapons Specialist", value: "Weapons Rating: Weapons Specialist" },
                    { label: "Weapons Rating: Scout Rated", value: "Weapons Rating: Scout Rated" },
                    { label: "Weapons Rating: Sniper Rated", value: "Weapons Rating: Sniper Rated" },
                    { label: "Weapons Rating: LMG Rated", value: "Weapons Rating: LMG Rated" },
                    { label: "Weapons Rating: AR Rated", value: "Weapons Rating: AR Rated" },
                    { label: "Weapons Rating: MKM Rated", value: "Weapons Rating: MKM Rated" },
                    { label: "Weapons Rating: GREN Rated", value: "Weapons Rating: GREN Rated" },
                    { label: "Weapons Rating: No Rating", value: "Weapons Rating: No Rating" },
                    { label: "Pilot Rating: Ace Pilot", value: "Pilot Rating: Ace Pilot" },
                    { label: "Pilot Rating: Proficient Pilot", value: "Pilot Rating: Proficient Pilot" },
                    { label: "Pilot Rating: Standard Pilot", value: "Pilot Rating: Standard Pilot" },
                    { label: "Pilot Rating: Rookie Pilot", value: "Pilot Rating: Rookie Pilot" },
                    { label: "Pilot Rating: Noob Pilot", value: "Pilot Rating: Noob Pilot" },
                    { label: "Pilot Rating: No Rating", value: "Pilot Rating: No Rating" },
                  ];
            
                  const ratingRow2 = new ActionRowBuilder()
                    .addComponents(
                      new SelectMenuBuilder()
                        .setCustomId('rating-select')
                        .setPlaceholder('Select a rating role')
                        .addOptions(ratingRoles2),
                    );
            
                  await interaction.reply({ content: 'Select a rating role:', components: [ratingRow2] });
                  break;
  
                case 'rating-roles-3':
                  const ratingRoles3 = [
                    { label: "Armoured Leadership Rating: Veteran Leader", value: "Armoured Leadership Rating: Veteran Leader" },
                    { label: "Armoured Leadership Rating: Seasoned Leader", value: "Armoured Leadership Rating: Seasoned Leader" },
                    { label: "Armoured Leadership Rating: Armoured Leader", value: "Armoured Leadership Rating: Armoured Leader" },
                    { label: "Armoured Leadership Rating: Rookie Leader", value: "Armoured Leadership Rating: Rookie Leader" },
                    { label: "Armoured Leadership Rating: No Rating", value: "Armoured Leadership Rating: No Rating" },
                      { label: "Gunning Rating: Gunning Expert", value: "Gunning Rating: Gunning Expert" },
                      { label: "Gunning Rating: MBT + IFV Rated", value: "Gunning Rating: MBT + IFV Rated" },
                      { label: "Gunning Rating: MBT Rated", value: "Gunning Rating: MBT Rated" },
                      { label: "Gunning Rating: IFV Rated", value: "Gunning Rating: IFV Rated" },
                      { label: "Gunning Rating: Armour Rookie", value: "Gunning Rating: Armour Rookie" },
                      { label: "Gunning Rating: RWS Rated", value: "Gunning Rating: RWS Rated" },
                      { label: "Gunning Rating: .50 Rated", value: "Gunning Rating: .50 Rated" },
                      { label: "Gunning Rating: No Rating", value: "Gunning Rating: No Rating" },
                      { label: "Driving Rating: Driving Expert", value: "Driving Rating: Driving Expert" },
                      { label: "Driver Rating: MBT + IFV License", value: "Driver Rating: MBT + IFV License" },
                      { label: "Driver Rating: MBT License", value: "Driver Rating: MBT License" },
                      { label: "Driver Rating: IFV License", value: "Driver Rating: IFV License" },
                      { label: "Driver Rating: Armour Rookie", value: "Driver Rating: Armour Rookie" },
                      { label: "Driver Rating: Light Vehicle License", value: "Driver Rating: Light Vehicle License" },
                      { label: "Driver Rating: Truck License", value: "Driver Rating: Truck License" },
                      { label: "Driver Rating: No Rating", value: "Driver Rating: No Rating" },
                      { label: "BCT Certified", value: "BCT Certified" },
                    ];
              
                    const ratingRow3 = new ActionRowBuilder()
                      .addComponents(
                        new SelectMenuBuilder()
                          .setCustomId('rating-select')
                          .setPlaceholder('Select a rating role')
                          .addOptions(ratingRoles3),
                      );
              
                    await interaction.reply({ content: 'Select a rating role:', components: [ratingRow3] });
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