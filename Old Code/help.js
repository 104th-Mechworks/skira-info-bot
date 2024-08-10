client.on('messageCreate', (message) => {
    if (message.content === '!help') {
      message.reply('!ping - pong\n!help - this message\n!userinfo <@username> - user panel\n!serverinfo - server panel\n')
    }
  });