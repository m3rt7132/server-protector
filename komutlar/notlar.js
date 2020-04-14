exports.run = async(client, message, args) => {
  if (!args[0] || isNaN(args[0]) || args[0].length != 18) return message.channel.send(`**Botun notlarına bakmak için sistemde olan bir botun ID'sini girmelisin.**`)
  if (!client.bots.waiting.has(args[0]) || client.bots.added.has(args[0])) return message.channel.send(`**Böyle bir bot sistemde bulunmuyor veya ID'si girilen bot sistemde onaylı!**`)
  if (message.author.id != client.bots.waiting.get(args[0]).owner.id) return message.channel.send(`**Bu komutu sadece botun sahibi kullanabilir!**`)
  if (!args[1]) {
    message.channel.send(`**${client.bots.waiting.get(args[0]).tag}** isimli botun;\n\n>>> **Admin** notları **=>** ${client.bots.waiting.get(args[0]).notlar.admin != "yok" ? "`"+client.bots.waiting.get(args[0]).notlar.admin+"`" : "**Bulunmuyor.**"}\n\n**Kullanıcı** notları **=>** ${client.bots.waiting.get(args[0]).notlar.user != "yok" ? "`"+client.bots.waiting.get(args[0]).notlar.user+"`" : "**Bulunmuyor.**"}`)
  } else {
    var reason = args.slice(1).join(" ")
    if (!reason) return message.channel.send(`**Not eklemeye çalışıyorsun ama notu yazmıyorsun, biz senle nasıl anlaşacağız?!**`)
    client.bots.waiting.get(args[0]).notlar.user = reason;
    message.channel.send(`**Not** başarı ile eklendi! Notları temizlemek için \`!not <bot ID> temizle\` yazmalısın!`)
    if (reason == "temizle") {
      client.bots.waiting.get(args[0]).notlar.user = "yok"
      message.channel.send(`**Not** temizlendi.`)
    }
  }
}
exports.conf = {
  aliases: ["notlar", "nots"],
  permLevel: 0
}
exports.help = {
  name: "not"
}