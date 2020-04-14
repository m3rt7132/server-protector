const Discord = require('discord.js');
const backup = require("discord-backup");

exports.run = async(client, message, args, params) => {
if (!args[0] || (args[0] !== "create" && args[0] !== "load" && args[0] !== "delete" && args[0] !== "infos")) return message.channel.send(`${client.emoji.basarisiz} **You must type the parameters:** \`create\`, \`delete\`, \`load\`, \`infos\`,`)
  if (args[0] === "create") {
   await message.channel.send(`${client.emoji.yukleniyor} **Are you sure to backup this server? If you agree, type \`confirm\` in \`10 Seconds\`. **`)
  try {
        var response = await message.channel.awaitMessages(msg2 => msg2.content.toLowerCase() == "confirm", {
        maxMatches: 1,
        time: 10000,
        errors: ['time']
       })
      }
    catch(err) {  return message.channel.send(`${client.emoji.basarisiz} **You didn't respond in \`10 seconds\`!**`) }
console.log("test1")
  backup.create(message.guild).then(backupID => {
            console.log(backupID)
        message.author.send(`${client.emoji.basarili} **The backup of the server has been created! If you want to load it, type \`sp!backup load <your backup ID>\`**\n${client.emoji.basarili} **Also here are your backup ID!:** \`${backupID}\``);
 
  });
  
        
 } 
   if(args[0] === "load") {
        let backupIDD = args[1];
        if(!backupIDD){
            return message.channel.send(`${client.emoji.basarisiz} **You must specify a valid backup id!**`);
        }
        backup.fetch(backupIDD).then(async () => {
            message.channel.send(`${client.emoji.yukleniyor} **When the backup is loaded, all the channels, roles, etc. will be replaced! If you agree, type \`confirm\` in \`10 Seconds\`.**`);
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm"), {
                    max: 1,
                    time: 10000,
                    errors: ["time"]
                }).catch((err) => {
                    return message.channel.send(`${client.emoji.basarisiz} **You didn't respond in \`10 seconds\`!**`);
                });
                message.author.send(`${client.emoji.basarili} **I'm starting to load backup to your server!**`);
                backup.load(backupIDD, message.guild).then(() => {
                    backup.delete(backupIDD);
                }).catch((err) => {
                    return message.author.send(`${client.emoji.basarisiz} **Sorry, There's an error! Please check that I have administrator permissions!**`);
                });
        }).catch((err) => {
            return message.channel.send(`${client.emoji.basarisiz} **No backup found for \`${backupIDD}\`!**`);
        });
    }
  if(args[0] === "infos") {
        let backupID = args[1];
        if(!backupID){
            return message.channel.send(`${client.emoji.basarisiz} **You must specify a valid backup id!**`);
        }
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}-${(dd[1]?dd:"0"+dd[0])}`;
            let embed = new Discord.RichEmbed()
                .setTitle("Server Protector Backup System!")
                .addField("ID", backupInfos.ID)
                .addField("Server", backupInfos.guildID)
                .addField("Size", backupInfos.size)
                .addField("Created at", formatedDate)
                .setColor(client.ayarlar.basarilirengi);
            message.channel.send(embed);
        }).catch((err) => {
            return message.channel.send(`${client.emoji.basarisiz} **No backup found for \`${backupID}\`!**`);
        });
    }
  if (args[0] === "delete") {
    let backupID = args[1];
        if(!backupID){
            return message.channel.send(`${client.emoji.basarisiz} **You must specify a valid backup id!**`);
        }
    message.channel.send(`${client.emoji.yukleniyor} **Are you sure to delete the backup called with \`${backupID}\`? If you agree, type \`confirm\` in \`10 Seconds\`.**`);
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm"), {
                    max: 1,
                    time: 10000,
                    errors: ["time"]
                }).catch((err) => {
                    return message.channel.send(`${client.emoji.basarisiz} **You didn't respond in \`10 seconds\`!**`);
                });
        backup.delete(backupID)
    message.channel.send(`${client.emoji.basarili} **Backup is succesfuly deleted!**`)
  }
  function timeConverter(t) {
    var a = new Date(t);
    var today = new Date();
    var yesterday = new Date(Date.now() - 86400000);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
        return "today, " + hour + ":" + min;
    else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
        return "yesterday, " + hour + ":" + min;
    else if (year == today.getFullYear())
        return date + " " + month + ", " + hour + ":" + min;
    else
        return date + " " + month + " " + year + ", " + hour + ":" + min;
}
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['backup-server','backupserver'], 
  permLevel: 11,
  maintenance: "YES"
};

exports.help = {
  name: 'backup',
  name2: "yedek",
  description: 'This command creates backup of the current server!',
  usage: 'backup',
  kategori: "in maintenance & bakımda"
};