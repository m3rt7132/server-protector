exports.run = async(client, message, args) => {
   if (!args[0] || isNaN(args[0]) || args[0].length != 18)
      return message.channel.send(
        `**Sistemde onaylanmış bir durumda bulunan bir bot ID'si girmelisin!**`
      );
    if (client.bots.waiting.has(args[0]) || !client.bots.added.has(args[0]))
      return message.channel.send(
        `**ID'sini girdiğin bot şu anda onaylanmayı bekleyen bir durumda! Sistemde onaylanmış bir durumda olmayan bir botun bilgilerine bakamazsın!**`
      );
  var Discord = require("discord.js")
  var user = client.bots.added.get(args[0])
    message.channel.send(new Discord.RichEmbed().setFooter(`Code Academy - m3rt#7132`, message.guild.iconURL).setTimestamp().setColor(client.renk.renksiz).setThumbnail(user.avatar).setTitle(`Bot bilgi sistemi!`).setDescription(
`__**BOT**__
Bot           **=>** <@${user.id}>
Tag           **=>** **${user.tag}**
ID            **=>** \`${user.id}\`
Kütüphane     **=>** ${user.library}
Yardım komutu **=>** ${user.mainKomut}
Kategoriler   **=>** ${user.categories.map(e => `**${e}**`).join(" `|` ")}
Açıklaması    **=>** **\`${user.description}\`**

__**SAHİBİ**__
Üye           **=>** <@${user.owner.id}>
Tag           **=>** **${user.owner.tag}**
ID            **=>** \`${user.owner.id}\`

__**DİĞER**__
Sahibin oluşturulma tarihi **=>** ${tarih(user.owner.createdAt)}
Sahibin sunucuya girme tarihi **=>** ${tarih(user.owner.joinedAt)}
Botun oluşturulma tarihi **=>** ${tarih(user.createdAt)}

Bir üyenin bilgilerine bakmak için de **!üye-bilgi <üye ID>** komutunu kullanın!
`
    ))
  function tarih(date) {
    let a = new Date(date).toLocaleDateString()
return `**${a}**`
  }
}
exports.conf = {
  aliases: ["i"],
  permLevel: 0
}
exports.help = {
  name: "bilgi"
}