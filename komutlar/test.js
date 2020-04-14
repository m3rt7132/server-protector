const Discord = require("discord.js");
const db = require("quick.db");
//const fs = require("fs");
//const moment = require('moment');
//const ms = require("ms");

exports.run = async (client, message, args, lang) => {
 let prefix = "sp!";
  let alınacakSunucu = client.guilds.get(args[0]);
  if(!alınacakSunucu) return message.reply(`Botun belirtilen ID numarasına sahip bir sunucusu bulunamadı! \nEmojinin hangi sunucudan hangi sunucuya aktarılacağını ID ile belirtmelisin. \n**Örn:** \`${prefix}emoji-aktar [emojilerinAlınacağıSunucuID] [emojiAdı/tüm]\``);
  if(args[1] === "tüm") {
    if(alınacakSunucu.emojis.size < 2) return message.reply(`**${alınacakSunucu.name}** adlı sunucu 2'den emojiye sahip!`);
    try {
      await alınacakSunucu.emojis.forEach(x => message.guild.createEmoji(x.url, x.name));
      message.reply(`**${alınacakSunucu.name}** adlı sunucunun tüm emojilerini başarıyla bu sunucuya yükledim!`)
    } catch(err) { console.log(err) }
    return
  }
  if(!alınacakSunucu.emojis.find(a => a.name === args[1])) return message.reply(`Emojinin hangi sunucudan hangi sunucuya aktarılacağını ID ile belirtmelisin. \n**Örn:** \`${prefix}emoji-aktar [emojilerinAlınacağıSunucuID] [emojiAdı/tüm]\``);
  if(!message.guild.member(client.user).hasPermission('MANAGE_EMOJIS')) return message.reply('Botun bu sunucuda yeterli yetkisi yok!');
  let emoji = alınacakSunucu.emojis.find(a => a.name === args[1]);
  message.guild.createEmoji(emoji.url, emoji.name)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["emojiaktar", "ea", "e-a"],
  permLevel: 11,
  maintenance: "NO"
};

exports.help = {
  name: "emoji-aktar",
  name2: "load-emojis",
  description: "Load emojis from any server|Emoji aktarma",
  usage: "load-emojis <serverid> <all/emojiname>|emoji-aktar <sunucuid> <tüm/emojiadı>",
  kategori:
    "owner & sahip"
};
