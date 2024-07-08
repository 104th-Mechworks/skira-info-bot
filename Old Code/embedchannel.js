client.on('ready', () => {
    //console.log(`Logged in as ${client.user.tag}!`);
  
    //You can access the channels cache here
    const channel = client.channels.cache.find(channel => channel.name === 'channel-name');
    if (channel) {
      channel.send({ embeds: [embed] });
    } else {
      console.log('Channel not found');
    }
  });