const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    //dil
  var tr = [
    `${client.emoji.basarisiz} **Emoji yönetimi komutunu kullanmak için parametrelerden biri yazılmalı: \`bul\` veya \`oluştur\` veya \`sil\`!**`,//0
    `${client.emoji.basarisiz} **Lütfen emojinin direkt bağlantı adresini yazın!** (Boşluk bırakmayın ve bir link olma zorunluluğu vardır)`,//1
    `${client.emoji.basarisiz} **Emojinin ismini yazın!** (Boşluk bırakmayın)`,//2
    `${client.emoji.basarili} **Emoji oluşturuldu! =>** {emojirep} <&> \`{emojistringrep}\``,//3
    `${client.emoji.basarili} \`{argreplace}\` **adındaki emoji silindi!**`,//4
    `${client.emoji.basarisiz} **Arayacağın emoji ismini yaz!**`,//5
    `${client.emoji.basarisiz} \`{argreplace}\` **adında bir emoji bulamadım!**`,//6
    `Emojini buldum!`,//7
    `Emoji linki için tıkla!`,//8
    ``,//9
    ``,//10
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
    `${client.emoji.basarisiz} **You must type \`find\` or \`create\` or \`delete\`!**`,//0
    `${client.emoji.basarisiz} **Please type an emoji direct link!** (Please don't type spaces and must be a link)`,//1
    `${client.emoji.basarisiz} **Please type a name of emoji!** (Please don't type spaces)`,//2
    `${client.emoji.basarili} **Done! I am created an emoji =>** {emojirep} <&> \`{emojistringrep}\``,//3
    `${client.emoji.basarili} **Done! I am deleted an emoji called with:** \`{argreplace}\``,//4
    `${client.emoji.basarisiz} **You didn't type the emoji name!**`,//5
    `${client.emoji.basarisiz} **I can't find the emoji called with name \`{argreplace}\`!**`,//6
    `I found your emoji!`,//7
    `Click here for emoji URL!`,//8
    ``,//9
    ``,//10
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
  
  
  if (!args[0] && (args[0] !== "bul" || args[0] !== "sil" || args[0] !== "oluştur" || args[0] !== "create" || args[0] !== "find" || args[0] !== "delete"))
    return message.channel.send(mesaj[0]);
  if (args[0] === "create" || args[0] === "oluştur") {
    if (!args[1] || !args[1].match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi)) 
      return message.channel.send(
        mesaj[1]
      )
      
    
    if (!args[2]) 
      return message.channel.send(
       mesaj[2]
      );
    
    message.guild.createEmoji(args[1], args[2]).then(abc => {
      message.channel.send(
     mesaj[3].replace("{emojirep}", `${abc.toString()}`).replace("{emojistringrep}", `\`${abc.toString()}\``)
      );
    })

  }
  if (args[0] === "delete" || args[0] === "sil") {
    if (!args[1]) {
      return message.channel.send(
        mesaj[2]
      );
    }
    let emoji = message.guild.emojis.find(e => e.name === args[1]) || message.guild.emojis.get(args[1])
    message.guild.deleteEmoji(emoji);
    message.channel.send(
mesaj[4].replace("{argreplace}", args[1])
    );
  }
  if (args[0] === "find" || args[0] === "bul") {
    if (!args[1])
      return message.channel.send(
      mesaj[5]
      );
    let a = client.emojis.find(s => s.name === args[1]);
    if (!client.emojis.find(s => s.name === args[1]))
      return message.channel.send(
       mesaj[6].replace("{argreplace}", `${args[1]}`)
      );
    let list = new Discord.RichEmbed()
      .setTitle(mesaj[7])
      .setDescription(
        `**Emoji => ** ${a}\n\n**Emoji ID => ** (__${
          a.id
        }__)\n\n**String(Kod) => ** \`${client.emojis
          .find(emoji => emoji.name === args[1])
          .toString()}\` \n \n**URL => ** [${mesaj[8]}](${client.emojis.find(a => a.name === args[1]).url})`
      )
      .setColor(client.ayarlar.basarilirengi);
    message.channel.send(list);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["emojis", "e"],
  permLevel: 5,
  maintenance: "NO"
};

exports.help = {
  name: "emoji",
  name2: "emoji",
  description: "This command finds an emoji or shows list of server emojis.|Emoji yönetimi komutu. Emojiyi bulur/siler/oluşturur!",
  usage: "emoji `find/create/delete`|emoji `bul/oluştur/sil`",
  kategori: "moderation & moderasyon"
};
