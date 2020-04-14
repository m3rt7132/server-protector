const Discord = require("discord.js");
const db = require("quick.db");
//const fs = require("fs");
//const moment = require('moment');
//const ms = require("ms");

exports.run = async (client, message, args) => {
  let dil2 = await db.fetch(`language${message.guild.id}`)

  let member = message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member || member.bot) return mesajGonder(client.emoji.basarisiz, "rol_uyeetiketle")
  let role = message.mentions.roles.first() || message.guild.roles.get(args[1]) || message.guild.roles.find(a => a.name.toLowerCase() === args.slice(1).join(" ").toLowerCase())
  if (!role) return mesajGonder(client.emoji.basarisiz, "rol_roletiketle")
  if (message.guild.member(client.user).highestRole.position < role.position) return mesajGonder(client.emoji.basarisiz, "rol_pozisyonubottandusuk")
  if (role.position > message.member.highestRole.position) return mesajGonder(client.emoji.basarisiz, "rol_pozisyonuyedendusuk")
 console.log(member.roles.has(role))
  if (!message.guild.member(member.id).roles.has(role.id)) {
    mesajGonder(client.emoji.basarili, "rol_rolverildi")
    member.addRole(role).catch(err => mesajGonder(client.emoji.basarisiz, "rol_botunyetkisiyok"))
  } else {
    mesajGonder(client.emoji.basarili, "rol_rolalindi")
     member.removeRole(role).catch(err => mesajGonder(client.emoji.basarisiz, "rol_botunyetkisiyok"))
  }
  
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
  aliases: ["give-role", "take-role", "rolver", "rolal", "rv", "giverole", "takerole", "addrole", "add-role", "rol-ver", "rol-al", "removerole", "remove-role"],
  permLevel: 4,
  maintenance: "NO"
};

exports.help = {
  name: "role",
  name2: "rol",
  description: "This command gives role or takes role if user has the specified role.|Üyede belirttiğiniz rol varsa alır yoksa rolü üyeye verir.",
  usage: "role <@mention/member id)> <@mention a role/role id/role name>|rol <@etiket/üyeid> <@rol etiketi/rol id/rol ismi>",
  kategori:
    "moderation & moderasyon"
};
