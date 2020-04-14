const Discord = require('discord.js');

exports.run = async(client, message, params) => {

  if(params[0]) {
    let commandName  = params[0].toLowerCase()
    try {
      delete require.cache[require.resolve(`./${commandName}.js`)]
      client.commands.delete(commandName)
      const pull = require(`./${commandName}.js`)
      client.commands.set(commandName, pull)
    } catch(e) {
      return message.channel.send(`${client.emoji.basarisiz} **There's an error! Please check console logs**`)
    }
    
    message.channel.send(`${client.emoji.basarisiz} **Restarting the command called with \`${commandName}\`**`)
    
   return
  }
  setTimeout(() => {
  message.channel.send(`${client.emoji.basarili} **Bot** is restarting now...`).then(msg => {
    console.log('[BOT] Yeniden başlatılıyor...')
    process.exit(0);
  })
  }, 1000);
};

exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: ['reboot', 'reload'], 
  permLevel: 11,
  maintenance: "NO"
};

exports.help = {
  name: 'reboot',
  name2: "reboot",
  description: 'This command restarts bot.', 
  usage: 'reboot',
  kategori: 'owner & sahip'
};