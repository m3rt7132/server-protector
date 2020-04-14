const Discord = require("discord.js");
const db = require("quick.db");
//const fs = require("fs");
const moment = require("moment");
//const ms = require("ms");

exports.run = async (client, message, args, params) => {
  let role =
    message.mentions.roles.first() ||
    message.guild.roles.get(args[0]) ||
    message.guild.roles.find(a => a.name.toLowerCase() === args.slice(0).join(" ").toLowerCase()) ||
    message.guild.roles.find(a => a.name === args.slice(0).join(" ")) ||
    message.guild.roles.find(a => a.hexColor === args.slice(0).join(" "))
  if (!role || role === undefined || role === null)
    return mesajGonder(client.emoji.basarisiz, `rol_bulunamadi`);
  let dil2 = await db.fetch(`language${message.guild.id}`);
  let hoist;
  let managed;
  if (dil2 == "tr") {
    if (role.hoist) hoist = "Açık";
    else hoist = "Kapalı";
    if (role.managed) managed = "Açık";
    else managed = "Kapalı";
  } else if (dil2 == "eng") {
    if (role.hoist) hoist = "ON";
    else hoist = "OFF";
    if (role.managed) managed = "ON";
    else managed = "OFF";
  }
  

  let acilmatarih; 
  if (dil2 == "tr") {
  acilmatarih = moment
    .utc(message.guild.roles.get(role.id).createdAt)
    .format("DD MMMM dddd YYYY [(][**]HH:mm:ss[**][)]")
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
  } else if (dil2 == "eng") {
    acilmatarih = moment
    .utc(message.guild.roles.get(role.id).createdAt)
    .format("DD MMMM dddd YYYY [(][**]HH:mm:ss[**][)]")
  }
  message.channel.send(
    new Discord.RichEmbed()
      .setColor(role.hexColor === "#000000" ? client.ayarlar.basarilirengi : role.hexColor)
      .setTitle(await mesajYaz("rol_bilgisi"))
      .addField(
        await mesajYaz("rol"),
        `**${(await mesajYaz("rolismi"))} =>** \`${role.name}\`\n**${await mesajYaz("roletiket")} =>** ${
          role.mentionable
            ? `<@&${role.id}>`
            : `\`${await mesajYaz("roletiketlenemez")}\``
        }\n**ID =>** \`${role.id}\`\n**${await mesajYaz(
          "roluonlardanfarkligoster"
        )} =>** ${hoist}\n**${await mesajYaz(
          "rol_managedmiyonetiyor"
        )} =>** ${managed}`
      )
      .addField(
        await mesajYaz("rol_digerbilgiler"),
        `**${await mesajYaz(
          "rol_acilmatarihi"
        )} =>** ${acilmatarih} (\`${(await tarihHesapla(message.guild.roles.get(role.id).createdAt))}\`)\n**${await mesajYaz("rol_hexrenkkodu")} =>** \`${
          role.hexColor
        }\`\n**${await mesajYaz(
          "rolesahipuye"
        )} [\`${role.members.size}\`] =>** ${role.members.size > 25 ? (await mesajYaz("rolesahipuyeyirmidenfazla")) : role.members.map(e => `<@${e.id}>`).join(" `|` ")} `
      )
  );

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
    return `${lang[dil]}`;
  }
  async function tarihHesapla(tarih) {
  if (dil2 == "tr") {
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
  } else if (dil2 == "eng") {
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
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [
    "rolbilgi",
    "roleinfo",
    "rolebilgi",
    "rolinfo",
    "rolstats",
    "rol-stats",
    "rb"
  ],
  permLevel: 0,
  maintenance: "NO"
};

exports.help = {
  name: "role-info",
  name2: "rol-bilgi",
  description:
    "This command shows roles info of you're specified a role.|Belirttiğiniz rolün bilgilerini verir.",
  usage: "ingilizce|türkçe",
  kategori: "user & kullanıcı"
};
