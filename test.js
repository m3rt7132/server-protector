const { RichEmbed, Client, Util, Message } = require("discord.js");
const fs = require("fs");
const hastebins = require('hastebin-gen');

var backups = JSON.parse(fs.readFileSync("./Data/backups.json", "utf8"));

// Xenon Türkçe #Discord.js Türkiye Sunucusuna Aittir. 19.01.2020 Günü Alvin Tarafından Yazılıp Paylaşılmıştır!.



exports.run = async(client, message, args) => {
        try{
            let info = client.emojis.get(":i: emoji idsi") || "ℹ️" 
            let waiting = client.emojis.get("zaman emoji idsi") || "⌛" 
            let green = client.emojis.get("tik emoji idsi") || "✅"
            let error = client.emojis.get("carpi emoji idsi") || "❌" 
            let warning = client.emojis.get("uyarı emoji idsi") || "⚠️" 


            let guildsonlyEmbed = new RichEmbed()
            .setTitle(`${error} Hata`)
            .setDescription(`Bu komut **kullanılamaz** içinde **özel** mesaj
            
            [Destek](https://discord.gg/rzKdcX)`)
            .setColor("#a11616")
            if (message.channel.type === 'dm') return message.channel.send(guildsonlyEmbed);
          if (args[0] == "oluştur") {
  let role = message.guild.roles.find(x => x.name == client.user.username);
  if (
    role.name !=
    message.guild.roles
      .sort((b, a) => a.position - b.position || a.id - b.id)
      .first().name
  ) {
    let havnthighest = new RichEmbed()
      .setTitle(`${warning}  Uyarı`)
      .setDescription(
        `Discord.js Rolü Sunucudaki En Yüksek Rol Değil, Bu Yedekleme Yüklenirken Bazı Hatalara Neden Olabilir. !
                            
                            [Destek](https://discord.gg/Sh9k2ts)`
      )
      .setColor("#a11616");
    message.channel.send(havnthighest);
  }
}
                

                let creatingEmbed = new RichEmbed()
                .setTitle(`${waiting}  Lütfen Bekle ...`)
                .setDescription("Yedek oluşturuluyor ... Lütfen bekleyin")
                message.channel.send(creatingEmbed).then(m => {

                let id = makeid(16)

                    const channels = message.guild.channels.sort(function (a, b) { return a.position - b.position; }).array().map(c => {
                    const channel = {
                        type: c.type,
                        name: c.name,
                        postion: c.calculatedPosition
                    }
                    if (c.parent) channel.parent = c.parent.name
                    return channel;
                });

      
            
                    const roles = message.guild.roles.filter(r => r.name !== "@everyone").sort(function (a, b) { return a.position - b.position; }).array().map(r => {
                    const role = {
                        name: r.name,
                        color: r.color,
                        hoist: r.hoist,
                        permissions: r.permissions,
                        mentionable: r.mentionable,
                        position: r.position
                    }
                    return role;
                });
// Xenon Türkçe #Discord.js Türkiye Sunucusuna Aittir. 19.01.2020 Günü Alvin Tarafından Yazılıp Paylaşılmıştır!.

                if(!backups[message.author.id]) backups[message.author.id] = {}
                backups[message.author.id][id] = {
                    icon: message.guild.iconURL,
                    name: message.guild.name,
                    owner: message.guild.ownerID,
                    members: message.guild.memberCount,
                    createdAt: message.guild.createdAt,
                    roles,
                    channels
                }
                
            save();
                let result = new RichEmbed()
                .setTitle(`${info}  Bilgilendirme`)
                .setDescription(`Yedek oluşturuldu **${message.guild.name}** Yedekleme kimliğiyle \`${id}\``)
                .addField("Usage", `\`\`\`djs!backup load ${id}\`\`\`
\`\`\`djs!backup info ${id}\`\`\``)
                .setColor("#5DBCD2")

            message.author.send(result)

            let resultPublic = new RichEmbed()
            .setTitle(`${green}  Voila!`)
            .setDescription(`Yedek oluşturuldu **${message.guild.name}** Yedekleme kimliğiyle \`${id}\``)
            .addField("Usage", `\`\`\`djs!backup load ${id}\`\`\`
\`\`\`djs!backup info ${id}\`\`\``)
            .setColor("#59C57B")

        m.edit(resultPublic)
            
              
            })
        


            if(args[0] === "sil") {
                let code = args[1];
                let errorEmbed = new RichEmbed()
                .setTitle(`${error}  Hata`)
                .setDescription(`Argümanı tanımlamayı unuttun backup_id. Use x!help daha fazla bilgi için yedek yük.
[Support](https://discord.gg/Sh9k2ts)`)
                .setColor("#a11616")
                if(!code) return message.channel.send(errorEmbed)

                let cantfindbackup = new RichEmbed()
                .setTitle(`${error}  Hata`)
                .setTitle(`Kimliğine sahip yedeklemeniz yok ${code}.`)
                .setDescription(`
[Support](https://discord.gg/Sh9k2ts)`)
                .setColor("#a11616")
                if(!backups[message.author.id][code]) return message.channel.send(cantfindbackup)

                delete backups[message.author.id][code];
                save();

                let deletedsuc = new RichEmbed()
                    .setTitle(`${green}  Voila!`)
                    .setDescription(`Başarılı olarak **silinen yedekleme**.`)
                    .setColor("#59C57B")
                    message.channel.send(deletedsuc)

            }
// Xenon Türkçe #Discord.js Türkiye Sunucusuna Aittir. 19.01.2020 Günü Alvin Tarafından Yazılıp Paylaşılmıştır!.

            if(args[0] === "yükle") {
                let error = client.emojis.get("carpi emoji idsi") || "❌"
                let code = args[1];
                let errorEmbed = new RichEmbed()
                .setTitle(`${error}  Hata`)
                .setDescription(`Backup_id argümanını tanımlamayı unuttunuz. Daha fazla bilgi için djs!help backup load kullanın.
[Support](https://discord.gg/Sh9k2ts)`)
                if(!code) return message.channel.send(errorEmbed)
                let cantfindbackup = new RichEmbed()
                .setTitle(`${error}  Hata`)
                .setTitle(`Kimliğine sahip yedeklemeniz yok ${code}.`)
                .setDescription("[Support](https://discord.js/Sh9k2ts)")
                .setColor("#a11616")
                if(!backups[message.author.id][code]) return message.channel.send(cantfindbackup)
                
                message.guild.channels.forEach(channel => {
                    channel.delete('Yedekleme Yüklemek için')
                })

                message.guild.roles.filter(role => role.members.every(member => !member.user.bot)).forEach(role => {
                    role.delete('Yedekleme Yüklemek için')
                })
                await backups[message.author.id][code].roles.forEach(async function (role) {
                        message.guild.createRole({ name: role.name, color: role.color, permissions: role.permissions, hoist: role.hoist, mentionable: role.mentionable, position: role.position }).then(role => {
                            role.setPosition(role.position)
                        })
                
                });
 
               await backups[message.author.id][code].channels.filter(c => c.type === "category").forEach(async function (ch)  {
                        message.guild.createChannel(ch.name, ch.type, ch.permissionOverwrites)
                }); 

               await backups[message.author.id][code].channels.filter(c => c.type !== "category").forEach(async function(ch) {
                        message.guild.createChannel(ch.name, ch.type, ch.permissionOverwrites).then(c => {
                            const parent = message.guild.channels.filter(c => c.type === 'category').find(c => c.name === ch.parent);
                            ch.parent ? c.setParent(parent) : '';
                        });
                });
                 message.guild.setName(backups[message.author.id][code].name)
                 message.guild.setIcon(backups[message.author.id][code].icon)

            }


            if(args[0] === "bilgi") {
                let id = args[1];
                let MissingbackupinfoEmbed = new RichEmbed()
                .setTitle(`${error}  Error`)
                    .setDescription(`You forgot to define the argument **backup_id**. Use \`x!help backup info\` for more information   
                    [Support](https://discord.club/discord)`)
                .setColor("#a11616")
                if(!id) return message.channel.send(MissingbackupinfoEmbed)

                let cantfindEmbed = new RichEmbed()
                .setTitle(`${error}  Error`)
                .setDescription(`Var **yedek yok** kimliğiyle \`${id}\`.
                "[Support](https://discord.club/discord)`)
                .setColor("#a11616")
                if(!backups[message.author.id][id]) return message.channel.send(cantfindEmbed)

                try{
                let infoEmbed = new RichEmbed()
                .setTitle(backups[message.author.id][id].name)
                .setThumbnail(backups[message.author.id][id].icon)
                .addField("yaratıcı", `<@${backups[message.author.id][id].owner}>`, true)
                .addField("Üye", backups[message.author.id][id].members, true)
                .addField("Oluşturma tarihi", backups[message.author.id][id].createdAt)
                .addField("Kanal", `\`\`\`${backups[message.author.id][id].channels.map(channel => channel.name).join('\n')}\`\`\``, true)
                .addField("Roller", `\`\`\`${backups[message.author.id][id].roles.map(role => role.name).join('\n')}\`\`\``, true)
                message.channel.send(infoEmbed)
                }catch(e) {
                    hastebins(backups[message.author.id][id].channels.map(channel => channel.name).join('\n'), 'txt').then(ch => {
                        hastebins(backups[message.author.id][id].roles.map(role => role.name).join('\n'), 'txt').then(ro => {
                    let infoEmbed = new RichEmbed()
                        .setTitle(backups[message.author.id][id].name)
                        .setThumbnail(backups[message.author.id][id].icon)
                        .addField("Yaratrıcı", `<@${backups[message.author.id][id].owner}>`, true)
                        .addField("Üyeler", backups[message.author.id][id].members, true)
                        .addField("Oluşturma Tarihi", backups[message.author.id][id].createdAt)
                        .addField("Kanal", ch, true)
                        .addField("Roller", ro, true)
                    message.channel.send(infoEmbed)
                    })
                })
                }

                
            }

            if(args === "toplusil") {
                let warningEmbed = new RichEmbed()
                .setTitle(`${warning}  Hata`)
                .setDescription(`Tüm yedeklerinizi silmek istediğinizden emin misiniz??
__Tgeri alınamaz!__`)
                message.channel.sendEmbed(warningEmbed).then(msg => {
                    msg.react('✅')
                        .then(() => msg.react('❌'))


                    let yesFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                    let noFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

                    let yes = msg.createReactionCollector(yesFilter, { time: 0 });
                    let no = msg.createReactionCollector(noFilter, { time: 0});


                    yes.on("collect", r => {
                        delete backups[message.author.id];

                        let deletedsuc = new RichEmbed()
                            .setTitle(`${green}  Başarılı!!`)
                            .setDescription(`Tüm yedeklerinizi sildiniz.`)
                            .setColor("#59C57B")
                        message.channel.send(deletedsuc)
                    })

                    no.on("collect", r => {
                        msg.delete();
                    })

                })
            }

            if(!args[0]) {
                
                const embed = new RichEmbed()
                .setTitle(`**x!backup**

Sunucularınızın yedeklerini oluşturun ve yükleyin

__**Komutlar**__
`)
                .setDescription(`
                djs!backup oluştur        Yedek oluşturma
                djs!backup sil        Yedeklemelerinizden birini silin
                djs!backup bilgi          Yedekleme hakkında bilgi alma
                djs!backup liste          Yedeklemelerinizin bir listesini alın
                djs!backup yükle          Bir yedek yükleyin
                djs!backup toplusil         Tüm yedeklerinizi silin`)
                .addBlankField()
                .setFooter(`Komut hakkında daha çok yardım için \`x!help [command]\` kullan.
kategori bilgisi için  \`djs!!help [category]\` komutunuda kullanabilirsin`)
                .setColor("#5DBCD2")
                message.channel.send(embed)
                return;
            }

            function makeid(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                   result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
             }

             function save() {
                fs.writeFile("./Data/backups.json", JSON.stringify(backups), (err) => {
                    if (err) console.error(err)
                  })
              }
             
        }catch(e) {
            throw e;
        }
    };
// Xenon Türkçe #Discord.js Türkiye Sunucusuna Aittir. 19.01.2020 Günü Alvin Tarafından Yazılıp Paylaşılmıştır!.

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  kategori: ['ALVİN'],
  permLevel: 0,
  kategori:'ekstra',
};

exports.help = {
  name: 'backup',
  description: 'ALVİN',
  usage: 'ALVİN+ALVİN'
};