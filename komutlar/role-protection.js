const Discord = require('discord.js');
const db = require("quick.db");


exports.run = async(client, message, args, params) => {
var log = await db.fetch(`logschannel_${message.guild.id}`)
  //dil
  var tr = [
    `${client.emoji.basarisiz} **Rol koruma sistemini kapatmak için \`kapat\`, açmak için ise \`aç\` kullanınız**`,//0
    `${client.emoji.basarisiz} **Görünüşe göre rol koruma sistemi zaten \`açık\`!**`,//1
    `${client.emoji.basarili} **Rol koruma sistemi başarı ile** __**açıldı!**__`,//2
    `__EYLEM__`,//3
    `__**ROL KORUMA**__ sistemini \`aç\`!`,//4
    `__**ROL KORUMA**__ sistemini \`kapat\`!`,//5
    `Kim yaptı?`,//6
    `${client.emoji.basarisiz} **Bu sunucuda rol koruma sistemi zaten kapalı!**`,//7
    `${client.emoji.basarili} **Rol koruma sistemi başarı ile** __**kapatıldı!**__`,//8
  ];
  var en = [
  `${client.emoji.basarisiz} **You must type \`on\` or \`off\` to enable or reset the role protector!**`,//0
  `${client.emoji.basarisiz} **Looks like role protector is already \`on\`!**`,//1
  `${client.emoji.basarili} **Done! Role protector is successfully** __**enabled!**__`,//2
  `__ACTION__`,//3
  `Turn \`ON\` the __**ROLE PROTECTOR**__`,//4
  `Turn \`OFF\` the __**ROLE PROTECTOR**__`,//5
  `Who did It?`,//6
  `${client.emoji.basarisiz} **Role protector is already \`off\` in this server so you can't reset that!**`,//7
  `${client.emoji.basarili} **Done! Role protector is successfully** __**reseted!**__`//8
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + message.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
  //dil

  if (!args[0] && (args[0] !== "aç" || args[0] !== "kapat" || args[0] !== "on" || args[0] !== "off")) return message.channel.send(mesaj[0])
     try {
       let on = await db.fetch(`roleprotect_${message.guild.id}`)
  if (args[0] === "on" || args[0] === "aç") {
    if (on) return message.channel.send(mesaj[1])
    await db.set(`roleprotect_${message.guild.id}`, "on")
    
    message.channel.send(mesaj[2])
    if (log) return message.guild.channels.get(log).send(new Discord.RichEmbed().setColor(client.ayarlar.basarilirengi).setAuthor(client.user.username, client.user.avatarURL).addField(mesaj[3], mesaj[4]).addField(mesaj[6], `${message.author}\n${message.author.id}`))
  }
  if (args[0] === "off" || args[0] === "kapat") {
    let on = await db.fetch(`roleprotect_${message.guild.id}`)
    if (!on) return message.channel.send(mesaj[7])
  await db.delete(`roleprotect_${message.guild.id}`)
    message.channel.send(mesaj[8])
     if (log) return message.guild.channels.get(log).send(new Discord.RichEmbed().setColor(client.ayarlar.basarilirengi).setAuthor(client.user.username, client.user.avatarURL).addField(mesaj[3], mesaj[5]).addField(mesaj[6], `${message.author}\n${message.author.id}`))
 
  }
     } catch(err) { console.log(err) }
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['rp','rolep', "r-p", "role-p"], 
  permLevel: 10,
  maintenance: "NO"
};

exports.help = {
  name: 'role-protector',
  name2: "rolkoruma",
  description: 'This command turns on or off the role protector.|Rol korumayı açıp kapatır.',
  usage: 'role-protector <on or off>|rolkoruma <aç veya kapat>',
  kategori: "protection & koruma sistemleri"
};