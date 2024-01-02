const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "problem";
const close = require("./close");
const close_with_reason = require("./close_with_reason");
const rename = require("./rename");

module.exports = {
    name:customId,
    description:"Create a ticket",
    btn:new ButtonBuilder()
            .setCustomId(customId)
            .setLabel("搖鈴")
            .setStyle(ButtonStyle.Success),

    async execute(inter,bot,Discord){
        await inter.deferReply({ephemeral:true});
        let ebdd = new EmbedBuilder()
          .setTitle('搖響鈴噹！')
          .setDescription('請放心搖鈴，只有**你和女僕**知道唷。OuO\n**建議**：提供任何建議。\n**檢舉**：檢舉非法使用本伺服器那些不可愛的小可愛。\n**回報**：回報伺服器出現的錯誤(Bug)。\n**上訴**：針對受到的處分上訴。')
          .setColor([0,255,0]);
        let btnn = new ActionRowBuilder()
            .setComponents([
            close.btn,
            close_with_reason.btn,
            rename.btn
            ]);
        let channel = await inter.guild.channels.create(
          {name:`ticket-`,
          parent:'977438906012282880', permissionOverwrites:[
            {
                id: inter.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
                id:inter.user.id,
                allow:[PermissionsBitField.Flags.ViewChannel]
            }
          ],topic:`${inter.member.id}`,type:0
          })
        await channel.edit({name:`ticket-${channel.id.slice(-4)}}`});
        await channel.send({content: `<@${inter.user.id}>`,embeds:[ebdd],components:[btnn]})
            .then(async msg=>{  //pin the message
              await msg.pin();
            });
        inter.editReply({content:"Finished",ephemeral:true});
    }
}