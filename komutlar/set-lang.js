const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async(client, message, args, params) => {
 //dil
  var tr = [
    `${client.emoji.basarisiz} **Geçerli bir dil kodu yazmalısın!**\n${client.emoji.basarisiz} **Mevcut dil kodları:** \`tr\`, \`eng\``, // 0
    `${client.emoji.basarili} **Dil tercihini başarıyla** \`${args[0]}\` **olarak değiştirdim!**`, // 1
    `${client.emoji.basarisiz} **Botun şu anki dili ile aynı dili seçtiniz!**`,
    ];
  var en = [
    `${client.emoji.basarisiz} **You didn't type the language code! Please type one.**\n${client.emoji.basarisiz} **Language codes you can set:** \`tr\`, \`eng\``,
    `${client.emoji.basarili} **I changed the your language preference to** \`${args[0]}\``,
    `${client.emoji.basarisiz} **You chose the same lang code with current language code!**` 
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + message.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
//dil
  
  if (!args[0] || (args[0] !== "tr" && args[0] !== "eng")) return message.channel.send(mesaj[0])
  if (args[0] === dil) return message.channel.send(mesaj[2])
  db.set(`language${message.guild.id}`, args[0])
 
  message.channel.send(mesaj[1].replace("eng", "İngilizce").replace("tr", "Turkish"))
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['setlang','set-lang',"setlanguage", "dilseç", "dilayarla", "dil", "language", "lang"], 
  permLevel: 9,
  maintenance: "NO"
};

exports.help = {
  name: 'set-language',
  name2: "dil",
  description: "This command sets the bot's current language.",
  usage: 'sp!set-language <`tr` or `eng`>',
  kategori: "moderation & moderasyon"
};