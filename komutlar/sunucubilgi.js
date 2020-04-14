const Discord = require("discord.js");
const db = require("quick.db");
//const fs = require("fs");
const moment = require('moment');
//const ms = require("ms");

exports.run = async (client, message, args) => {
let dil = await db.fetch(`language${message.guild.id}`)

  
  let acilmatarih;
  let acilmatarih2;
  
  if (dil == "tr") {
    acilmatarih2 = moment
    .utc(message.guild.owner.user.createdAt)
    .format("DD MMMM dddd YYYY ([**]HH:mm:ss[**])")
    .replace("Monday", `Pazartesi`)
    .replace("Tuesday", `Salı`)
    .replace("Wednesday", `Çarşamba`)
    .replace("Thursday", `Perşembe`)
    .replace("Friday", `Cuma`)
    .replace("Saturday", `Cumartesi`)
    .replace("Sunday", `Pazar`)
    .replace("January", `Ocak`)
    .replace("February", `Şubat`)
    .replace("March", `Mart`)
    .replace("April", `Nisan`)
    .replace("May", `**Mayıs`)
    .replace("June", `Haziran`)
    .replace("July", `Temmuz`)
    .replace("August", `Ağustos`)
    .replace("September", `Eylül`)
    .replace("October", `Ekim`)
    .replace("November", `Kasım`)
    .replace("December", `Aralık`);
  acilmatarih = moment
    .utc(message.guild.createdAt)
    .format("DD MMMM dddd YYYY ([**]HH:mm:ss[**])")
    .replace("Monday", `Pazartesi`)
    .replace("Tuesday", `Salı`)
    .replace("Wednesday", `Çarşamba`)
    .replace("Thursday", `Perşembe`)
    .replace("Friday", `Cuma`)
    .replace("Saturday", `Cumartesi`)
    .replace("Sunday", `Pazar`)
    .replace("January", `Ocak`)
    .replace("February", `Şubat`)
    .replace("March", `Mart`)
    .replace("April", `Nisan`)
    .replace("May", `**Mayıs`)
    .replace("June", `Haziran`)
    .replace("July", `Temmuz`)
    .replace("August", `Ağustos`)
    .replace("September", `Eylül`)
    .replace("October", `Ekim`)
    .replace("November", `Kasım`)
    .replace("December", `Aralık`);
  } else if (dil == "eng") {
    acilmatarih = moment
    .utc(message.guild.createdAt)
    .format("DD MMMM dddd YYYY ([**]HH:mm:ss[**])")
     acilmatarih2 = moment
    .utc(message.guild.owner.user.createdAt)
    .format("DD MMMM dddd YYYY ([**]HH:mm:ss[**])")
  }
let r = message.guild.region  
let re;
if (dil == "tr") {
   if (r == "russia") {
     re = "Rusya"
   }
  else if (r == "us-west") {
    re = "Batı Amerika"
  }
  else if (r == "us-south") {
    re = "Güney Amerika"
  }
  else if (r == "us-east") {
    re = "Doğu Amerika"
  }
  else if (r == "us-central") {
    re = "Amerika"
  }
  else if (r == "brazil") {
    re = "Brezilya"
  }
  else if (r == "singapore") {
    re = "Singapur"
  }
  else if (r == "sydney") {
    re = "Sidney"
  }
  else if (r == "europe") {
    re = "Avrupa"
  }
  else if (r == "eu-west") {
    re = "Batı Avrupa"
  }
  else if (r == "eu-south") {
    re = "Güney Avrupa"
  }
  else if (r == "eu-east") {
    re = "Doğu Avrupa"
  }
  else if (r == "eu-central") {
    re = "Orta Avrupa"
  }
  else if (r == "hongkong") {
    re = "Hong Kong"
  }
  else if (r == "japan") {
    re = "Japonya"
  }
} if (dil == "eng") {
  if (r == "us-central") {
    re = "America"
  }
  else if (r == "us-south") {
    re = "South America"
  }
  else if (r == "us-east") {
    re = "East America"
  }
  else if (r == "us-west") {
    re = "West America"
  }
  else if (r == "russia") {
    re = "Russia"
  }
  else if (r == "eu-central") {
    re = "Central Europe"
  }
  else if (r == "eu-west") {
    re = "West Europe"
  }
  else if (r == "eu-south") {
    re = "South Europe"
  }
  else if (r == "eu-east") {
    re = "East Europe"
  }
  else if (r == "japan") {
    re = "Japan"
  }
  else if (r == "hongkong") {
    re = "Hong Kong"
  }
  else if (r == "sydney") {
    re = "Sydney"
  }
  else if (r == "brazil") {
    re = "Brazil"
  }
  else if (r == "singapore") {
    re = "Singapore"
  }
  else if (r == "europe") {
    re = "Europe"
  }
}
  /*
  "textkanal": "Yazı kanalı",
  "voicekanal": "Ses kanalı",
  "categorykanal": "Kategori",
  "roller": "Roller",
  "emojiler": "Emojiler"
  */
    message.channel.send(
    new Discord.RichEmbed()
   .setTitle((await mesajYaz("sunucu_bilgisi")))
   .setThumbnail(message.guild.iconURL === null ? message.guild.owner.user.avatarURL : message.guild.iconURL)
   .setColor(message.member.highestRole.hexColor)
   .addField((await mesajYaz("sunucu")), `**${(await mesajYaz("rolismi"))} =>** \`${message.guild.name}\`\n**${(await mesajYaz("sunucu_bolgesi"))} =>** \`${re}\`\n**${(await mesajYaz("sunucu_sistemkanali"))} =>** ${message.guild.systemChannel === null ? `\`${(await mesajYaz("sunucu_sistemkanaliyok"))}\`` : `<#${message.guild.systemChannelID}> \`|\` \`${message.guild.systemChannelID}\``}\n**${(await mesajYaz("sunucu_afkkanali"))} =>** ${message.guild.afkChannel === null ? "`"+(await mesajYaz("sunucu_sistemkanaliyok"))+"`" : `${message.guild.afkChannel.name} \`|\` \`${message.guild.afkChannelID}\``}\n**${(await mesajYaz("sunucu_afktimeout"))} =>** ${message.guild.afkTimeout === 300 ? `\`300 ${(await mesajYaz("saniye"))}\` (${(await mesajYaz("default"))})` : `\`${message.guild.afkTimeout}\` ${(await mesajYaz("saniye"))}`}\n**${(await mesajYaz("sunucu_iconurl"))} =>** ${message.guild.iconURL === null ? "`"+(await mesajYaz("sunucu_iconyok"))+"`" : `[URL](${message.guild.iconURL})`}\n**${(await mesajYaz("sunucu_kurulmatarih"))} =>** ${acilmatarih} (\`${(await tarihHesapla(message.guild.createdAt))}\`)`)
   .addField((await mesajYaz("sunucu_sayisalistatistikler")), `**${(await mesajYaz("sunucu_uyesayisi"))} =>** \`${message.guild.memberCount}\`\n**${(await mesajYaz("textkanal"))} =>** \`${message.guild.channels.filter(a => a.type === "text").size}\`\n**${(await mesajYaz("voicekanal"))} =>** ${message.guild.channels.filter(a => a.type === "voice").size === 0 ? "`0`" : "`"+message.guild.channels.filter(a => a.type === "voice").size+"`"}\n**${(await mesajYaz("categorykanal"))} =>** \`${message.guild.channels.filter(a => a.type === "category").size === 0 ? "`0`" : "`"+message.guild.channels.filter(a => a.type === "category").size+"`"}\`\n**${(await mesajYaz("roller"))} =>** \`${message.guild.roles.filter(a => a.name !== "@everyone").size === 0 ? "`0`" : "`"+message.guild.roles.filter(a => a.name !== "@everyone").size+"`"}\`\n**${(await mesajYaz("emojiler"))} =>** ${message.guild.emojis.size === 0 ? "`0`" : "`"+message.guild.emojis.size+"`"}\n**${(await mesajYaz("onlineuye"))} =>** \`${message.guild.members.filter(a => a.presence.status !== "offline").size === 0 ? "`0`" : "`"+message.guild.members.filter(a => a.presence.status !== "offline").size+"`"}\`\n**${(await mesajYaz("offlineuye"))} =>** ${message.guild.members.filter(a => a.presence.status === "offline").size === 0 ? "`0`" : "`"+message.guild.members.filter(a => a.presence.status === "offline").size+"`"}`)
   .addField((await mesajYaz("sunucu_sahibi")), `**${(await mesajYaz("sunucu_sahipetiket"))} =>** <@${message.guild.ownerID}>\n**${(await mesajYaz("rolismi"))} =>** **${message.guild.owner.user.tag}**\n**${(await mesajYaz("sunucu_sahipid"))} =>** \`${message.guild.ownerID}\`\n**${(await mesajYaz("sunucu_sahipavatar"))} =>** ${message.guild.owner.user.avatarURL === null ? `\`${(await mesajYaz("sunucu_sahipavataryok"))}\`` : `[URL!](${message.guild.owner.user.avatarURL})`}\n**${(await mesajYaz("sunucu_sahipkurulus"))} =>** ${acilmatarih2} (\`${(await tarihHesapla(message.guild.owner.user.createdAt))}\`)`)
      /*
      "sunucu_sahibi": "__Owner__",
  "sunucu_sahipetiket": "Mention",
  "sunucu_sahipid": "ID",
  "sunucu_sahipavatar": "Profile Photo",
  "sunucu_sahipkurulus": "Account creation date"
  */
    )
  async function mesajGonder(emoji, dil) {
    let lang = await db.fetch(`language${message.guild.id}`);
    if (lang === "tr") lang = "tr";
    else if (lang === "eng") lang = "eng";
    lang = client.lang(lang);
    return message.channel.send(`${emoji} ${lang[dil]}`);
  }
  async function mesajYaz(dil) {
    let lang = await db.fetch(`language${message.guild.id}`);
    if (lang === "tr") lang = "tr";
    else if (lang === "eng") lang = "eng";
    lang = client.lang(lang);
    return `${lang[dil]}`
  }
async function tarihHesapla(tarih) {
  if (dil == "tr") {
  let süre = Date.now() - tarih;
  let saniye = süre / 1000;
  let gün = parseInt(saniye / 86400);
  saniye = saniye % 86400;
  let saat = parseInt(saniye / 3600);
  saniye = saniye % 3600;
  let dakika = parseInt(saniye / 60);
  saniye = parseInt(saniye % 60);

  süre = `${saniye} saniye`;
  if (gün) süre = `${gün} gün`;
  else if (saat) saat = `${saat} saat`;
  else if (dakika) dakika = `${dakika} dakika`;
  return süre + " önce"
  } else if (dil == "eng") {
    let süre = Date.now() - tarih;
  let saniye = süre / 1000;
  let gün = parseInt(saniye / 86400);
  saniye = saniye % 86400;
  let saat = parseInt(saniye / 3600);
  saniye = saniye % 3600;
  let dakika = parseInt(saniye / 60);
  saniye = parseInt(saniye % 60);

  süre = `${saniye} seconds`;
  if (gün) süre = `${gün} days`;
  else if (saat) saat = `${saat} hours`;
  else if (dakika) dakika = `${dakika} minutes`;
  return süre + " ago"
  }
};
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sunucubilgi", "si", "sinfo", "sbilgi", "sb", "s-b", "s-i","guildinfo", "serverinfo"],
  permLevel: 0,
  maintenance: "NO"
};

exports.help = {
  name: "server-info",
  name2: "sunucu-bilgi",
  description: "This command shows almost every detail about this server.|Sunucunun neredeyse bütün bilgilerini gösterir.",
  usage: "server-info|sunucu-bilgi",
  kategori:
    "user & kullanıcı"
};
