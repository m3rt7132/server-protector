exports.run = async(client, message, args) => {
  if (!message.guild.me.hasPermission("ADMINISTRATOR") && message.guild.me.highestRole.position < message.guild.highestRole.position) return message.channel.send("Bu komut için botun **yönetici** yetkisi olmalı ve **botun rolü en üstte** olmalıdır!");
  await message.channel.send(`**Bot list sistemi** için gerekli bütün kanallar, roller oluşturulacak! Kabul ediyorsanız **10 saniye** içinde **evet** veya **hayır** yazınız!`);
  await message.channel.awaitMessages(m => m.author.id == message.author.id && m.channel.id == message.channel.id, { max: 1, time: 10000, errors: [ "time" ]}).then(async response => {
    response = response.first();
    if (response.content == ("evet" || "Evet" || "yes" || "Yes")) {
      var başvurularKategorisi = await message.guild.createChannel({name: "BAŞVURULAR KATEGORİSİ", type: "category"}),
          başvuruKanalı = await message.guild.createChannel({name: "başvuru-kanalı", type: "text", parent: başvurularKategorisi.id, topic: "Bu kanalda **bot başvurusu** yapmak için **/başvuru** yazınız!"}),
          işlemLogKanalı = await message.guild.createChannel({name: "başvurular", type: "text", topic: "Burada herhangi bir kullanıcı sisteme **botunu eklediği** zaman, botu **reddedildiği** veya **onaylandığı** zaman loglar gönderilir.", parent: başvurularKategorisi.id}),
          botLogKanalı = await message.guild.createChannel({name: "bot-log", type: "text", topic: "Burası adminler için **özel** olarak hazırlanmış bir bot log kanalı.", parent: başvurularKategorisi.id}),
          botTesterRolü = await message.guild.createRole({name: "Bot Testers", color: 0, mentionable: false, hoist: false}),
          üyeRolü = await message.guild.create
    } else if (response.content == ("hayır" || "hayir" || "Hayır" || "Hayir" || "No" || "no")) {
      return message.channel.send("İşlem **iptal** edildi!")
    } else return message.channel.send("**evet** veya **hayır** yazılmalıydı!");
  })
}
exports.conf = { aliases: [], permLevel: 10 };
exports.help = { name: "ayarla" };