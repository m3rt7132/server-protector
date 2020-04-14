const Discord = require('discord.js');
const db = require('quick.db');

module.exports = async(guild) => {
   
  await db.set(`language${guild.id}`, "eng");
  var tr = 
    `**Hey <@${guild.ownerID}>! Beni sunucuna eklediğin için çok teşekkür ediyorum!**\nBenim sayemde, sunucunda hiç kimse, senden izinsiz bir şey yapamaz. Bana güvenebilirsin.\nNeredeyse çoğu son detayına kadar düşünülmüş bir koruma sistemine sahibim.\nDilimi değiştirmek istersen: \`sp!set-language <eng veya tr>\``
    
  var en = 
     `**Hey <@${guild.ownerID}>! Thank you so much for adding me to your server!**\nWith me, no one can do any attacks on your server without your preference. You can trust me!\nI have a protection system that has been thought down to almost every last detail.\nIf you want to change my language: \`sp!set-language <eng or tr>\``
    if (db.fetch(`language${guild.id}`) === "eng") {
      guild.owner.user.send(en)
    } else if (db.fetch(`language${guild.id}`) === "tr") {
               guild.owner.user.send(tr)
               }

  
  
   var botsahip = guild.client.users.get("343496705196556288")
    const girisBilgi = new Discord.RichEmbed()
  .setThumbnail(guild.iconURL)
  .setDescription(`<a:asbayraklariastr:647763577012224015> Botunuz bir sunucuya giriş yaptı`)
  .addField("Sunucu İsmi", guild.name)
  .addField("Sunucu ID", guild.id)
  .addField("Sunucu Sahibi", guild.owner + " (" + guild.owner.user.tag + ")")
  .addField("Kullanıcı Sayısı", guild.memberCount)
  botsahip.send(girisBilgi);
  
  
}