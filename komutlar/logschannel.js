const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  //dil
  var tr = [
    `${client.emoji.basarisiz} **Sistem logları kanalını ayarlamak için \`ayarla\`, sıfırlamak için \`sıfırla\` yazın!**`, //0
    `${client.emoji.basarisiz} **Bu kanal zaten bu sunucuda \`ayarlanmış\`!**`, //1
    `${client.emoji.basarisiz} **Bir kanal belirtmelisin!**`, //2
    `${client.emoji.basarili} **Kanal başarıyla {e} olarak ayarlandı!**`, //3
    `${client.emoji.basarisiz} **Sistem logları kanalı bu sunucuda ayarlanmadığı için sıfırlayamazsınız!**`, //4
    `${client.emoji.basarili} **Sistem logları kanalı başarıyla sıfırlandı!**`, //5
    `${client.emoji.basarisiz} **Parametreler eksik:** \`modlog\`, \`sunuculogları\`, \`sistemlogları\``, //6
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
    `${client.emoji.basarisiz} **You must type \`set\` or \`reset\` to change logs channel!**`, //0
    `${client.emoji.basarisiz} **Looks like the that channel is already \`setted\` in this server!**`, //1
    `${client.emoji.basarisiz} **You must specify a channel!**`, //2
    `${client.emoji.basarili} **Succesfuly I set the channel to {e}!**`, //3
    `${client.emoji.basarisiz} **Logs channel isn't setted in this server so you can't reset that!**`, //4
    `${client.emoji.basarili} **Succesfuly reseted the logs channel!**`, //5
    `${client.emoji.basarisiz} **Missing parameters:** \`modlogs\`, \`serverlogs\`, \`systemlogs\``, //6
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
  if (
    !args[0] && (args[0] !== "modlog" || args[0] !== "serverlogs" || args[0] !== "systemlogs" || args[0] !== "sistemlogları" || args[0] !== "sunuculogları" || args[0] !== "modlogs")) return message.channel.send(mesaj[6])
  if (args[0] === "modlogs" || args[0] === "modlog") {
  let logkanal = await db.fetch(`modlogs_${message.guild.id}`);
    if (logkanal) { 
    let kanalmod = message.mentions.channels.first() || message.guild.channels.get(args[1]) || message.guild.channels.find(a => a.name === args.slice(1).join(" "))
  if (!kanalmod) return message.channel.send(mesaj[2])
    db.set(`modlogs_${message.guild.id}`, kanalmod.id)
      message.channel.send()
    } 
    }
  if (args[0] === "serverlogs" || args[0] === "sunuculogları") {
    let logkanal = await db.fetch(`serverlogs_${message.guild.id}`);
    if (args[1] === "set-channel" || args[1] === "kanal-ayarla") {
      if (logkanal) return message.channel.send(mesaj[2]);
      let kanal =
        message.mentions.channels.first() ||
        message.guild.channels.find(
          a =>
            a.name === args.slice(2).join(" ") ||
            message.guild.channels.get(args[2])
        );
      if (!kanal) return message.channel.send(mesaj[1]);
      db.set(`giriscikis_${message.guild.id}`, kanal.id);
      message.channel.send(mesaj[3]);
    }
    if (args[1] === "reset-channel" || args[1] === "kanal-sıfırla") {
      if (!logkanal) return message.channel.send(mesaj[4]);
      db.delete(`giriscikis_${message.guild.id}`);
      message.channel.send(mesaj[5]);
    }
  }
  if (args[0] === "systemlogs" || args[0] === "sistemlogları") {
    if (
      !args[1]
    )
      return message.channel.send(mesaj[0]);
      if (args[1] === "set" || args[1] === "ayarla") {
        let dbb = await db.fetch(`logschannel_${message.guild.id}`);
        if (dbb) return message.channel.send(mesaj[1]);
        let kanal =
          message.mentions.channels.first() ||
          message.guild.channels.get(args[2]);
        if (!kanal) return message.channel.send(mesaj[2]);
        await db.set(`logschannel_${message.guild.id}`, kanal.id);
        message.channel.send(
          mesaj[3].replace("<#{kanal.id}>", `<#${kanal.id}>`)
        );
      }

      if (args[1] === "reset" || args[1] === "sıfırla") {
        let dbb = await db.fetch(`logschannel_${message.guild.id}`);
        if (!dbb) return message.channel.send(mesaj[4]);
        await db.delete(`logschannel_${message.guild.id}`);
        message.channel.send(mesaj[5]);
      }
    
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["logs-channels", "logschannels", "logkanal", "logkanalı"],
  permLevel: 8,
  maintenance: "NO"
};

exports.help = {
  name: "set",
  name2: "ayarla",
  description:
    "This command sets anything of about log channels.|Sistem, sunucu veya moderasyon log kanallarını ayarlar.",
  usage:
    "set <systemlogs/serverlogs/modlogs>|ayarla <sistemlog/sunuculog/modlog>",
  kategori: "moderation & moderasyon"
};
