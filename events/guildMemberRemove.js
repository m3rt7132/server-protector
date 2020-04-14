const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
module.exports = async(member) => {
  const client = member.guild.client
    let giriscikis = await db.fetch(`giriscikis_${member.guild.id}`);
  if (giriscikis) {
  //dil
  var tr = [
    `Sunucudan çıkış yaptı!`, //0
    `Kullanıcı bilgileri`, //1
    `Üye`, //2
    `ID`, //3
    `Hesabını kurma tarihi`, //4
    `Sunucuya katılım tarihi` //5
  ];
  var en = [
    `Someone left from the server!`, //0
    `Member Info`, //1
    `Member`, //2
    `ID`, //3
    `Account Creation Date`, //4
    `Server join date` //5
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
      .utc(member.guild.member(member).user.createdAt)
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
  } else if (dil === "eng") {
    tariholusturma = moment
      .utc(member.guild.member(member).user.createdAt)
      .format("DD MMMM dddd YYYY  [**](HH:mm:ss)[**]");
  }

  let tarihgirme;
  if (dil === "tr") {
    tarihgirme = moment
      .utc(member.guild.member(member).joinedAt)
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
      .utc(member.guild.member(member).joinedAt)
      .format("DD MMMM dddd YYYY  [**](HH:mm:ss)[**]");
  }
  client.channels.get(giriscikis).send(
    new Discord.RichEmbed()
      .setTitle(mesaj[0])
      .setAuthor(member.user.username, member.user.avatarURL)
      .setThumbnail(member.user.avatarURL)
      .addField(
        `__${mesaj[1]}__\n`,
        `**${mesaj[2]}** => ${member}\n**${mesaj[3]}** => \`${member.id}\`\n**${
          mesaj[4]
        }** => ${tariholusturma}\n**${mesaj[5]}** => ${tarihgirme}`
      )
      .setFooter(client.user.username, client.user.avatarURL)
      .setColor(client.renk.kirmizi)
  );
  }
}