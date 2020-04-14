const Discord = require("discord.js");
const db = require("quick.db");
let talkedRecently = new Set();

module.exports = async message => {
  let client = message.client
  if (message.author.bot) return;
  if (!message.content.startsWith(client.ayarlar.prefix)) return;
  let command = message.content.split(" ")[0].slice(client.ayarlar.prefix.length);
  let args = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command)
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    await console.log(`${message.author.tag} - ( ${cmd.help.name} ) komudunu kullandı!`)
    if (talkedRecently.has(message.author.id)) {
    return message.channel.send(``)
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 500);
  
   let permLevel = cmd.conf.permLevel;
    let yetki;
    let yetkicevap;
    if (permLevel === 9)
      (yetki = "ADMINISTRATOR"), (yetkicevap = "YÖNETİCİ");
    if (permLevel === 8)
      (yetki = "MANAGE_GUILD"), (yetkicevap = "SUNUCUYU YÖNET");
    if (permLevel === 7)
      (yetki = "MANAGE_ROLES"), (yetkicevap = "ROLLERİ YÖNET");
    if (permLevel === 6)
      (yetki = "MANAGE_CHANNELS"), (yetkicevap = "KANALLARI YÖNET");
    if (permLevel === 5)
      (yetki = "MANAGE_EMOJIS"), (yetkicevap = "EMOJİLERİ YÖNET");
    if (permLevel === 4) 
      (yetki = "BAN_MEMBERS"), (yetkicevap = "ÜYELERİ YASAKLA");
    if (permLevel === 3)
      (yetki = "KICK_MEMBERS"), (yetkicevap = "ÜYELERİ AT");
    if (permLevel === 2)
      (yetki = "MANAGE_NICKNAMES"), (yetkicevap = "KULLANICI ADLARINI YÖNET");
    if (permLevel === 1)
      (yetki = "MANAGE_MESSAGES"), (yetkicevap = "MESAJLARI YÖNET");

    if (cmd.conf.permLevel == 11) {
      if (!client.ayarlar.owners.includes(message.author.id))
        return message.channel.send(
          new Discord.RichEmbed()
          .setTitle(`İşlem İptal Edildi!`)  
          .setDescription(
              `**Bu komutu sadece bot kurucuları (${client.ayarlar.owners.map(e => `<@${e}>`).join(", ")}) kullanabilir!**`
            )
            .setColor(client.ayarlar.hatarengi)
        );
    }
    if (permLevel) {
      if (!client.ayarlar.owners.includes(message.author.id)) {
        if (!message.member.hasPermission(yetki))
          return message.channel.send(
            new Discord.RichEmbed()
            .setTitle(`İşlem İptal Edildi!`)  
            .setDescription(
               `**Bu komut \`${yetkicevap}\` yetkisi gerektiriyor!**`
              )
              .setColor(client.ayarlar.hatarengi)
          );
      }
    }
    if (cmd.conf.guildOnly) {
      if (!message.guild) {
     return message.author.send(`**Bu komutu özel mesajlarda kullanamazsın!**`)
      }
    }
    if (cmd.conf.permLevel == 10) {
      if (!client.ayarlar.owners.includes(message.author.id)) {
      if (message.author.id != message.guild.owner.id)
        return message.channel.send(
          new Discord.RichEmbed()
            .setTitle("İşlem İptal Edildi!")
            .setDescription(`**Bu komutu sadece sunucu sahibi (<@${message.guild.owner.id}>) kullanabilir!**`)
            .setColor(client.ayarlar.hatarengi)
        );
      }
    }
  cmd.run(client, message, args, Discord, db);
    } else return message.channel.send(`**\`${command}\` adında bir komut bulamıyorum. Yazım hatası mı yaptın?**`)
};
