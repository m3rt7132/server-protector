const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args, params) => {
  //dil
  var tr = [
    `${client.emoji.basarisiz} **Parametreler eksik: \`kanallar/roller/emojiler\`**`, //0
    `Sunucudaki kanalların listesi!`, //1
    `Kategoriler`, //2
    `Yazı Kanalları`, //3
    `Sesli kanallar`, //4
    `${client.emoji.basarisiz} **Bu sunucuda hiç emoji yok!**`, //5
    `Rol ismi:`, //6
    `Renk kodu:`, //7
    `Role sahip kişi:`, //8
    `Sunucudaki rollerin listesi!`, //9
    `Toplam Kanallar =>`, //10
    `Toplam Roller =>`, //11
    `Toplam Emojiler =>`, //12
    `Sunucudaki emojilerin listesi!`, //13
    `Etiket`, //14
    `Hex Renk Kodu`, //15
    `Role sahip üye sayısı`, //16
    `Emoji`, //17
    `Kodu`, //18
    `ID`, //19
    `URL` //20
  ];
  var en = [
    `${client.emoji.basarisiz} **You must type the parameters: \`channels/roles/emojis\`**`, //0
    `List of channels in the server`, //1
    `Categories`, //2
    `Text Channels`, //3
    `Voice Channels`, //4
    `${client.emoji.basarisiz} **There is no emoji in the server!**`, //5
    `Name:`, //6
    `Colour Code:`, //7
    `Role members:`, //8
    `List of roles in the server!`, //9
    `Total Channels =>`, //10
    `Total Roles =>`, //11
    `Total Emojis =>`, //12
    `List of emojis in the server!`, //13
    `Mention`, //14
    `Hex Color Code`, //15
    `Number of Role Members`, //16
    `Emoji`, //17
    `String`, //18
    `ID`, //19
    `URL` //20
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + message.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
  //dil
  if (!args[0]) return message.channel.send(mesaj[0]);
  if (args[0] === "channels" || args[0] === "kanallar") {
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle(mesaj[1])
        .addField(
          `__${mesaj[2]}__ **(**${
            message.guild.channels.filter(c => c.type === "category").size
          }**)**`,
          "```\n" +
            message.guild.channels
              .filter(c => c.type === "category")
              .map(c => c.name)
              .join("\n") +
            "\n```",
          true
        )
        .addField(
          `__${mesaj[3]}__ (**${
            message.guild.channels.filter(c => c.type === "text").size
          }**)`,
          "```\n" +
            message.guild.channels
              .filter(c => c.type === "text")
              .map(c => "#" + c.name + "")
              .join("\n") +
            "\n```",
          true
        )
        .addField(
          `__${mesaj[4]}__ (**${
            message.guild.channels.filter(c => c.type === "voice").size
          }**)`,
          "```\n" +
            message.guild.channels
              .filter(c => c.type === "voice")
              .map(c => c.name)
              .join("\n") +
            "\n```",
          true
        )
        .setColor(client.ayarlar.basarilirengi)
        .setFooter(
          `${mesaj[10]} ${message.guild.channels.size}`,
          message.guild.iconURL
        )
        .setThumbnail(message.guild.iconURL)
    );
  }
  if (args[0] === "emojis" || args[0] === "emojiler") {
    if (message.guild.emojis.size === 0) return message.channel.send(mesaj[5]);
for(let i = 0; 
i < message.guild.emojis.size / 9; 
i++) {
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(mesaj[13])
          .setColor(client.ayarlar.basarilirengi)
          .setDescription(
            message.guild.emojis
              .array()
              .map(
                s =>
                  `**${mesaj[17]} =>** ${s.toString()}\n**${
                    mesaj[18]
                  } =>** \`${s.toString()}\`\n**${mesaj[19]} =>** \`${
                    s.id
                  }\`\n**${mesaj[20]} =>** [**URL**](${s.url})\n`
              )
              .slice(i * 9, (i + 1) * 9)
              .join("\n")
          )
          .setFooter(
            `${mesaj[12]} ${message.guild.emojis.size}`,
            message.guild.iconURL
          )
          .setThumbnail(message.guild.iconURL)
      );
    }
    /*.setTitle(mesaj[13])
    .setColor(client.renk.turkuaz)
    .setFooter(`${mesaj[12]} => ${message.guild.emojis.size}`, message.guild.iconURL)
    .setDescription(mesaj.substr(2048*i, 2045))
    message.channel.send(embed)
    }
    */
  }
  if (args[0] === "roles" || args[0] === "roller") {
    if (message.guild.roles.filter(a => a.name !== "@everyone").size === 0)
      return message.channel.send(mesaj[14]);
    for (
      let i = 0;
      i < message.guild.roles.filter(a => a.name !== "@everyone").size / 8;
      i++
    ) {
      const embed = new Discord.RichEmbed()
        .setTitle(mesaj[9])
        .setDescription(
          message.guild.roles
            .filter(a => a.name !== "@everyone")
            .array()
            .map(
              s =>
                `**${mesaj[14]} =>** <@&${s.id}>\n**${mesaj[15]} =>** \`${
                  s.hexColor
                }\`\n**${mesaj[16]} =>** \`${s.members.size}\`\n**ID =>** \`${
                  s.id
                }\`\n`
            )
            .slice(i * 6, (i + 1) * 6)
            .join("\n")
        )
        .setColor(client.ayarlar.basarilirengi)
        .setFooter(
          `${mesaj[11]} ${
            message.guild.roles.filter(a => a.name !== "@everyone").size
          }`,
          message.guild.iconURL
        )
        .setThumbnail(message.guild.iconURL);
      message.channel.send(embed);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["listof", "lo", "l-o", "listele", "liste"],
  permLevel: 0,
  maintenance: "NO"
};

exports.help = {
  name: "list-of",
  name2: "listele",
  description:
    "This command shows a list of anything about server.|Sunucudaki kanalları, rolleri veya emojileri listeler.",
  usage: "list-of `channels/emojis/roles`|listele `kanallar/roller/emojiler`",
  kategori: "user & kullanıcı"
};
