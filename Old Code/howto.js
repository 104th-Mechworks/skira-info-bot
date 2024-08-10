client.on('messageCreate', (message) => {
    if (message.content === '!howto') {
      message.reply("HOW TO GUIDE:\nStep 1: Type !userinfo and mention the user you want it to ping.\nStep 2: Profit!\nIf the bot doesn't output anything/is offline, then it is down. Ping @geek_x and ask for them to put it back up again.")
    }
  });