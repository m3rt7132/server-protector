const Discord = require('discord.js');
const db = require('quick.db');

module.exports = async(guild) => {
   
  db.delete("language" + guild.id);
  db.delete(`channelprotect_${guild.id}`)
   db.delete(`roleprotect_${guild.id}`)
   db.delete(`logschannel_${guild.id}`)
   db.delete(`giriscikis_${guild.id}`)
  db.delete(`giriscikismesaj_${guild.id}`)
  db.delete(`blacklist_${guild.id}`)
  
  guild.owner.user.send("**bye!**")
 var botsahip = guild.client.users.get("343496705196556288")
  const atilmaBilgi = new Discord.RichEmbed()
  .setThumbnail(guild.iconURL)
  .setDescription(`<a:asbayraklariastr:647763577012224015> Botunuz bir sunucudan atıldı`)
  .addField("Sunucu İsmi", guild.name)
  .addField("Sunucu ID", guild.id)
  .addField("Sunucu Sahibi", guild.owner + " (" + guild.owner.user.tag + ")")
  .addField("Kullanıcı Sayısı", guild.memberCount);
  botsahip.send(atilmaBilgi);
  
}