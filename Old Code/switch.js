client.on('messageCreate', (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
  
    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();
  
    switch (command) {
      case '!ping':
        message.reply('pong');
        break;
      case '!help':
        message.reply('!ping - pong\n!help - this message\n!userinfo <@username> - user panel\n!serverinfo - server panel\n');
        break;
      case '!userinfo':
        // your userinfo command code here
        break;
      default:
        message.reply('Unknown command');
    }
  });