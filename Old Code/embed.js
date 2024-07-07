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