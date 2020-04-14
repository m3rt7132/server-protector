const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar/ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(
    `===============================================================================`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${client.user.username} =|= ${
      client.user.id
    }`
  );
  //`${client.guilds.size} servers and ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users!`
  client.user.setPresence({game: { name: `sp!help 🎄 sp!language`, type: "streaming", url: "https://www.twitch.tv/elraenn" } }
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${
      client.channels.size
    } kanal | ${client.guilds.size} sunucu | ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcı`
  );
};
