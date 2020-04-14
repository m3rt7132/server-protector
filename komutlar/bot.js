const Discord = require("discord.js");
const ayarlar = require("../ayarlar/ayarlar.json");

exports.run = async (client, message, args, params) => {
  // if (!args[0]) return message.channel.send(client.guilds.map(e => "// " + e.name + "\n | ID: " + e.id +  "\n | Kurucu: " + e.owner.user.tag + "\n | Kullanici sayisi: " + e.memberCount+`\n`), {split: true, code: "css"})
  var botsahibi = "343496705196556288"; // bot sahibinin id'si gelecek
  if(message.author.id != botsahibi) return;
  var bot;
  if (args[0] == "davet") {
  if (!args[1] && isNaN(args[1])) return message.reply("**KULLANIM:** " + ayarlar.prefix + "servers (davet) (sunucu id)")
    try {
    bot = client.guilds.get(args[1]).members.get("638751029629943838");
     if(!bot.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send("**HATA:** Botunuzun bu sunucuda davet oluşturma yetkisi yok.");
     client.guilds.get(args[1]).channels.random().createInvite().then(a => message.channel.send(a.url)) 
    }
    catch (err) {
      throw (err)
    } 
    return;
}
  else if (args[0] == "yetki") {
  if (!args[1] && isNaN(args[1])) return message.reply("**KULLANIM:** " + ayarlar.prefix + "servers (yetki) (sunucu id)")
    try {
      bot = client.guilds.get(args[1]).members.get("638751029629943838");
      var yetki = "";
      var evet = [];
      var hayir = [];
      var g = client.guilds.get(args[1]);
      if(bot.hasPermission("ADMINISTRATOR")) evet.push("✅ **ADMINISTRATOR**");
      else hayir.push("❌ **ADMINISTRATOR**");
      if(bot.hasPermission("BAN_MEMBERS")) evet.push("✅ **BAN_MEMBERS**");
      else hayir.push("❌ **BAN_MEMBERS**");
      if(bot.hasPermission("KICK_MEMBERS")) evet.push("✅ **KICK_MEMBERS**");
      else hayir.push("❌ **KICK_MEMBERS**");
      if(bot.hasPermission("SEND_MESSAGES")) evet.push("✅ **SEND_MESSAGES**");
      else hayir.push("❌ **SEND_MESSAGES**");
      if(bot.hasPermission("READ_MESSAGE_HISTORY")) evet.push("✅ **READ_MESSAGE_HISTORY**");
      else hayir.push("❌ **READ_MESSAGE_HISTORY**");
      if(bot.hasPermission("ADD_REACTIONS")) evet.push("✅ **ADD_REACTIONS**");
      else hayir.push("❌ **ADD_REACTIONS**");     
      if(bot.hasPermission("CREATE_INSTANT_INVITE")) evet.push("✅ **CREATE_INSTANT_INVITE**");
      else hayir.push("❌ **CREATE_INSTANT_INVITE**");   
      evet.map(ev => yetki += ev + "\n");
      hayir.map(ha => yetki += ha + "\n")
      var yetkiuyari = new Discord.RichEmbed()
      .setThumbnail(g.iconURL)
      .setColor("#36393f")
      .setTitle(g.name + " | Yetki kontrolü")
      .setDescription(yetki)
      message.channel.send(yetkiuyari);
    }
    catch (err) {
      throw (err)
    } 
    return;
}  
  for(let i = 0; i < (client.guilds.size / 7); i++) {
  
    const embed = new Discord.RichEmbed() 
  .setDescription(client.guilds.array()
 .map(s => `**İsim =>** \`${s.name}\`\n**Kurucu =>** <@${s.owner.user.id}>\n**Kullanıcı =>** \`${s.memberCount}\`\n**ID =>** \`${s.id}\`\n`)
 .slice((i * 6), ((i + 1) * 6))
 .join("\n"))
    .setColor(client.renk.turuncu)
    message.channel.send(embed)

 /* var hata = true;
  var kullanicisayi = args[0] ? args[0] : 0;
  if(kullanicisayi >= 0) {
    var mesaj = "";
    client.guilds.map(e => {
    if(e.memberCount >= kullanicisayi) {
      mesaj += "**" + e.name + "**\n | ID: " + e.id +  "\n | Kurucu: **" + e.owner.user.tag + "**\n | Kullanıcı sayısı: ``" + e.memberCount + "``\n\n";
      hata = false;
    }
    })
    if(hata) return message.channel.send("Bu aralıklarda bir sunucu bululunmuyor");
    var dongu = mesaj.length / 2048;
    for(let i = 0; i < dongu; i++) {  
      var sunucubilgi = new Discord.RichEmbed()
      .setDescription(mesaj.substr(2048*i, 2045))
      .setColor("#36393f")
      .setThumbnail(client.user.avatarURL)
      message.channel.send(sunucubilgi);    
    }
    
  }
  */
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bot"],
  permLevel: 11,
  maintenance: "NO"
};

exports.help = {
  name: "servers",
  name2: "sunucular",
  description: "This command shows the list of bot's servers it in",
  usage: "servers",
  kategori: "owner & sahip"
};
