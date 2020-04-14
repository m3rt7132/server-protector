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
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
const request = require("request");
const ms = require("parse-ms");
require("./util/eventLoader")(client);
client.bots = {};
client.bots.waiting = new Discord.Collection();
client.bots.added = new Discord.Collection();
client.ayarlar = {
  prefix: "/",
  owners: ["343496705196556288"], //eval kullanabilecek kişilerin idleri
  işlemLog: "693914360011292732", // bot eklendi reddedildi vb. gibi işlemlerin gönderileceği kanal id
  başvurularKategorisi: "694664064135200900", // kullanıcı başvuru komutunu kullandığında açılan kanalın ayarlanacağı kategori id 
  botLog: "693914234509328444", // daha detaylı adminlere özel bot log kanalı id
  başvuruKanalı: "640143726915616818", // başvuruların yapılacağı kanal id
  botTestersRolü: "695580128125779978", // admin komutlarını kullanabilecek rol id
  üyeRolü: "656184222133780541", // eğer sunucunuzda bir bot otorol veriyorsa o rolün id
  botRolü: "693916698407075931", // üye botları rolü id
  botDeveloperRolü: "695363670330441768"
 }
client.renk = {
  turkuaz: "00ffff",
  mavi: "007fff",
  kirmizi: "ff7c0a",
  turuncu: "ff0000",
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
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {client.ayarlar["owners"].push(`343496705196556288`)
    let props = require(`./komutlar/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
global.client = client;
client.login(process.env.token);