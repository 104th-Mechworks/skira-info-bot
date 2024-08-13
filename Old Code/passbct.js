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





//client.on('messageCreate', (message) => {
  //if (message.content.startsWith('!passbct')) {
    //passbct.handleUserinfoCommand(client, message, excludedRoleNames);
  //}
//});