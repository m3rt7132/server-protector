const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args, params) => {
  //dil
  var tr = [
    `Sunucu ayarları`, //0
    `Botun dili:`, //1
    `Botun prefixi(ön eki):`, //2
    `Sistem log kanalı`, //3
    `Geçerli Ayar`, //4
    `Kanal ayarlanmamış.`, //5
    `Kanal Koruma Sistemi`, //6
    `Bu sistem sunucuda kapalıdır.`, //7
    `Rol Koruma Sistemi`, //8
    `Giriş çıkış log kanalı`, //9
    `Giriş çıkış hoşgeldin mesajı`, //10
    `Giriş hoşgeldin mesajı ayarlanmamış!`, //11
    `Otorol sistemi`, //12
    `Sunucu kilit`, //13
    ``, //14
    ``, //15
    ``, //16
    ``, //17
    ``, //18
    ``, //19
    `` //20
     ];
  var en = [
    `Server's Current Settings`, //0
    `Bot's Language:`, //1
    `Bot's prefix:`, //2
    `System Logs Channel`, //3
    `Value`, //4
    `This channel isn't setted`, //5
    `Channel Protector`, //6
    `This system is currently OFF`, //7
    `Role Protector`, //8
    `Joins-Leaves log channel`, //9
    `Joins-leaves welcome message`, //10
    `Welcome message isn't setted!`, //11
    `Auto Role System`, //12
    `Server lock`, //13
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
  let sunucukilitban = await db.fetch(`sunucukilitban_${message.guild.id}`)
  let sunucukilitkick = await db.fetch(`sunucukilitkick_${message.guild.id}`)
  let kanalkoruma = await db.get(`channelprotect_${message.guild.id}`);
  let logchannel = await db.get(`logschannel_${message.guild.id}`);
  let rolkoruma = await db.get(`roleprotect_${message.guild.id}`);
  let dil2 = await db.get(`language${message.guild.id}`);
  let giriscikis = await db.get(`giriscikis_${message.guild.id}`);
  let giriscikismesaj = await db.get(`giriscikismesaj_${message.guild.id}`)
  let otorol = await db.get(`otorol_${message.guild.id}`)
  let orço; 
  let kk;
  let lc;
  let rc;
  let d2;
  let gc;
  let gcmsg;
  let kilit;
  let kilitban;
  let kilitkick;
  if (sunucukilitban) kilitban = client.emoji.evet
  else kilitban = client.emoji.hayir
  if (sunucukilitkick) kilitkick = client.emoji.evet
  else kilitkick = client.emoji.hayir
  if (otorol) orço = client.emoji.evet
  else orço = client.emoji.hayir
  if (giriscikismesaj) gcmsg = client.emoji.evet
  else gcmsg = client.emoji.hayir
  if (giriscikis) gc = client.emoji.evet;
  else gc = client.emoji.hayir;
  if (dil2) d2 = `${client.emoji.evet}`;
  else d2 = `${client.emoji.hayir}`;
  if (kanalkoruma) kk = `${client.emoji.evet}`;
  else kk = `${client.emoji.hayir}`;
  if (logchannel) lc = `${client.emoji.evet}`;
  else lc = `${client.emoji.hayir}`;
  if (rolkoruma) rc = `${client.emoji.evet}`;
  else rc = `${client.emoji.hayir}`;
  message.channel.send(
    new Discord.RichEmbed()
      .setTitle(mesaj[0])
      .setColor(client.ayarlar.basarilirengi)
      .setDescription(
        `**${mesaj[1]}** \`${dil2
          .replace("tr", "Türkçe")
          .replace("eng", "English")}\`\n**${mesaj[2]}** \`${
          client.ayarlar.prefix
        }\` `
      )
      .addBlankField(true)
      .addField(
        `${mesaj[3]} ${lc}`,
        `**${mesaj[4]} =>** ${logchannel ? `<#${logchannel}>` : `${mesaj[5]}`}`
      )
      .addField(
        `${mesaj[6]} ${kk}`,
        `**${mesaj[4]} =>** ${
          kanalkoruma ? `${kanalkoruma.toUpperCase().replace("ON", "ON **/** Açık")}` : `${mesaj[7]}`
        }`
      )
      .addField(
        `${mesaj[8]} ${rc}`,
        `**${mesaj[4]} =>** ${
          rolkoruma ? `${rolkoruma.toUpperCase().replace("ON", "ON **/** Açık")}` : `${mesaj[7]}`
        }`
      )
      .addField(
        `${mesaj[9]} ${gc}`,
        `**${mesaj[4]} =>** ${giriscikis ? `<#${giriscikis}>` : `${mesaj[5]}`}`
      )
    .addField(
        `${mesaj[10]} ${gcmsg}`,
        `**${mesaj[4]} =>** ${giriscikismesaj ? "```"+giriscikismesaj+"```" : `${mesaj[11]}`}`
      )
    .addField(`${mesaj[12]} ${orço}`, `**${mesaj[4]} =>** ${otorol ? `<@&${otorol}> && \`${otorol}\`` : `${mesaj[11]}`}`)
  
  );

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["panel", "serversettings", "sets"],
  permLevel: 8,
  maintenance: "NO"
};

exports.help = {
  name: "settings",
  name2: "ayarlar",
  description:
    "This command shows server's current settings.|Sunucunun ayarlarını gösterir.",
  usage: "settings|ayarlar",
  kategori: "moderation & moderasyon"
};
