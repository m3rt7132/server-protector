exports.run = async(client, message, args) => {
  var ROLES = [];
  message.channel.send(new require("discord.js").RichEmbed().setTitle("Sunucu İstatistikleri").setColor("BLUE").setDescription())
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  permLevel: 0,
  maintenance: "NO"
}
exports.help = {
  name: "test",
  name2: "test2",
  usage: "de|de",
  description: "de|de",
  kategori: "moderation & moderasyon"
}