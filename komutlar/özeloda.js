exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  if (!require("quick.db").get(`özeloda.${message.guild.id}`)) {
    if (!args[0]) return message.channel.send("**Özel oda** sistemini açmak için komutu doğru bir şekilde kullanmalısınız!\n**KULLANIM** `=>` m3rt!özel-oda sesli kanal ID - kategori ID - log kanalı ID - üyelere soru sorulacak kanal ID");
    var PARAMETERS = args.slice(0).join(" ").split("-");
    await require("quick.db").set(`özeloda.${message.guild.id}`, {ses: PARAMETERS[0],cat: PARAMETERS[1],log: PARAMETERS[2],m3rt: PARAMETERS[3]})
    message.channel.send(`**Özel oda** sistemi başarı ile açıldı ve şuna ayarlandı;\n>>> **Log kanalı** \`=>\` <#${client.channels.get(PARAMETERS[2]).id}>\n**Ses kanalı** \`=>\` \`${client.channels.get(PARAMETERS[0]).name}\`\n**Kategori** \`=>\` \`${client.channels.get(PARAMETERS[1]).name}\`\n**Üyelere soru sorulacak kanal** \`=>\` <#${client.channels.get(PARAMETERS[3]).id}>`).catch(err => message.channel.send(err + "\nBir hata olustu!"));
  } else {
    await require("quick.db").delete(`özeloda.${message.guild.id}`);
    message.channel.send(`**Özel oda** sistemi başarı ile kapatıldı!`);
  }
};
exports.conf = { aliases: ["özeloda", "geçiçioda", "geçiçi-oda"], permLevel: 0 }
exports.help = { name: "özel-oda" }