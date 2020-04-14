const Discord = require("discord.js");
const db = require("quick.db");
//const fs = require("fs");
//const moment = require('moment');
//const ms = require("ms");

exports.run = async (client, message, args, params) => {
  //dil
  var tr = [
    `${client.emoji.basarisiz} **Mesajları silmek için \`1 ile 400\` arasında bir sayı yazmalısınız!**`, //0
    `${client.emoji.basarili} **\`{abc}\` adet mesaj silindi!**`, //1
    ``, //2
    ``, //3
    ``, //4
    ``, //5
    ``, //6
    ``, //7
    ``, //8
    ``, //9
    ``, //10
    ``, //11
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
    `${client.emoji.basarisiz} **You must type a number \`between 1 and 400\` to clear messages in this channel!**`, //0
    `${client.emoji.basarili} **\`{abc}\` messages has cleared!**`, //1
    ``, //2
    ``, //3
    ``, //4
    ``, //5
    ``, //6
    ``, //7
    ``, //8
    ``, //9
    ``, //10
    ``, //11
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

 let abc = args.slice(0).join('')
  if(isNaN(abc)) return message.channel.send(mesaj[0]);
  if(!abc) return message.channel.send(mesaj[0]);
  //Yashinu
  if(abc > 1 && abc <= 100) {
    await(message.delete())
    message.channel.bulkDelete(abc).then(() => {
    message.channel.send(mesaj[1].replace("{abc}", `${abc}`)).then(msg => msg.delete(5000));
    })
  } else if(abc > 100 && abc <= 200) {
    await(message.delete())
    message.channel.bulkDelete(100)
    message.channel.bulkDelete(abc-100).then(() => {
    message.channel.send(mesaj[1].replace("{abc}", `${abc}`)).then(msg => msg.delete(5000));
    })
  } else if(abc > 200 && abc <= 300) {
    await(message.delete())
    message.channel.bulkDelete(100)
    message.channel.bulkDelete(100)
    message.channel.bulkDelete(abc-200).then(() => {
    message.channel.send(mesaj[1].replace("{abc}", `${abc}`)).then(msg => msg.delete(5000));
    })
  } else if(abc > 300 && abc <= 400) {
    await(message.delete())
    message.channel.bulkDelete(100)
    message.channel.bulkDelete(100)
    message.channel.bulkDelete(100)
    message.channel.bulkDelete(abc-300).then(() => {
    message.channel.send(mesaj[1].replace("{abc}", `${abc}`)).then(msg => msg.delete(5000));
    })
  } else {
    message.channel.send(mesaj[0]);
  }
  
    

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil"],
  permLevel: 1,
  maintenance: "NO"
};

exports.help = {
  name: "clear",
  name2: "temizle",
  description: "ingilizce|türkçe",
  usage: "clear <1-400>|temizle <1-400>",
  kategori:
    "moderation & moderasyon"
};
