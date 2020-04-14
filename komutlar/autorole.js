const Discord = require("discord.js");
const db = require("quick.db");
//const fs = require("fs");
//const moment = require('moment');
//const ms = require("ms");

exports.run = async (client, message, args, params) => {
 
  var tr = [
    `${client.emoji.basarisiz} **Parametreler eksik: \`ayarla\`, \`sıfırla\`**`, //0
    `${client.emoji.basarisiz} **Otorol zaten sunucunuzda ayarlanmış! Sıfırlamak için \`sp!otorol sıfırla\` yaz!**`, //1
    `${client.emoji.basarisiz} **Bir rol belirtmelisin!**`, //2
    `${client.emoji.basarili} **Otorol başarıyla \`{rolreplace}\` rolüne ayarlandı!**`, //3
    `${client.emoji.basarisiz} **Otorol bu sunucuda daha önce ayarlanmadığı için sıfırlayamazsınız!**`, //4
    `${client.emoji.basarili} **Otorol başarıyla sıfırlandı!****`, //5
    `${client.emoji.basarisiz} **Benim rolümü belirttiğin rolün üstüne taşımalısın!**`, //6
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
    `${client.emoji.basarisiz} **You must first type the parameters: \`set\`, \`reset\`**`, //0
    `${client.emoji.basarisiz} **Auto role is already setted in this server!**`, //1
    `${client.emoji.basarisiz} **You must specify a role!**`, //2
    `${client.emoji.basarili} **Auto role is successfully setted to \`{rolreplace}\`!**`, //3
    `${client.emoji.basarisiz} **Auto role isn't setted in this server so you can't reset that!**`, //4
    `${client.emoji.basarili} **Auto role is successfully reseted!**`, //5
    `${client.emoji.basarisiz} **You must move my role above to your specified role!**`, //6
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
  
let otorol = await db.fetch(`otorol_${message.guild.id}`)
  if (!args[0] || (args[0] !== "set" && args[0] !== "reset" && args[0] !== "ayarla" && args[0] !== "sıfırla")) return message.channel.send(mesaj[0])
  if (args[0] === "set" || args[0] === "ayarla") {
    try {
    if (otorol) return message.channel.send(mesaj[1])
    else {
      let rol = message.mentions.roles.first() || message.guild.roles.get(args[1]) || message.guild.roles.find(a => a.name === args.slice(1).join(" "))
    if (!rol) return message.channel.send(mesaj[2])
      if (rol.position > message.guild.member(client.user).highestRole.position) return message.channel.send(mesaj[6])
      else {
        await db.set(`otorol_${message.guild.id}`, rol.id)
        message.channel.send(mesaj[3].replace("{rolreplace}", `${rol.name} <&> ${rol.id}`))
      }
      }
    } catch(err) {
      throw err
    }
  }
  if (args[0] === "reset" || args[0] === "sıfırla") {
    try {
    if (!otorol) return message.channel.send(mesaj[4])
    else {
      await db.delete(`otorol_${message.guild.id}`)
      message.channel.send(mesaj[5])
    }
    } catch(err) {
      throw err
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["otorole", "or", "ar", "oto-rol", "auto-role"],
  permLevel: 8,
  maintenance: "NO"
};

exports.help = {
  name: "autorole",
  name2: "otorol",
  description: "This command sets the autorole.|Otorol rolünü ayarlar.",
  usage: "autorole <@role or rolename or roleid>|otorol <@rol veya rolismi veya rolidsi>",
  kategori:
    "moderation & moderasyon"
};
