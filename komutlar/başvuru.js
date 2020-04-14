const Discord = require("discord.js");
const db = require("quick.db");
let cooldown = new Set();
exports.run = async (client, message, args) => {
  if (client.bots.added.filter(e => e.owner.id == message.author.id).size >= 2) return message.channel.send(`**Sistemde 2'den fazla botun bulunduğu için daha fazla bot eklemene izin veremiyoruz!**`)
  if (cooldown.has(message.author.id)) return message.channel.send("**6 Saatte bir başvuru yapabilirsin!**");
  if (message.channel.name != message.author.id) {
    if (message.channel.id != client.ayarlar.başvuruKanalı) return message.channel.send(`**Komutlar sadece** <#${client.ayarlar.başvuruKanalı}> **kanalında kullanılabilir!**`)
    if (message.guild.channels.find(a => a.name == message.author.id))
      return message.channel.send(
        "**Zaten başvuru yapacağın bir kanal bulunuyor!**"
      );
    else {
      message.guild
        .createChannel(message.author.id, { type: "text" })
        .then(c => {
          c.setParent(client.ayarlar.başvurularKategorisi);
          c.overwritePermissions(
            message.guild.roles.find(a => a.name == "@everyone"),
            {
              CONNECT: false,
              SPEAK: false,
              VIEW_CHANNEL: false,
              READ_MESSAGES: false,
              READ_MESSAGE_HISTORY: false,
              SEND_MESSAGES: false
            }
          );
          c.overwritePermissions(message.member, {
            CONNECT: true,
            SPEAK: true,
            VIEW_CHANNEL: true,
            READ_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            SEND_MESSAGES: true
          });
          c.send(
            `<@${message.author.id}> **Başvurunu bu kanalda tekrardan \`/başvuru\` yazarak devam ettirebilirsin!**`
          );
          return message.channel.send(
            "**Başvurunu** " + c + " **kanalından devam ettirebilirsin.**"
          ).then(a => a.delete(20000))
        });
      return;
    }
  }
  if (args[0] == "sil") {
    if (message.channel.name == message.author.id) return message.channel.delete();
  }
  if (!args[0]) {
  let embed = new Discord.RichEmbed()
    .setTitle("Soruları cevaplamak için verilen süre: 60 saniye!")
    .addField(`Botun ID'si?`, "Cevap bekleniyor...")
    .setColor(client.renk.kirmizi);
  let abc = await message.channel.send(embed);
  let filtre = mes => mes.author.id === message.author.id;
  message.channel
    .awaitMessages(filtre, { max: 1, time: 60000 })
    .then(async cevap1 => {
      setTimeout(() => {
        cevap1.first().delete();
      }, 1000);
      let kim3rtd = cevap1.first().content;
      if (isNaN(kim3rtd)) {
        abc.delete();
        return message.channel.send(
          "**Bu alana yalnızca rakam girebilirsiniz**"
        );
      }
      if (client.bots.waiting.has(kim3rtd) || client.bots.added.has(kim3rtd)) {
        abc.delete();
        return message.channel.send("**Böyle bir bot zaten sistemde mevcut!**");
      }
      if (message.guild.members.has(kim3rtd)) {
        abc.delete();
        return message.channel.send(
          `**Bu sunucuda olan bir botu sisteme eklemeye çalışmak... Zekice!**`
        );
      }
      client.fetchUser(kim3rtd).then(user => {
        if (kim3rtd.length != 18 || !user.bot) {
          abc.delete();
          return message.channel.send(
            "**Botun ID'si 18 haneli bir sayı ve bot olmalıdır!**"
          );
        }
      });
      if (kim3rtd === "iptal") {
        abc.delete();
        return message.channel.send("**İşlem iptal edildi!**");
      }
    client.fetchUser(kim3rtd).then(user => {
      let embed1 = new Discord.RichEmbed()
        .setTitle("Soruları cevaplamak için verilen süre: 60 Saniye!")
        .addField(`Bot'un ID'si?`, `${kim3rtd} (**${user.tag}**)`)
        .addField(`Bot'un prefixi ve yardım komutu?`, "Cevap bekleniyor...")
        .setColor(client.renk.kirmizi);
      abc.edit(embed1)
    })
      message.channel
        .awaitMessages(filtre, { max: 1, time: 60000 })
        .then(async cevap2 => {
          let kid2 = cevap2.first().content;
          if (kid2 === "iptal") {
            abc.delete();
            return message.channel.send("**İşlem iptal edildi!**");
          }
        if (kid2.length > 20) {
          abc.delete()
          return message.channel.send("**20 karakterden uzun olamaz!**")
        }
          setTimeout(() => {
            cevap2.first().delete();
          }, 1000);
        client.fetchUser(kim3rtd).then(user => {
          let embed2 = new Discord.RichEmbed()
            .setTitle("Soruları cevaplamak için verilen süre: 60 Saniye!")
            .setDescription(
              "**NOT** `=>` Botun açıklaması **15 ile 200** karakter arası olmalıdır."
            )
            .addField(`Botun ID'si?`, `${kim3rtd} (**${user.tag}**)`)
            .addField(`Botun prefixi ve yardım komutu?`, `${kid2}`)
            .addField(`Botun açıklaması?`, "Cevap bekleniyor...")
            .setColor(client.renk.kirmizi);
          abc.edit(embed2);
        })
          message.channel
            .awaitMessages(filtre, { max: 1, time: 60000 })
            .then(async cevap3 => {
              let kid3 = cevap3.first().content;
              if (kid3.length > 200 || kid3.length < 15) {
                abc.delete();
                return message.channel.send(
                  "**Bot'un açıklaması `15-200` karakter arası olmalıdır!**"
                );
              }
              if (kid3 === "iptal") {
                abc.delete();
                return message.channel.send("**İşlem iptal edildi!**");
              }
              setTimeout(() => {
                cevap3.first().delete();
              }, 1000);
            client.fetchUser(kim3rtd).then(user => {
              let embed3 = new Discord.RichEmbed()
                .setTitle("Soruları cevaplamak için verilen süre: 60 Saniye!")
                .setDescription(
                  "__**SEÇEBİLECEĞİNİZ MEVCUT KÜTÜPHANELER**__\n`1` `|` **discord.js**\n`2` `|` **Eris** \n`3` `|` **discord.py**\n`4` `|` **Discord.Net**\n`5` `|` **JDA**\nSeçim yapmak için sadece `1-5` arasında bir sayıyı seçmeniz yeterlidir."
                )
                .addField(`Botun ID'si?`, `${kim3rtd} (**${user.tag}**)`)
                .addField(`Botun prefixi yardım komutu?`, `${kid2}`)
                .addField(`Botun açıklaması?`, `${kid3}`)
                .addField(`Botun kütüphanesi?`, "Cevap bekleniyor...")
                .setColor(client.renk.kirmizi);
              abc.edit(embed3);
            })
              message.channel
                .awaitMessages(filtre, { max: 1, time: 60000 })
                .then(async cevap4 => {
                  let km3rtid4 = cevap4.first().content;
                  let seçim;
                  if (km3rtid4 == "1" || km3rtid4 == "discord.js") seçim = "discord.js";
                  else if (km3rtid4 == "2" || km3rtid4 == "Eris") seçim = "Eris";
                  else if (km3rtid4 == "3" || km3rtid4 == "discord.py") seçim = "discord.py";
                  else if (km3rtid4 == "4" || km3rtid4 == "Discord.Net") seçim = "Discord.Net";
                  else if (km3rtid4 == "5" || km3rtid4 == "JDA") seçim = "JDA";
                  else {
                    abc.delete();
                    return message.channel.send(
                      "**`1-5` arasında bir sayı girmelisin!**"
                    );
                  }
                  if (km3rtid4 == "iptal") {
                    abc.delete();
                    return message.channel.send("**İşlem iptal edildi!**");
                  }
                  setTimeout(() => {
                    cevap4.first().delete();
                  }, 1000);
                  let arr = [
                    "Moderasyon",
                    "Eğlence",
                    "Koruma",
                    "Seviye",
                    "NSFW",
                    "Anime",
                    "Kullanıcı",
                    "Müzik",
                    "Dil desteği",
                    "Değiştirilebilir özellik",
                    "Meme",
                    "Web dashboard",
                    "Ekonomi",
                    "Çekiliş",
                    "Davet yönetimi",
                    "Diğer"
                  ];
                client.fetchUser(kim3rtd).then(async user => {
                  let embed4 = new Discord.RichEmbed()
                    .setTitle(
                      "Soruları cevaplamak için verilen süre: 60 Saniye!"
                    )
                    .setDescription(
                      "__**Kategoriler**__\n***Moderasyon, Eğlence, Koruma, Seviye, NSFW, Anime, Kullanıcı, Müzik, Dil desteği, Değiştirilebilir özellik, Meme, Web Dashboard, Ekonomi, Davet yönetimi, Diğer***\nCevabınız yukarıdakilerden birisi veya birkaçı olmak zorundadır.\n**NOT** `=>` Lütfen kategorileri `,`(virgül) ile ayırın ve küçük-büyük harfe özen gösterin!.\nÖRN `=>` Müzik, Değiştirilebilir özellik, Eğlence, Anime, NSFW"
                    )
                    .addField(`Botun ID'si?`, `${kim3rtd} (**${user.tag}**)`)
                    .addField(`Botun prefixi yardım komutu?`, `${kid2}`)
                    .addField(`Botun açıklaması?`, `${kid3}`)
                    .addField(`Botun kütüphanesi?`, `${seçim}`)
                    .addField(`Botun kategorisi?`, "Cevap bekleniyor...")
                    .setColor(client.renk.kirmizi);
                  await abc.edit(embed4);
                })
                  message.channel
                    .awaitMessages(filtre, { max: 1, time: 60000 })
                    .then(async cevap5 => {
                      let km3rtid5 = cevap5.first().content;
                      if (km3rtid5 === "iptal") {
                        abc.delete();
                        return message.channel.send("**İşlem iptal edildi!**");
                      }
                    if (!arr.some(e => km3rtid5.toLowerCase().includes(e.toLowerCase()))) {
                      abc.delete()
                      return message.channel.send("**Size gösterilen kategorilerden farklı bir kategori girdiniz!**")
                    }
                      let array = [];
                      km3rtid5.split(", ").map(e => array.push(e));
                      setTimeout(() => {
                        cevap5.first().delete();
                      }, 1000);
                      client.fetchUser(kim3rtd).then(async user => {
                        let embed5 = new Discord.RichEmbed()
                          .setTitle("Bot Ekletme Başvurusu")
                          .setAuthor(
                            client.users.get(kim3rtd).tag,
                            client.users.get(kim3rtd).avatarURL
                          )
                          .setThumbnail(client.users.get(kim3rtd).avatarURL)

                          .setDescription(
                            `__**BAŞVURUYU YAPAN**__\n<@${message.author.id}> \`|\` ${message.author.id}\n \n__**BOT**__\n<@${kim3rtd}> \`|\` \`${kim3rtd}\` \`|\` ${user.tag}\n \n__**DURUM**__\nOnaylanılması bekleniyor...!\n \n`
                          )
                          .addField(`Botun ID'si?`, `${kim3rtd}`)
                          .addField(
                            `Botun prefixi ve yardım komutu?`,
                            `${kid2}`
                          )
                          .addField(`Botun açıklaması?`, `${kid3}`)
                          .addField(`Botun kütüphanesi?`, `${seçim}`)
                          .addField(`Botun kategorisi?`, `${km3rtid5}`)
                          .setColor(client.renk.kirmizi);
                        client.channels
                          .get(client.ayarlar.botLog)
                          .send(embed5)
                          .then(async(e) => {
                        message.guild.channels
                          .get(client.ayarlar.işlemLog)
                          .send(
                            `🔔 **=>** ${message.member} botunu sisteme ekledi. Onaylanılması bekleniyor! (Bot: **${user.tag}**)`
                          );
                        message.member.send(
                          "Bot başvurunuz başarılı bir şekilde alındı. Lütfen yetkililer ilgilenene kadar sabırlı bir şekilde bekleyin."
                        );
                        message.guild.channels
                          .find(a => a.name == message.author.id)
                          .delete();
                        abc.delete();
                        await client.bots.waiting.set(user.id, {
                          id: user.id,
                          tag: user.tag,
                          name: user.username,
                          discrim: user.discriminator,
                          owner: {
                            id: message.author.id,
                            tag: message.author.tag,
                            name: message.author.username,
                            createdAt: message.author.createdAt,
                            createdTimestamp: message.author.createdTimestamp,
                            joinedAt: message.member.joinedAt,
                            joinedTimestamp: message.member.joinedTimestamp,
                            discrim: message.author.discriminator,
                            avatar: message.author.avatarURL
                          },
                          timestamp: message.createdTimestamp,
                          createdAt: user.createdAt,
                          library: seçim,
                          categories: array,
                          description: kid3,
                          avatar: user.avatarURL,
                          logChannel: {
                            channelID: client.ayarlar.botLog,
                            messageID: e.id
                          },
                          mainKomut: kid2,
                          notlar: {
                                admin: "yok",
                                user: "yok"
                              }
                        });
                        client.bots.waiting.array().forEach(x => {
                          db.push("waiting", x);
                        });
                        client.bots.added.array().forEach(x => {
                          db.push("added", x);
                        });
                          cooldown.add(message.author.id);
                          setTimeout(function() {
                            cooldown.delete(message.author.id);
                          }, 1000*60*60*6);
                       })
                      }).catch(err => {
                        abc.delete()
        message.channel.send(`**İstenilen süre içinde cevaplanmadı.**`);
        console.error(err);
      });
                    }).catch(err => {
                    abc.delete()
        message.channel.send(`**İstenilen süre içinde cevaplanmadı.**`);
        console.error(err);
      });
                }).catch(err => {
                abc.delete()
        message.channel.send(`**İstenilen süre içinde cevaplanmadı.**`);
        console.error(err);
      });
            }).catch(err => {
            abc.delete()
        message.channel.send(`**İstenilen süre içinde cevaplanmadı.**`);
        console.error(err);
      });
        }).catch(err => {
        abc.delete()
        message.channel.send(`**İstenilen süre içinde cevaplanmadı.**`);
        console.error(err);
      });
    }).catch(err => {
    abc.delete()
        message.channel.send(`**İstenilen süre içinde cevaplanmadı.**`);
        console.error(err);
      });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "başvuru",
  description: "Başvuru.",
  usage: "başvuru yap"
};