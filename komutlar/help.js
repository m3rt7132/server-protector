const Discord = require('discord.js');
const db = require("quick.db");
const fs = require("fs");

exports.run = async(client, message, args) => {
	  //dil
  var tr = [
    `İşte komut listem!`,//0
    `**Bir komut hakkında daha fazla bilgi edinmek istiyorsan,** \`${client.ayarlar.prefix}yardım <komutadı>\`**'nı kullan!**\n\`sp!panel\` **yazarak sunucu ayarlarını görebilirsiniz!\nBotun dilini değiştirmek için,** \`sp!dil\` **komutunu kullanabilirsiniz!**\n \n${client.emoji.turkiye} **BOTUN SAHİBİ =>** <@${client.ayarlar.m3rt}>\n${client.emoji.kalp} **Emeği geçenler =>** <@254950632757133312>, <@460813657811582986>, <@637962258668060683>\n`,//1
    `**Sunucudaki herkes bu komutu kullanabilir!**`,//2
    `**Sadece \`MESAJLARI YÖNET\` iznine sahip olanlar bu komutu kullanabilir!**`,//3
    `**Sadece \`KULLANICI ADLARINI YÖNET\` iznine sahip olanlar bu komutu kullanabilir!**`,//4
    `**Sadece \`ÜYELERİ AT\` iznine sahip olanlar bu komutu kullanabilir!**`,//5
    `**Sadece \`ÜYELERİ ENGELLE/YASAKLA\` iznine sahip olanlar bu komutu kullanabilir!**`,//6
    `**Sadece \`EMOJİLERİ YÖNET\` iznine sahip olanlar bu komutu kullanabilir!**`,//7
    `**Sadece \`KANALLARI YÖNET\` iznine sahip olanlar bu komutu kullanabilir!**`,//8
    `**Sadece \`ROLLERİ YÖNET\` iznine sahip olanlar bu komutu kullanabilir!**`,//9
    `**Sadece \`SUNUCUYU YÖNET\` iznine sahip olanlar bu komutu kullanabilir!**`,//10
    `**Sadece \`YÖNETİCİ\` iznine sahip olanlar bu komutu kullanabilir!**`,//11
    `**Sadece \`SUNUCU SAHİBİ (taç)\` iznine sahip olanlar bu komutu kullanabilir!**`,//12
    `**Sadece \`m3rt\` bu komutu kullanabilir!**`,//13
    `Komut ismi`,//14
    `Komut açıklaması`,//15,
    `Komut kullanımı`,//16
    `Komut alternatifleri`,//17
    `Komut Bakımda mı?`,//18
    `Hangi izinlere sahip olanlar kullanabilir?`,//19
    `**Bu komut için bir alternatif bulunmuyor!**`,//20
    `\`{argsreplace}\` **adında bir komut bulamadım! Tam isminin yazıldığından emin ol. Komut listesi için \`sp!help\` yazınız!**`,//21
    `komut!`,//22
    `**BOTU SUNUCUNA EKLE!**`,//23
    `URL için tıkla!`,//24
  ];
  var en = [
    `Here is my commands list!`,//0
    `**If you want to see more help about any command, use** \`${client.ayarlar.prefix}help <command name>\`\n**Type \`sp!settings\` to see server's current settings.**\n**If you want to change bot's language, type \`sp!setlang\`!**\n \n${client.emoji.turkiye} **Server Protector's Owner =>** <@${client.ayarlar.m3rt}>\n${client.emoji.kalp} **Friends =>** <@254950632757133312> <@460813657811582986> <@637962258668060683>\n`,//1
    `**Everyone can use this command!**`,//2
    `**Only \`MANAGE MESSAGES\` permissions can use this command!**`,//3
    `**Only \`MANAGE NICKNAMES\` permissions can use this command!**`,//4
    `**Only \`KICK MEMBERS\` permissions can use this command!**`,//5
    `**Only \`BAN MEMBERS\` permissions can use this command!**`,//6
    `**Only \`MANAGE EMOJIS\` permissions can use this command!**`,//7
    `**Only \`MANAGE CHANNELS\` permissions can use this command!**`,//8
    `**Only \`MANAGE ROLES\` permissions can use this command!**`,//9
    `**Only \`MANAGE SERVER\` permissions can use this command!**`,//10
    `**Only \`ADMINISTRATOR\` permissions can use this command!**`,//11
    `**Only \`SERVER OWNER\` can use this command!**`,//12
    `**Only \`m3rt\` can use this command!**`,//13
    `Command name`,//14
    `Command description`,//15,
    `Command usage`,//16
    `Command aliases`,//17
    `In maintenance?`,//18
    `Which permission can use?`,//19
    `**This command don't have any aliases!**`,//20
    `**I can't find the command called with \`{argsreplace}\`. Please make sure didn't typo! Type \`${client.ayarlar.prefix}help\` to see commands list.**`,//21
    `commands!`,//22
    `**ADD THE BOT TO YOUR SERVER!**`,//23
    `Click Here for URL!`,//24
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + message.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
//dil
   
  if (!args[0]) {
		const help = {}
		client.commands.forEach((command) => {
      
    let isimler;
    if (dil == "eng") isimler = command.help.name
    else isimler = command.help.name2
      
			const cat = command.help.kategori;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
			help[cat].push(`**${isimler}**`);
		})
		var str = ''
		for (const kategori in help) {
			str += `__${kategori.toUpperCase()}__ \n${help[kategori].join(" `|` ")}\n\n`
		}
    
		const embed = new Discord.RichEmbed()
		.setTitle(mesaj[0])	
    .setDescription(`${mesaj[1]} \n \n${str}`)
    .addField(mesaj[23], `[${mesaj[24]}](https://discordapp.com/oauth2/authorize?client_id=638751029629943838&scope=bot&permissions=2146958847)`)
			.setTimestamp()
      .setFooter(`${client.user.username}  -  (${client.guilds.size} servers & ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} user!)`, client.user.avatarURL)
			.setColor(client.ayarlar.basarilirengi)
		message.channel.send({embed})
		return
  }
	let command = args[0]
  if (args[0] === "help" || args[0] === "eval") return;
	if (client.commands2.has(command) || client.commands.has(command) || client.aliases.has(command)) {
		command = client.commands2.get(command) || client.commands.get(command) || client.aliases.get(command)
    let aciklama;
  if(dil == "eng") aciklama = command.help.description.split("|")[0];
else aciklama = command.help.description.split("|")[1];
    let usagee;
  if(dil == "eng") usagee = command.help.usage.split("|")[0];
else usagee = command.help.usage.split("|")[1];
    let bakimm;
  if(dil == "eng") bakimm = command.conf.maintenance
else bakimm = command.conf.maintenance.replace("YES", "Evet").replace("NO", "Hayır")
    let komutt;
    if (dil == "eng") komutt = command.help.name
    else komutt = command.help.name2
    let permlvl;
    if (command.conf.permLevel === 0) permlvl = mesaj[2]
    if (command.conf.permLevel === 1) permlvl = mesaj[3]
    if (command.conf.permLevel === 2) permlvl = mesaj[4]
    if (command.conf.permLevel === 3) permlvl = mesaj[5]
    if (command.conf.permLevel === 4) permlvl = mesaj[6]
    if (command.conf.permLevel === 5) permlvl = mesaj[7]
    if (command.conf.permLevel === 6) permlvl = mesaj[8]
    if (command.conf.permLevel === 7) permlvl = mesaj[9]
    if (command.conf.permLevel === 8) permlvl = mesaj[10]
    if (command.conf.permLevel === 9) permlvl = mesaj[11]
    if (command.conf.permLevel == 10) permlvl = mesaj[12]
    if (command.conf.permLevel == 11) permlvl = mesaj[13]
		const embed = new Discord.RichEmbed()
			.addField(mesaj[14], `**${komutt}**`, false)
			.addField(mesaj[15], "**"+aciklama+"**", false)
			.addField(mesaj[16], "**"+client.ayarlar.prefix+usagee+"**")
			.addField(mesaj[17], `**${command.conf.aliases[0] ? command.conf.aliases.join(' `|` ') : `${mesaj[20]}`}**`)
      .addField(mesaj[18], `**${bakimm}**`)
      .addField(mesaj[19], permlvl)
			.setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL)
			.setColor(client.ayarlar.basarilirengi)
		message.channel.send({embed})
	} else {
		message.channel.send(mesaj[21].replace("{argsreplace}", args[0]))
	}
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['commands','cmds', "mycommands", "yardım", "yardim", "komutlar", "y"], 
  permLevel: 0,
  maintenance: "NO"
};

exports.help = {
  name: 'help',
  name2: "yardım",
  description: `Shows **Server Protector**'s commands list.|Komut listesi`,
  usage: 'help|yardım',
  kategori: "user & kullanıcı"
};