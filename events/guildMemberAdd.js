const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
/*
  "kilitle_banlandin": "**`{sunucuismi}` sunucusundan banlandın çünkü bu sunucu şu anda kilitli! Eğer bir yardıma ihtiyacın varsa, sunucu sahibine ulaşabilirsin({owner})!**",
  "kilitle_kicklendin": "**`{sunucuismi}` sunucusundan banlandın çünkü bu sunucu şu anda kilitli! Eğer bir yardıma ihtiyacın varsa, sunucu sahibine ulaşabilirsin({owner})!**"
*/
module.exports = async(member) => {
  var tr = [
    "**`{sunucuismi}` sunucusundan `yasaklandın` çünkü bu sunucu şu anda kilitli! Eğer bir yardıma ihtiyacın varsa, sunucu sahibine ulaşabilirsin({owner})!**",
    "**`{sunucuismi}` sunucusundan `atıldın` çünkü bu sunucu şu anda kilitli! Eğer bir yardıma ihtiyacın varsa, sunucu sahibine ulaşabilirsin({owner})!**",
    ``
  ];
  var en = [
    "**You have been `banned` from `{sunucuismi}` because this server is locked now! If you need any help, you can contact to server owner({owner})!**",
    "**You have been `kicked` from `{sunucuismi}` because this server is locked now! If you need any help, you can contact to server owner({owner})!**",
    ``
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + member.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
const client = member.guild.client
let giriscikis = await db.fetch(`giriscikis_${member.guild.id}`);
 let sunucukilitban = await db.fetch(`sunucukilitban_${member.guild.id}`)
  let sunucukilitkick = await db.fetch(`sunucukilitkick_${member.guild.id}`)
 if (sunucukilitban) {
   member.user.send(mesaj[0].replace("{sunucuismi}", member.guild.name).replace("{owner}", member.guild.owner.user))
   setTimeout(async() => {
     member.ban()    
   }, 150)
 }
  if (sunucukilitkick) {
    member.user.send(mesaj[1].replace("{sunucuismi}", member.guild.name).replace("{owner}", member.guild.owner.user))
  setTimeout(async() => {
     member.kick()    
   }, 150)
  }
  if (giriscikis) {
  var tr = [
    `Sunucuya giriş yaptı!`, //0
    `Kullanıcı bilgileri`, //1
    `Üye`, //2
    `ID`, //3
    `Hesabını kurma tarihi`, //4
    `Sunucuya katılım tarihi`, //5
    `Verilen rol(otorol)`, //6
    `Otorol ayarlanmamış!` //7
  ];
  var en = [
    `Someone joined to server!`, //0
    `Member Info`, //1
    `Member`, //2
    `ID`, //3
    `Account Creation Date`, //4
    `Server join date`, //5
    `Given role(autorole)`, //6
    `Autorole isn't setted`, //7
    ``
  ];
  let dil;
  var mesaj;
  dil = await db.fetch("language" + member.guild.id);
  mesaj = [];
  if (dil == "tr") mesaj = tr;
  else if (dil == "eng") mesaj = en;
  //dil
  let tariholusturma;
  if (dil === "tr") {
    tariholusturma = moment
      .utc(member.guild.members.get(member.id).user.createdAt)
      .format("DD MMMM dddd YYYY **(HH:mm:ss)**")
      .replace("Monday", `Pazartesi`)
      .replace("Tuesday", `Salı`)
      .replace("Wednesday", `Çarşamba`)
      .replace("Thursday", `Perşembe`)
      .replace("Friday", `Cuma`)
      .replace("Saturday", `Cumartesi`)
      .replace("Sunday", `Pazar`)
      .replace("January", `Ocak`)
      .replace("February", `Şubat`)
      .replace("March", `Mart`)
      .replace("April", `Nisan`)
      .replace("May", `Mayıs`)
      .replace("June", `Haziran`)
      .replace("July", `Temmuz`)
      .replace("August", `Ağustos`)
      .replace("September", `Eylül`)
      .replace("October", `Ekim`)
      .replace("November", `Kasım`)
      .replace("December", `Aralık`)
  } else {
    tariholusturma = moment
      .utc(member.guild.members.get(member.id).user.createdAt)
      .format("DD MMMM dddd YYYY  [**](HH:mm:ss)[**]");
  }

  let tarihgirme;
  if (dil === "tr") {
    tarihgirme = moment
      .utc(member.guild.members.get(member.id).joinedAt)
      .format("DD MMMM dddd YYYY  [**](HH:mm:ss)[**]")
      .replace("Monday", `Pazartesi`)
      .replace("Tuesday", `Salı`)
      .replace("Wednesday", `Çarşamba`)
      .replace("Thursday", `Perşembe`)
      .replace("Friday", `Cuma`)
      .replace("Saturday", `Cumartesi`)
      .replace("Sunday", `Pazar`)
      .replace("January", `Ocak`)
      .replace("February", `Şubat`)
      .replace("March", `Mart`)
      .replace("April", `Nisan`)
      .replace("May", `Mayıs`)
      .replace("June", `Haziran`)
      .replace("July", `Temmuz`)
      .replace("August", `Ağustos`)
      .replace("September", `Eylül`)
      .replace("October", `Ekim`)
      .replace("November", `Kasım`)
      .replace("December", `Aralık`);
  } else {
    tarihgirme = moment
      .utc(member.guild.members.get(member.id).joinedAt)
      .format("DD MMMM dddd YYYY  [**](HH:mm:ss)[**]");
  }


  let otorol = await db.fetch(`otorol_${member.guild.id}`);
  if (otorol != null) {
    let rol = member.guild.roles.get(otorol);
    
      member.addRole(rol).catch(console.error);
    
  }
  let otorole;
  if (otorol) otorole = `<@&${otorol}> && \`${otorol}\``;
  else otorole = mesaj[7];

  client.channels.get(giriscikis).send(
    new Discord.RichEmbed()
      .setTitle(mesaj[0])
      .setAuthor(member.user.username, member.user.avatarURL)
      .setThumbnail(member.user.avatarURL)
      .setColor(client.renk.acikyesil)
      .addField(
        `__${mesaj[1]}__\n`,
        `**${mesaj[2]}** => ${member}\n**${mesaj[3]}** => \`${member.id}\`\n**${
          mesaj[4]
        }** => ${tariholusturma}\n**${mesaj[5]}** => ${tarihgirme}\n**${
          mesaj[6]
        }** => ${otorole}`
      )
      .setFooter(client.user.username, client.user.avatarURL)
  );
  }
   async function mesajYaz(dil) {
    let lang = await db.fetch(`language${member.guild.id}`);
    if (lang === "tr") lang = "tr";
    else if (lang === "eng") lang = "eng";
    lang = client.lang(lang);
    return `${lang[dil]}`
  }
}