const ayarlar = require("../ayarlar/ayarlar.json");
const Discord = require("discord.js");
const db = require("quick.db");
let talkedRecently = new Set();

module.exports = async message => {
  //dil
  let client = message.client;
  var tr = [
    `${client.emoji.basarisiz} **Bu komutu \`2 SANİYE\` sonra kullanabilirsin!**`, //0
    `${client.emoji.basarisiz} **Bu komut şu anda bu kanalda çalışmıyor çünkü kanal karalistede!**`, //1
    `**Bu komutu sadece botun kurucuları (<@${client.ayarlar.m3rt}>, <@${client.ayarlar.deniz}>) kullanabilir!**`, //2
    `${client.emoji.hayir} İşlem iptal edildi!`, //3
    `**Bu komut \`{yetkicevap}\` yetkisi gerektiriyor!**`, //4
    `${client.emoji.basarisiz} **Bu komutu özel mesajlarda kullanamazsın!**`, //5
    `**Bu komutu sadece sunucu sahibi ({sahipreplace}) kullanabilir!**`, //6
    `${client.emoji.bakim} İşlem iptal edildi!`, //7
    `**Bu komut şu anda bakımda! Tekrar açılana kadar beklemelisin!**`, //8
    `${client.emoji.basarisiz} **\`{command}\` adında bir komut bulamıyorum. Yazım hatası mı yaptın?**`, //9
    ``, //10
    ``, //11
    ``, //12
    ``, //13
    ``, //14
    ``, //15
    ``, //16
    ``, //17
    ``, //18
    ``, //19
    `` //20
  ];
  var en = [
    `${client.emoji.basarisiz} **You can use that command after \`2 SECONDS\`!**`, //0
    `${client.emoji.basarisiz} **This command doesn't work in this channel because this channel is in the blacklisted channels!**`, //1
    `**Only bot owners (<@${client.ayarlar.m3rt}>, <@${client.ayarlar.deniz}>) can use this command!**`, //2
    `${client.emoji.hayir} Access Denied!`, //3
    `**This command requires \`{yetkicevap}\` permission!**`, //4
    `${client.emoji.basarisiz} **You can't use that command on my DM!**`, //5
    `**Only server owner ({sahipreplace}) can use this command!**`, //6
    `${client.emoji.bakim} Access Denied!`, //7
    `**This command is in the maintenance! Wait until the command re-opens!**`, //8
    `${client.emoji.basarisiz} **I have no command called with \`{command}\`! Maybe a typo?**`, //9
    ``, //10
    ``, //11
    ``, //12
    ``, //13
    ``, //14
    ``, //15
    ``, //16
    ``, //17
    ``, //18
    ``, //19
    `` //20
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + message.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
  //dil


  if (message.author.bot) return;
  if (!message.content.startsWith(client.ayarlar.prefix)) return;
  let command = message.content.split(" ")[0].slice(client.ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let log = await db.fetch(`logschannel_${message.guild.id}`)
  let cmd;
  if (client.commands.has(command) || client.commands2.has(command)) {
    cmd = client.commands.get(command) || client.commands2.get(command)
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    await console.log(`${message.author.tag} - ( ${cmd.help.name2} ) komudunu kullandı!`)
    if (talkedRecently.has(message.author.id)) {
    return message.channel.send(mesaj[0])
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2000);
  
    if(cmd.help.name !== "blacklist" || cmd.help.name2 !== "karaliste") {
      let kanalengel = await db.fetch(`blacklist_${message.guild.id}`);
  if(kanalengel && kanalengel.some(kanalid => `${message.channel.id}` === kanalid)) return message.channel.send(mesaj[1])
    }
    
    let permLevel = cmd.conf.permLevel;
    let yetki;
    let yetkicevap;
    if (permLevel === 9)
      (yetki = "ADMINISTRATOR"), (yetkicevap = "Administrator");
    if (permLevel === 8)
      (yetki = "MANAGE_GUILD"), (yetkicevap = "Manage Server");
    if (permLevel === 7)
      (yetki = "MANAGE_ROLES"), (yetkicevap = "Manage Roles");
    if (permLevel === 6)
      (yetki = "MANAGE_CHANNELS"), (yetkicevap = "Manage Channels");
    if (permLevel === 5)
      (yetki = "MANAGE_EMOJIS"), (yetkicevap = "Manage Emojis");
    if (permLevel === 4) 
      (yetki = "BAN_MEMBERS"), (yetkicevap = "Ban Members");
    if (permLevel === 3)
      (yetki = "KICK_MEMBERS"), (yetkicevap = "Kick Members");
    if (permLevel === 2)
      (yetki = "MANAGE_NICKNAMES"), (yetkicevap = "Manage Nicknames");
    if (permLevel === 1)
      (yetki = "MANAGE_MESSAGES"), (yetkicevap = "Manage Messages");

    if (cmd.conf.permLevel === 11) {
      if (!ayarlar.m3rt.includes(message.author.id) && !ayarlar.deniz.includes(message.author.id) )
        return message.channel.send(
          new Discord.RichEmbed()
          .setTitle(`${mesaj[3]}`)  
          .setDescription(
              mesaj[2]
            )
            .setColor(client.ayarlar.hatarengi)
        );
    }

    if (permLevel) {
      if (!ayarlar.m3rt.includes(message.author.id) && !ayarlar.deniz.includes(message.author.id)) {
        if (!message.member.hasPermission(yetki))
          return message.channel.send(
            new Discord.RichEmbed()
            .setTitle(mesaj[3])  
            .setDescription(
               mesaj[4].replace("{yetkicevap}", `${yetkicevap}`)
              )
              .setColor(client.ayarlar.hatarengi)
          );
      }
    }
    
    if (cmd.conf.guildOnly === true) {
      if (!message.guild) {
     return message.author.send(mesaj[5])
      }
    }
    if (cmd.conf.permLevel === 10) {
      if (message.author.id !== message.guild.owner.id)
        return message.channel.send(
          new Discord.RichEmbed()
            .setTitle(mesaj[3])
            .setDescription(mesaj[6].replace("{sahipreplace}", `<@${message.guild.owner.id}>`))
            .setColor(client.ayarlar.hatarengi)
        );
    }

    if (cmd.conf.maintenance === "YES") {
     
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle(mesaj[7])
      .setDescription(mesaj[8])
      .setColor(client.renk.turuncu)) 
      
      }
    else {
        cmd.run(client, message, params);
      }
  }
  else 
    message.channel.send(mesaj[9].replace("{command}", `${command}`))
};
