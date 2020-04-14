const Discord = require("discord.js");
const db = require("quick.db");
//const fs = require("fs");
//const moment = require('moment');
const ms = require("ms");

exports.run = async (client, message, args, params) => {
  //dil
  var tr = [
    `${client.emoji.basarisiz} **Geçerli bir zaman belirtmelisin! (\`ay ve hafta\` belirtemezsiniz, sadece \`saniye, dakika, saat, gün, yıl\` belirtebilirsiniz.)**\n${client.emoji.basarisiz} **Örnek kullanım =>** \`${client.ayarlar.prefix}hesaptara 95 gün\``,//0
    `Sunucuda hesabını oluşturma süresi "{surereplace} {zamanreplace}" tarihinden az "{kisireplace}" kişi bulunuyor!`,//1
  ];
  var en = [
    `${client.emoji.basarisiz} **You must specify a valid time! (You can't specify \`weeks and months\`, just \`seconds, minutes, hours, days, years\`)**\n${client.emoji.basarisiz} **Example Using =>** \`${client.ayarlar.prefix}findfakes 2 days\``,//0
    `There are "{kisireplace}" members whose accounts have less than "{surereplace} {zamanreplace}" creation date in this server!`,//1
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + message.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
//dil
  
  let süre = args[0];
  let zaman = args[1];
  if (
    !süre ||
    !zaman ||
    zaman.includes("week") ||
    zaman.includes("month") ||
    zaman.includes("weeks") ||
    zaman.includes("months") ||
    zaman.includes("ay") ||
    zaman.includes("hafta") ||
    (zaman !== "seconds" &&
      zaman !== "second" &&
      zaman !== "minute" &&
      zaman !== "minutes" &&
      zaman !== "hours" &&
      zaman !== "hour" &&
      zaman !== "days" &&
      zaman !== "day" &&
      zaman !== "years" &&
      zaman !== "year" &&
      zaman !== "saniye" &&
      zaman !== "sn" &&
      zaman !== "dakika" &&
      zaman !== "dk" &&
      zaman !== "saat" &&
      zaman !== "sa" &&
      zaman !== "gün" &&
      zaman !== "yıl" &&
      zaman !== "sene")
  )
    return message.channel.send(
   mesaj[0]
    );
  let üyeler = message.guild.members.filter(
    üye =>
      !üye.user.bot &&
      new Date().getTime() - üye.user.createdAt.getTime() <
        ms(
          (süre + zaman)
            .replace("seconds", "s")
            .replace("second", "s")
            .replace("minutes", "m")
            .replace("minute", "m")
            .replace("hours", "h")
            .replace("hour", "h")
            .replace("day", "d")
            .replace("days", "d")
            .replace("years", "y")
            .replace("year", "y")
            .replace("saniye", "s")
            .replace("sn", "s")
            .replace("dakika", "m")
            .replace("dk", "m")
            .replace("saat", "h")
            .replace("sa", "h")
            .replace("gün", "d")
            .replace("yıl", "y")
            .replace("sene", "y")
             )
  );
  message.channel.send(
    `${üyeler
      .map(yashinu => `${yashinu.user.tag} │ ${yashinu.user.id} `)
      .join("\n")} \n\n# ${mesaj[1].replace("{kisireplace}", üyeler.size).replace("{surereplace}", süre).replace("{zamanreplace}", zaman)}`,
    { code: "xl", split: true }
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ff", "findfake", "sahte-hesap-tara", "hesaptara"],
  permLevel: 8,
  maintenance: "NO"
};

exports.help = {
  name: "findfakes",
  name2: "hesap-tara",
  description: "This command lists users who has creation date have less than your choice.|Hesabının oluşturulma tarihi yazdığınız süreden az olan hesapları listeler.",
  usage: "findfakes <time>|hesaptara <süre>",
  kategori: "moderation & moderasyon"
};
