const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async(client, message, args, params) => {
//dil
  var tr = [
    `${client.emoji.basarisiz} **Parametreler eksik: \`kanal-ayarla\`, \`kanal-sıfırla\`! Aynı zamanda \`mesaj-ayarla\`, \`mesaj-sıfırla\` ile isteğe bağlı hoşgeldin mesajını ayarlayabilirsin!**`,//0
    `${client.emoji.basarisiz} **Bir kanal belirtmelisin!**`,//1
    `${client.emoji.basarisiz} **Bu sunucuda giriş çıkış log kanalı zaten ayarlanmış!**`,//2
    `${client.emoji.basarili} **Giriş çıkış log kanalı başarıyla** __**ayarlandı!**__`,//3
    `${client.emoji.basarisiz} **Bu sunucuda giriş çıkış log kanalı ayarlanmadığı için sıfırlayamazsınız!**`,//4
    `${client.emoji.basarili} **Giriş çıkış log kanalı başarıyla** __**sıfırlandı!**__`,//5
    `${client.emoji.basarisiz} **\`20 ile 200\` karakter arasında bir hoşgeldin mesajı yazmalısın!**\n${client.emoji.basarisiz} **İPUCU:** \`%member%\` **değişkenini kullanarak üyeyi etiketlemesini sağlayabilirsiniz!**`,//6
    `${client.emoji.basarili} **Giriş hoşgeldin mesajı başarıyla** __**ayarlandı!**__`,//7
    `${client.emoji.basarili} **Giriş hoşgeldin mesajı başarıyla** __**sıfırlandı!**__`,//8
    `${client.emoji.basarisiz} **Giriş hoşgeldin mesajı zaten ayarlanmış!**`,//9
    `${client.emoji.basarisiz} **Giriş hoşgeldin mesajı bu sunucuda ayarlanmadığı için sıfırlayamazsınız!**`,//10
    ``,//11
    ``,//12
    ``,//13
    ``,//14
    ``,//15
    ``,//16
    ``,//17
    ``,//18
    ``,//19
    ``,//20
  ];
  var en = [
    `${client.emoji.basarisiz} **You must first type the parameters: \`set-channel\`, \`reset-channel\`! Also you can set welcome message with \`set-message\`, \`reset-message\`!(optional)**`,//0
    `${client.emoji.basarisiz} **You must specify a channel with mention or name or ID!**`,//1
    `${client.emoji.basarisiz} **Joins-leaves log channel is already setted in this server!**`,//2
    `${client.emoji.basarili} **Joins-Leaves log channel has been successfuly** __**setted!**__`,//3
    `${client.emoji.basarisiz} **Joins-leaves log channel isn't setted in this server so you can't reset that!**`,//4
    `${client.emoji.basarili} **Joins-Leaves log channel has been successfuly** __**reseted!**__`,//5
    `${client.emoji.basarisiz} **You must type a welcome message between \`20 and 200\`!!**\n${client.emoji.basarisiz} **TIP:** You can specify member with \`%member%\``,//6
    `${client.emoji.basarili} **Joins-leaves welcome message has successfuly** __**setted!**__`,//7
    `${client.emoji.basarili} **Joins-leaves welcome message has successfuly** __**reseted!**__`,//8
    `${client.emoji.basarisiz} **Joins-leaves welcome message is already setted in this server!**`,//9
    `${client.emoji.basarisiz} **Joins-leaves welcome message isn't setted in this server so you can't reset that`,//10
    ``,//11
    ``,//12
    ``,//13
    ``,//14
    ``,//15
    ``,//16
    ``,//17
    ``,//18
    ``,//19
    ``,//20
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + message.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
//dil
  
  if (!args[0] && (args[0] !== "set-channel" || args[0] !== "reset-channel" || args[0] !== "kanal-ayarla" || args[0] !== "kanal-sıfırla" || args[0] !== "set-message" || args[0] !== "reset-message")) return message.channel.send(mesaj[0])
  var logkanal = await db.fetch(`giriscikis_${message.guild.id}`)
  if (args[0] === "set-channel" || args[0] === "kanal-ayarla") {
    if (logkanal) return message.channel.send(mesaj[2])
    let kanal = message.mentions.channels.first() || message.guild.channels.find(a => a.name === args.slice(1).join(" ") || message.guild.channels.get(args[1]))
    if (!kanal) return message.channel.send(mesaj[1])
    db.set(`giriscikis_${message.guild.id}`, kanal.id)
    message.channel.send(mesaj[3])
    
  }
  if (args[0] === "reset-channel" || args[0] === "kanal-sıfırla") {
    if (!logkanal) return message.channel.send(mesaj[4])
    db.delete(`giriscikis_${message.guild.id}`)
    message.channel.send(mesaj[5])
  }
  if (args[0] === "set-message" || args[0] === "mesaj-ayarla") {
    let mesajlog = await db.fetch(`giriscikismesaj_${message.guild.id}`)
    if (mesajlog) return message.channel.send(mesaj[9])
    let mesajj = args.slice(1).join(" ");
    if (!mesajj || mesajj.length < 20 || mesajj.length > 200) return message.channel.send(mesaj[6])
  db.set(`giriscikismesaj_${message.guild.id}`, mesajj)
    message.channel.send(mesaj[7])
    }
  if (args[0] === "reset-message" || args[0] === "mesaj-sıfırla") {
    let mesajlog = await db.fetch(`giriscikismesaj_${message.guild.id}`)
    if (!mesajlog) return message.channel.send(mesaj[10])
    db.delete(`giriscikismesaj_${message.guild.id}`)
    message.channel.send(mesaj[8])
  }
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['jl','j-l', "joinsleaves", "joinleave", "giriş-çıkış", "girişçıkışlog", "gç", "giriscikis"], 
  permLevel: 8,
  maintenance: "NO"
};

exports.help = {
  name: 'joins-leaves',
  name2: "girişçıkış",
  description: 'This commands sets the joins-leaves log channel.|Giriş çıkış log kanalını ve hoşgeldin mesajını ayarlar.',
  usage: 'joins-leaves|girişçıkış',
  kategori: "moderation & moderasyon"
};