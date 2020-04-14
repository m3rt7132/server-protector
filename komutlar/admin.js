const Discord = require("discord.js");
var db = require("quick.db");
exports.run = async (client, message, args) => {
  let a = ["onayla", "reddet", "not-ekle", "sil", "listele", "sahipsiz"];
//if (message.member.highestRole.calculatedPosition < message.guild.roles.get("689474914172141673").calculatedPosition) return message.channel.send("**Yetersiz izin!**");
  if (!message.member.roles.has(client.ayarlar.botTestersRolü)) return message.channel.send(`\`${message.guild.roles.get(client.ayarlar.botTestersRolü).name}\` adlı rol gerekli! `)
  if (args[0] == "onayla") {
    if (!args[1] || isNaN(args[1]) || args[1].length != 18)
      return message.channel.send(
        `**Sistemde beklemede bulunan bir bot ID'si girmelisin!**`
      );
    if (!client.bots.waiting.has(args[1]))
      return message.channel.send(
        `**ID'sini girdiğin bot şu anda onaylanmayı/reddedilmeyi bekleyen bir durumda değil!**`
      );
    await message.channel.send(
      `**${
        client.bots.waiting.get(args[1]).tag
      }** isimli bot __onaylanacak__. Bunu kabul ediyorsanız **10 saniye** içinde **evet** veya **hayır** yazınız.`
    );
    await message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        maxMatches: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(async col => {
        if (col.first().content == "evet") {
          var user = client.bots.waiting.get(args[1]);
          await client.bots.added.set(user.id, {
            id: user.id,
            tag: user.tag,
            name: user.name,
            discrim: user.discrim,
            createdAt: user.createdAt,
            createdTimestamp: user.createdTimestamp,
            owner: {
              id: user.owner.id,
              tag: user.owner.tag,
              name: user.owner.name,
              createdAt: user.owner.createdAt,
              createdTimestamp: user.owner.createdTimestamp,
              joinedAt: user.owner.joinedAt,
              joinedTimestamp: user.owner.joinedTimestamp,
              discrim: user.owner.discrim,
              avatar: user.owner.avatar
            },
            timestamp: user.timestamp,
            library: user.library,
            categories: user.categories,
            description: user.description,
            avatar: user.avatarURL,
            logChannel: {
              channelID: user.logChannel.channelID,
              messageID: user.logChannel.messageID
            },
            mainKomut: user.mainKomut,
            notlar: {
              admin: user.notlar.admin,
              user: user.notlar.user
            }
          });
          let waiting = await db.fetch(`waiting`)
          let arrr = []
          waiting.forEach(x => {
            if (x.id == args[1]) return console.log("Silindi!", x);
            arrr.push(x)
          })
          db.set("waiting", arrr)
          let userLog = client.channels.get(client.ayarlar.işlemLog)
          let embed5 = new Discord.RichEmbed()
            .setTitle("Bot Ekletme Başvurusu")
            .setAuthor(
              client.bots.waiting.get(args[1]).tag,
              client.bots.waiting.get(args[1]).avatar
            )
            .setThumbnail(client.bots.waiting.get(args[1]).avatar)

            .setDescription(
              `__**BAŞVURUYU YAPAN**__\n<@${message.author.id}> \`|\` ${
                message.author.id
              }\n \n__**BOT**__\n<@${
                client.bots.waiting.get(args[1]).id
              }> \`|\` \`${client.bots.waiting.get(args[1]).id}\` \`|\` ${
                client.bots.waiting.get(args[1]).tag
              }\n \n__**DURUM**__\n*ONAYLANDI!!*!\n \n`
            )
            .setColor(client.renk.acikyesil);
          client.bots.added.array().forEach(x => {
            db.push(`added`, x)
          })
          userLog.send(
            `✅ **=>** <@${
              client.bots.waiting.get(args[1]).owner.id
            }> adlı kullanıcının botu sisteme eklendi! Bilgiler için **!bilgi <bot ID>**`
          );
          client.channels
            .get(client.bots.waiting.get(args[1]).logChannel.channelID)
            .fetchMessage(client.bots.waiting.get(args[1]).logChannel.messageID)
            .then(a => a.edit(embed5));
          message.channel.send(`**${client.bots.waiting.get(args[1]).tag}** isimli bot başarıyla onaylanıp, davet linki özel mesaj yoluyla size iletildi!`)
          client.users
            .get(client.bots.waiting.get(args[1]).owner.id)
            .send(
              `**${client.bots.waiting.get(args[1]).tag}** isimli botun **${
                message.author.tag
              }** tarafından sisteme eklendi! Eğer botunuz sunucuya kısa bir süre içinde eklenmezse, lütfen yetkililere bildirin.`
            )
          message.author.send(`**${client.bots.waiting.get(args[1]).tag}** isimli bot onaylandı! Davet linki;\n__**https://discordapp.com/oauth2/authorize?client_id=${client.bots.waiting.get(args[1]).id}&scope=bot&permissions=0**__`)
          setTimeout(() => {
            client.bots.waiting.delete(args[1]);
          }, 1000);
        } else if (col.first().content == "hayır") {
          return message.channel.send(`**İptal edildi.**`);
        } else {
          return message.channel.send(
            `Cevap olarak **evet** veya **hayır** yazmalısın!`
          );
        }
      }).catch(err => {
        message.channel.send(`**İstenilen süre içinde cevaplanmadı.**`);
        console.error(err);
      });
  } else if (args[0] == "reddet") {
    if (!args[1] || isNaN(args[1]) || args[1].length != 18)
      return message.channel.send(
        `**Sistemde beklemede bulunan bir bot ID'si girmelisin!**`
      );
    if (!client.bots.waiting.has(args[1]))
      return message.channel.send(
        `**ID'sini girdiğin bot şu anda onaylanmayı/reddedilmeyi bekleyen bir durumda değil!**`
      );
    var reason = args.slice(2).join(" ");
    if (!reason)
      return message.channel.send(
        `**Reddetmek için geçerli bir sebep girmelisin!**`
      );
    await message.channel.send(
      `**${
        client.bots.waiting.get(args[1]).tag
      }** isimli bot __reddedilecek__. Bunu kabul ediyorsanız **10 saniye** içinde **evet** veya **hayır** yazınız.`
    );
    await message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        maxMatches: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(async col => {
        if (col.first().content == "evet") {
          if (client.bots.added.has(args[1])) client.bots.added.delete(args[1]);
          let userLog = client.channels.get(client.ayarlar.işlemLog);
          let embed5 = new Discord.RichEmbed()
            .setTitle("Bot Ekletme Başvurusu")
            .setAuthor(
              client.bots.waiting.get(args[1]).tag,
              client.bots.waiting.get(args[1]).avatar
            )
            .setThumbnail(client.bots.waiting.get(args[1]).avatar)

            .setDescription(
              `__**BAŞVURUYU YAPAN**__\n<@${
                client.bots.waiting.get(args[1]).owner.id
              }> \`|\` ${
                client.bots.waiting.get(args[1]).owner.id
              }\n \n__**BOT**__\n<@${
                client.bots.waiting.get(args[1]).id
              }> \`|\` \`${client.bots.waiting.get(args[1]).id}\` \`|\` ${
                client.bots.waiting.get(args[1]).tag
              }\n \n__**DURUM**__\n*REDDEDİLDİ!!*!\n**SEBEP =>** \`${reason}\`\n\n `
            )
            .setColor(client.renk.turuncu);
          userLog.send(
            `❌ **=>** <@${
              client.bots.waiting.get(args[1]).owner.id
            }> adlı kullanıcının botu **reddedildi**!\n**SEBEP =>** ${reason}`
          );
          client.channels
            .get(client.bots.waiting.get(args[1]).logChannel.channelID)
            .fetchMessage(client.bots.waiting.get(args[1]).logChannel.messageID)
            .then(a => a.edit(embed5));
          client.users
            .get(client.bots.waiting.get(args[1]).owner.id)
            .send(
              `**${client.bots.waiting.get(args[1]).tag}** isimli botun **${
                message.author.tag
              }** tarafından **reddedildi**!\n**SEBEP =>** ${reason}`
            );
          var veriWaiting = await db.fetch(`waiting`);
          let newArray = [];
          veriWaiting.forEach(x => {
            if (x.id == args[1]) return;
            newArray.push(x);
          });
          await db.set(`waiting`, newArray);
          setTimeout(() => {
            client.bots.waiting.delete(args[1]);
          }, 1000);
        } else if (col.first().content == "hayır") {
          return message.channel.send(`**İptal edildi.**`);
        } else {
          return message.channel.send(
            `Cevap olarak **evet** veya **hayır** yazmalısın!`
          );
        }
      })
      .catch(err => {
        message.channel.send(`**İstenilen süre içinde cevaplanmadı.**`);
        console.error(err);
      });
  } else if (args[0] == "not-ekle") {
    if (!args[1] || isNaN(args[1]) || args[1].length != 18)
      return message.channel.send(
        `**Sistemde beklemede bulunan bir bot ID'si girmelisin!**`
      );
    if (!client.bots.waiting.has(args[1]) || client.bots.added.has(args[1]))
      return message.channel.send(
        `**ID'sini girdiğin bot şu anda onaylanmayı/reddedilmeyi bekleyen bir durumda değil!**`
      );
    var reason = args.slice(2).join(" ");
    if (!reason)
      return message.channel.send(
        `**Not eklemeye çalışıyorsun ama notu yazmıyorsun, biz senle nasıl anlaşacağız?!**`
      );
    client.bots.waiting.get(args[1]).notlar.admin = reason;
    client.users
      .get(client.bots.waiting.get(args[1]).owner.id)
      .send(
        `**${
          client.bots.waiting.get(args[1]).tag
        }** adlı beklemede olan botuna **${
          message.author.tag
        }** tarafından bir admin notu eklendi! İncelemeyi unutma! İncelemek için;\n> !notlar **<bot ID>**`
      );
    message.channel.send(
      `**Not** başarıyla eklendi! Notları temizlemek için \`!admin not-ekle <bot ID> temizle\` yazmalısın!`
    );
    if (reason == "temizle") {
      client.bots.waiting.get(args[1]).notlar.admin = "yok";
      message.channel.send(`**Not** temizlendi.`);
    }
  } else if (args[0] == "sil") {
    if (!args[1] || isNaN(args[1]) || args[1].length != 18)
      return message.channel.send(
        `**Sistemde beklemede bulunan bir bot ID'si girmelisin!**`
      );
    if (client.bots.waiting.has(args[1]) || !client.bots.added.has(args[1]))
      return message.channel.send(
        `**ID'sini girdiğin bot şu anda onaylanmayı/reddedilmeyi bekleyen bir durumda! Sistemde ekli (onaylanmış) durumda olmayan bir botu silemezsin! Beklemede olan bir botu silmek için \`!admin reddet <bot ID> <sebep>\` yazmalısın!**`
      )
    var reason = args.slice(2).join(" ")
    if (!reason) return message.channel.send(`**Silme sebebini de yaz tamam.**`)
    await message.channel.send(
      `**${
        client.bots.added.get(args[1]).tag
      }** isimli bot sistemden __silinecek__! Bunu kabul ediyorsanız **10 saniye** içinde **evet** veya **hayır** yazınız.`
    );
    await message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        maxMatches: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(async col => {
        if (col.first().content == "evet") {
          await message.channel.send(
            `**${
              client.bots.added.get(args[1]).tag
            }** isimli bot başarıyla sistemden silindi!`
          )
          await client.users.get(client.bots.added.get(args[1]).owner.id).send(`**${client.bots.added.get(args[1]).tag}** isimli botun **${message.author.tag}** tarafından silindi!\n**SEBEP =>** ${reason}`)
          var veriAdded = await db.fetch("added");
          let newArr = [];
          veriAdded.forEach(x => {
            if (x.id == args[1]) return;
            newArr.push(x);
          });
          await db.set("added", newArr);
          setTimeout(() => {
            client.bots.added.delete(args[1]);
          });
        } else if (col.first().content == "hayır") {
          return message.channel.send(`**İptal edildi.**`);
        } else {
          return message.channel.send(
            `Cevap olarak **evet** veya **hayır** yazmalısın!`
          );
        }
      })
      .catch(err => {
        message.channel.send(`**İstenilen süre içinde cevaplanmadı.**`);
        console.error(err);
      });
  } else if (args[0] == "listele") {
    if (args[1] == "onaylılar") {
      if (client.bots.added.size == 0) return message.channel.send(`**Sistemde onaylanmış bir durumda olan bot bulunmuyor!**`)
    let i = 0;
    message.channel.send(
      client.bots.added
        .map(
          e =>
            `"${++i}" => Bot = ${e.tag} && ${e.id}`
        )
        .join("\n"),
      { code: "xl", split: true }
    ); 
    } else if (args[1] == "bekleyenler") {
      if (client.bots.waiting.size == 0) return message.channel.send(`**Sistemde onaylanmayı bekleyen bir durumda olan bot bulunmuyor!**`)
          let i = 0;
    message.channel.send(
      client.bots.waiting
        .map(
          e =>
            `"${++i}" => Bot = ${e.tag} && ${e.id}`
        )
        .join("\n"),
      { code: "xl", split: true }
    ); 
    } else {
      return message.channel.send(`**Kullanabilecekleriniz =>** !admin listele \`onaylılar/bekleyenler\``)
    }
  } else if (args[0] == "sahipsiz") {
    if (args[1] == "onaylılar") {
       let i = 0;
       message.channel.send(client.bots.added.filter(a => !message.guild.members.has(a.owner.id)).size != 0 ? client.bots.added.filter(a => !message.guild.members.has(a.owner.id)).map(
          e =>`${++i} => Bot = "${e.tag}" (${e.id})\n`).join("\n") : "Yok!", {code: "xl", split: true})
    } else if (args[1] == "bekleyenler") {
       let i = 0;
       message.channel.send(client.bots.waiting.filter(a => !message.guild.members.has(a.owner.id)).size != 0 ? client.bots.waiting.filter(a => !message.guild.members.has(a.owner.id)).map(
          e =>`${++i} => Bot = "${e.tag}" (${e.id})\n`).join("\n") : "Yok!", {code: "xl", split: true})
    } else {
      return message.channel.send(`**Kullanabilecekleriniz** \`=>\` !admin sahipsiz \`onaylılar/bekleyenler\``)
    }
  } else {
    return message.channel.send(
      `**Kullanabilecekleriniz =>** ${a.map(e => `\`${e}\``).join(", ")}`
    );
  }
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "admin"
};
