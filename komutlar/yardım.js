exports.run = async(client, message, args) => {
  var Discord = require("discord.js")
  message.channel.send(new Discord.RichEmbed().setColor(client.renk.renksiz).setThumbnail(message.guild.iconURL).setTitle("Code Academy Bot List!").setDescription(
  `__**KULLANICI**__
    **/başvuru**   **=>** Bot başvurusu yapmanızı sağlar. (Sadece <#${client.ayarlar.başvuruKanalı}> kanalında geçerli!)
    **/notlar**    **=>** Botunuzun kullanıcı/admin tarafından eklenilen bilgi notlarını gösterir.
    **/bilgi**     **=>** Sunucuda bulunan bir bot hakkında bilgiler verir.
    **/üye-bilgi** **=>** Sunucuda bulunan herhangi bir üyenin bilgilerini verir.

   __**ADMIN**__
    **/admin**     **=>** Admin menüsü.

Code Academy iyi eğlenceler diler!
`
  ).setFooter(message.guild.name, message.guild.iconURL).setTimestamp())
  
}
exports.conf = {
  aliases: ["commands", "komutlar", "y", "help", "yardim", "command", "cmds", "cmd", "bots", "botlist"],
  permLevel: 0
}
exports.help = {
  name: "yardım"
}