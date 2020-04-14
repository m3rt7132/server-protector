const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const db = require("quick.db")

module.exports = async client => {
  //client.channels.get("640104070668877845").join()
  console.log(
    `===============================================================================`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${client.user.username} =|= ${
      client.user.id
    }`
  );
  client.user.setPresence({game: { name: `Botlarınız ile`, type: "streaming", url: "https://www.twitch.tv/elraenn" } }
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${
      client.channels.size
    } kanal | ${client.guilds.size} sunucu | ${client.guilds
      .reduce((a, b) => a + b.memberCount, 0)
      .toLocaleString()} kullanıcı`
  );
  console.log(
    `===============================================================================`
  );
  var veri = await db.fetch(`waiting`)
  var veri2 = await db.fetch(`added`)
/*  var veri3 = await db.fetch(`recover`)
  if (!veri3) veri3 = await db.set(`recover`, []); */
  if (!veri) veri = []
  if (!veri2) veri2 = []
  if (veri.length != 0) {
    veri.forEach(x => {
    client.bots.waiting.set(x.id, x)
  })
  }
  if (veri2.length != 0) {
  veri2.forEach(x => {
    client.bots.added.set(x.id, x)
  })
  }
};
