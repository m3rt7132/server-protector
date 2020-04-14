const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  //dil
  var tr = [
    `${client.emoji.basarisiz} **Öneri log kanalı ayarlanmadığı için öneri yapılamıyor! Hemen ayarlamak için \`sp!öneri kanal <#kanal>\` yazınız!**`, //0
    `${client.emoji.basarisiz} **Öneri log kanalı zaten ayarlanmış!**`, //1
    `${client.emoji.basarisiz} **Bir kanal belirtmelisin!**`, //2
    `${client.emoji.basarili} **Öneri log kanalı başarıyla** __**ayarlandı!**__ **\`sp!öneri sıfırla\` yazarak sıfırlayabilirsiniz!**`, //3
    `${client.emoji.basarili} **Öneri log kanalı başarıyla** __**sıfırlandı!**__`, //4
    `${client.emoji.basarisiz} **Öneri log kanalı ayarlanmadığı için sıfırlayamazsınız!**`, //5
    `${client.emoji.basarisiz} **Öneri mesajını yazmalısın!**`, //6
    `Yeni bir önerimiz var!`, //7
    `ÜYE`, //8
    `ÖNERİ MESAJI`, //9
    `<a:hayir:647763587481206789> İşlem iptal edildi!`, //10
    `**Bu komut \`SUNUCUYU_YÖNET\` yetkisi gerektiriyor!**`, //11
    ``, //12
    ``, //13
    ``, //14
    ``, //15
    ``, //16
    ``, //17
    ``, //18
    ``, //19
    `` //20
  ];
  var en = [
    `${client.emoji.basarisiz} **You can't make suggestions because suggestions log channel isn't setted! Type \`sp!suggestion channel <#channel>\` for set the suggestions log channel!**`, //0
    `${client.emoji.basarisiz} **Suggestions log channel is already setted!**`, //1
    `${client.emoji.basarisiz} **You must specify a channel!**`, //2
    `${client.emoji.basarili} **Suggestions log channel is successfully** __**setted!**__ **You can type \`sp!suggestion reset\` for reset!**`, //3
    `${client.emoji.basarili} **Suggestions log channel is successfully** __**reseted!**__`, //4
    `${client.emoji.basarisiz} **Suggestions log channel isn't setted so you can't reset that!**`, //5
    `${client.emoji.basarisiz} **You must type your suggestion message!**`, //6
    `We got a new suggestion!`, //7
    `MEMBER`, //8
    `SUGGESTION MESSAGE`, //9
    `<a:hayir:647763587481206789> Access Denied!`, //10
    `**This command requires \`MANAGE_SERVER\` permission!**`, //11
    ``, //12
    ``, //13
    ``, //14
    ``, //15
    ``, //16
    ``, //17
    ``, //18
    ``, //19
    `` //20
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + message.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
  //dil
const önerikanal = await db.fetch(`önerikanal_${message.guild.id}`)
if (!args[0]) {
  if (!önerikanal) return message.channel.send(mesaj[0])
    let mesaj = args.slice(0).join(" ");
    if (!mesaj) return message.channel.send(mesaj[6])
      message.guild.channels.get(önerikanal).send(
        new Discord.RichEmbed()
        .setTitle(mesaj[7])
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(mesaj[8], `<@${message.author.id}> - \`${message.author.id}\` - \`${message.author.tag}\``)
        .addField(mesaj[9], "```\n"+mesaj+"\n```")
        .setColor(client.renk.turkuaz)
      ).then(messagee => {
        messagee.react(client.emoji.evet)
        messagee.react(client.emoji.hayir)
      })
    
  
}

if (args[0] === "kanal" || args[0] === "channel") {
  if (!message.member.hasPermission("MANAGE_GUILD")) 
    return message.channel.send(
      new Discord.RichEmbed()
      .setTitle(mesaj[10])  
      .setDescription(
         mesaj[11]
        )
        .setColor(client.ayarlar.hatarengi)
    )
  
 
  if (önerikanal) return message.channel.send(mesaj[1])
   
   let ganal = message.mentions.channels.first() || message.guild.channels.get(args[1]) || message.guild.channels.find(channel => channel.name === args.slice(1).join(" "))
  if (!ganal) return message.channel.send(mesaj[2])
  
     await db.set(`önerikanal_${message.guild.id}`, ganal.id)
     message.channel.send(mesaj[3])
  
}
if (args[0] === "sıfırla" || args[0] === "reset") {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    return message.channel.send(
      new Discord.RichEmbed()
      .setTitle(mesaj[10])  
      .setDescription(
         mesaj[11]
        )
        .setColor(client.ayarlar.hatarengi)
    )
      }
    else {
  if (!önerikanal) return message.channel.send(mesaj[5])
  else {
   await db.delete(`önerikanal_${message.guild.id}`)
   message.channel.send(mesaj[4])
  }
}
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["suggest", "sug","öneriyap", "sugs", "öner", "advice", "recommend", "suggestions"],
  permLevel: 0,
  maintenance: "NO"
};

exports.help = {
  name: "suggestion",
  name2: "öneri",
  description: "This command makes suggestions or advices for the server or bot.|Sunucunuz veya bot için öneriler yapar.",
  usage: "suggestion <your suggestion message>|öneri <öneri mesajın>",
  kategori:
    "user & kullanıcı"
};
