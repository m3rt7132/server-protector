const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let dil2 = await db.fetch(`language${message.guild.id}`)
if (!args[0] && (args[0] !== "ban" || args[0] !== "kick")) return mesajGonder(client.emoji.basarisiz, "kilitle_argseksik")
  let sunucukilitban = await db.fetch(`sunucukilitban_${message.guild.id}`)
  let sunucukilitkick = await db.fetch(`sunucukilitkick_${message.guild.id}`)
  if (args[0] === "ban") {
    if (sunucukilitkick) return mesajGonder(client.emoji.basarisiz, "kilitle_zatenkickacik")
    if (!sunucukilitban) {
      await db.set(`sunucukilitban_${message.guild.id}`, "on")
      mesajGonder(client.emoji.basarili, "kilitle_banacildi")
    } else {
      await db.delete(`sunucukilitban_${message.guild.id}`)
      mesajGonder(client.emoji.basarili, "kilitle_bankapatildi")
    }
  }
  if (args[0] === "kick") {
    if (sunucukilitban) return mesajGonder(client.emoji.basarisiz, "kilitle_zatenbanacik")
    if (!sunucukilitkick) {
      await db.set(`sunucukilitkick_${message.guild.id}`, "on")
      mesajGonder(client.emoji.basarili, "kilitle_kickacildi")
    } else {
      await db.delete(`sunucukilitkick_${message.guild.id}`)
      mesajGonder(client.emoji.basarili, "kilitle_kickkapatildi")
    }
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
  aliases: ["lockdown", "sunucukilitle", "sunucu-kilitle", "kilit", "sk", "kilitle", "sunucukoruma", "sunucukilit", "lock", "lockserver", "lock-"],
  permLevel: 10,
  maintenance: "NO"
};

exports.help = {
  name: "lock-server",
  name2: "sunucuyu-kilitle",
  description: "This command locks the server.|Sunucuya giren üyeleri yasaklayarak/atarak kilitlemeyi sağlar. Açıp kapatılabilir.",
  usage: "lock-server <ban/kick>|sunucu-kilit <ban/kick>",
  kategori:
    "protection & koruma"
};
