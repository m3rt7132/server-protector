const Discord = require('discord.js');
const db = require("quick.db");
//const fs = require("fs");
const moment = require('moment');
//const ms = require("ms");

exports.run = async(client, message, args, params) => {
   //dil
  var tr = [
    `${client.emoji.basarisiz} **Üyeleri bulunduğun kanala çekebilmek için bir sesli kanala giriş yapman gerekli!**`, //0
    `${client.emoji.basarisiz} **Sunucudaki ses kanallarında herhangi bir üye bulunmuyor!**`, //1
    `${client.emoji.basarisiz} **Herkes aynı odada olduğu için kimse bir yere taşınmadı**`, //2
    `${client.emoji.basarili} **Başarıyla** \`{say}\` **üye** \`{message.member.voiceChannel.name}\` **adlı kanala taşındı!**`, //3
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
    `${client.emoji.basarisiz} **You must join a voice channel to move all members to voice channel you are in!**`, //0
    `${client.emoji.basarisiz} **There are no any members in the all voice channels!**`, //1
    `${client.emoji.basarisiz} **No one moved to voice channel you are in!**`, //2
    `${client.emoji.basarili} **Successfully moved** \`{say}\` **members to voice channel called with** \`{message.member.voiceChannel.name}\` **!**`, //3
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

  if (!message.member.voiceChannel) return message.channel.send(mesaj[0]);
  let hata = true;
  message.guild.members.filter(s => {
  if (s.voiceChannel) hata = false;     
  })
  if (hata == true) message.channel.send(mesaj[1])
    try {
      let say = 0
    client.channels
    .filter(c => c.type === "voice")
    .map(a => {
      if (a.members.size > 0) {
        a.members.map(k => {
          if(k.id != message.member.id && k.voiceChannel.id != message.member.voiceChannel.id) {
            k.setVoiceChannel(message.member.voiceChannel.id)
            say++;
          }
        });
      }
    });
        if (say === 0) return message.channel.send(mesaj[2])
    message.channel.send(mesaj[3].replace("{say}", `${say}`).replace("{message.member.voiceChannel.name}", `${message.member.voiceChannel.name}`));
    } catch(err) {
    console.log(err)
  }
 };

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["toplutasi", "move-all-members", "movemembers","toptaşı", "toplutaşi", "toplutası"], 
  permLevel: 8,
  maintenance: "NO"
};

exports.help = {
  name: 'moveallmembers',
  name2: "toplutaşı",
  description: 'This command moves all members who has connected to voice channel to voice channel you are in.|Sunucudaki ses kanalında olan bütün üyeleri bulunduğunuz kanala taşır.',
  usage: 'moveallmembers|toplutaşı',
  kategori: "moderation & moderasyon"
};