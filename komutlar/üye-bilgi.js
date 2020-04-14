exports.run = async(client, message, args) => {
     if (!args[0] || isNaN(args[0]) || args[0].length != 18 || !message.guild.members.has(args[0]))
      return message.channel.send(
        `**Sunucuda bulunan bir üye ID'si girmelisin!**`
      )
  var Discord = require("discord.js")
  var user = message.guild.members.get(args[0])
  var test = client.bots.added.filter(a => a.owner.id == user.id).map(e => `**${e.tag}**`).join(" `|` ")
    message.channel.send(new Discord.RichEmbed().setFooter(`Code Academy - m3rt#7132`, message.guild.iconURL).setTimestamp().setColor(client.renk.renksiz).setThumbnail(user.avatarURL).setTitle(`Bot bilgi sistemi!`).setDescription(
`__**ÜYE**__
Üye           **=>** <@${user.user.id}>
Tag           **=>** **${user.user.tag}**
ID            **=>** \`${user.user.id}\`

__**DİĞER**__
Hesabını oluşturma tarihi **=>** ${tarih(user.user.createdAt)}
Sistemde bulunan botları **=>** ${test}

Sistemde bulunan bir botun bilgilerine bakmak için **!bilgi <bot ID>** yazınız!`
    ))
  function tarih(date) {
    let a = new Date(date).toLocaleDateString()
return `**${a}**`
  }
}
exports.conf = {
  aliases: ["üyebilgi", "bilgi-üye","bilgiüye"],
  permLevel: 0
}
exports.help = {
  name: "üye-bilgi"
}