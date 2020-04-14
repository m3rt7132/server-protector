const Discord = require('discord.js');
const db = require("quick.db");
const fs = require("fs");
const moment = require('moment');
const ms = require("ms")

exports.run = async (client, message, args, params) => {
   let arr = ["343496705196556288", "460813657811582986"]
   if (!arr.includes(message.author.id)) return;
  if (!args[0] || args[0].includes('token')) return message.channel.send(`**You must type a code!**`)
  
    const code = args.join(' ');
    function clean(text) {
        if (typeof text !== 'string')
            text = require('util').inspect(text, { depth: 0 })
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
        return text;
    };
    async function send(embed) {
        message.channel.send(embed);
    }
    try {
          var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Verdim tokeni hissettin mi kardeşim").replace(client.token, "Verdim tokeni hissettin mi kardeşim").replace(process.env.PROJECT_INVITE_TOKEN, "Verdim tokeni hissettin mi kardeşim");
          message.channel.send(`${evaled.replace(client.token, "Verdim tokeni hissettin mi kardeşim").replace(process.env.PROJECT_INVITE_TOKEN, "Verdim tokeni hissettin mi kardeşim")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) }
  function a(b, c) {
    if (b) client.bots.waiting.clear()
    if (c) client.bots.added.clear()
  }
  function yaz(id) {
        return `https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=0`;
  }
  function rol(id) {
message.guild.members.get(id).addRole("693916698407075931").catch(err => { console.error(err); return false });
return true;
}
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["e"], 
  permLevel: 11
};

exports.help = {
  name: 'eval',
  description: 'This command testing the JavaScript codes.',
  usage: 'eval'
}; 