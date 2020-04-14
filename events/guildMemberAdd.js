module.exports = async(member) => {
  if (global.client.bots.added.some(e => member.id.includes(e.id))) {
    member.addRole(global.client.ayarlar.botRolü);
    member.removeRole(global.client.ayarlar.üyeRolü);
    member.guild.members.get(global.client.bots.added.get(member.id).owner.id).addRole(global.client.ayarlar.botDeveloperRolü);
  }
}