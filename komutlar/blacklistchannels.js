const Discord = require("discord.js");
const db = require("quick.db");
//const fs = require("fs");
//const moment = require('moment');

exports.run = async (client, message, args, params) => {
  let kanallar = await db.fetch(`blacklist_${message.guild.id}`);
  //dil
  var tr = [
    `${client.emoji.basarisiz} **Kara listeye bir kanal alabilmek için bir kanal etiketlemelisin!**`, //0
    `${client.emoji.basarili} **Server Protector botu artık {kanalreplace} kanalında \`çalışacak\`! Karalistedeki kanallarda sadece \`karaliste\` komutu kullanılabilir!**`, //1
    `${client.emoji.basarili} **Server Protector botu artık {kanalreplace} kanalında \`çalışmayacak\`! Karalistedeki kanallarda sadece \`karaliste\` komutu kullanılabilir!**`, //2
    `**Bu kanallar içerisinde bot kullanılmayacak!**`, //3
    `**Sunucuda hiç kara listede kanal bulunmuyor!**`, //4
    `Karalistedeki kanallar!`, //5
    `Liste`,//6
    `${client.emoji.basarili} **Temizlendi!**`,//7
    `${client.emoji.basarisiz} **Karalisteden kanal çıkartabilmek için bir kanal ID'si girmelisin!**`,//8
  ];
  var en = [
    `${client.emoji.basarisiz} **You must mention a channel to blacklist a channel!**`, //0
    `${client.emoji.basarili} **The Server Protector Bot will \`work in\` {kanalreplace} channel! You can only use \`blacklist\` command in blacklisted channels!**`, //1
    `${client.emoji.basarili} **The Server Protector Bot will \`not work in\` {kanalreplace} channel! You can only use \`blacklist\` command in blacklisted channels!**`, //2
    `**In this channels, bot will not work!**`, //3
    `**There's noone blacklisted channel**`, //4
    `Blacklisted Channels!`, //5
    `List`,//6
    `${client.emoji.basarili} **Successfully cleared!**`,//7
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + message.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
  //dil
  
  if (args[0] === "list" || args[0] === "liste") {
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle(mesaj[5])
        .setColor(client.ayarlar.basarilirengi)
        .setTimestamp()
        .addField(
          mesaj[6],
          kanallar
            ? kanallar.map(x => `<#${x.slice(1)}> - \`${message.guild.channels.get(x.slice(1)).id}\``).join("\n") +
                `\n\n${mesaj[3]}`
            : mesaj[4]
        )
    );
    
  }
  if (!args[0]) {
  let kanal =
    message.mentions.channels.first() || message.guild.channels.get(args[0])
  if (!kanal)
    return message.channel.send(mesaj[0]);

  if (kanallar && kanallar.some(id => `k${kanal.id}` === id)) {
    db.delete(`blacklist_${message.guild.id}`, `k${kanal.id}`);
    kanallar.forEach(v => {
      if (!v.includes(`k${kanal.id}`)) {
        db.push(`blacklist_${message.guild.id}`, v);
      }
    });
    message.channel.send(mesaj[1].replace("{kanalreplace}", `<#${kanal.id}>`));
  } else {
    db.push(`blacklist_${message.guild.id}`, `k${kanal.id}`);
    message.channel.send(mesaj[2].replace("{kanalreplace}", `<#${kanal.id}>`));
  }}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [
    "channelblacklist",
    "blacklistchannel",
    "blacklist",
    "bc",
    "kara-liste",
    "kl",
    "kanalkaraliste"
  ],
  permLevel: 8,
  maintenance: "NO"
};

exports.help = {
  name: "blacklist",
  name2: "karaliste",
  description: "This command sets the blacklist channels that you don't want the bot to work|Karalisteye aldığınız kanallarda botun kullanılmasını engeller!",
  usage: "blacklist <#channel>|karaliste <#kanal>",
  kategori: "moderation & moderasyon"
};
