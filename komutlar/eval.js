const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const a = require("../ayarlar/ayarlar.json");
const moment = require("moment");
const ms = require("ms");
const hd = require("humanize-duration");
const request = require("request");
exports.run = async (client, message, args, params) => {
  let aa = ["343496705196556288", "356119310462091265", "558016135052787773"]
  if (!aa.includes(message.author.id)) return;
  if (!args[0] || args[0].includes("token"))
    return message.channel.send(
      `${client.emoji.basarisiz} **You must type a code!**`
    );

  const code = args.join(" ");
  try {
    var evaled = clean(await eval(code));
    if (evaled.match(new RegExp(`${client.token}`, "g")))
      evaled
        .replace("token", "Verdim tokeni hissettin mi kardeşim")
        .replace(client.token, "Verdim tokeni hissettin mi kardeşim")
        .replace(
          process.env.PROJECT_INVITE_TOKEN,
          "Verdim tokeni hissettin mi kardeşim"
        );
    message.channel.send(
      `${evaled
        .replace(client.token, "Verdim tokeni hissettin mi kardeşim")
        .replace(
          process.env.PROJECT_INVITE_TOKEN,
          "Verdim tokeni hissettin mi kardeşim"
        )}`,
      { code: "js", split: true }
    );
  } catch (err) {
    message.channel.send(err, { code: "js", split: true });
  }
function clean(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 0 });
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
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
    return `${lang[dil]}`;
  }
  async function tarihHesapla(tarih) {
    if (db.get(`language${message.guild.id}`) == "tr") {
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
      return süre + " önce";
    } else if (db.get(`language${message.guild.id}`) == "eng") {
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
      return süre + " ago";
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  maintenance: "NO"
};

exports.help = {
  name: "eval",
  name2: "eval",
  description: "This command testing the JavaScript codes.",
  usage: "eval",
  kategori: "owner & sahip"
};
