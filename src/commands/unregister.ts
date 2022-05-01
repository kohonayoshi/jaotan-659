import { DBCategory } from '@/entities/category.entity'
import { loadTimes } from '@/main'
import {
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
} from '@discordjs/builders'
import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js'
import { BaseCommand, Permission } from '.'

export class UnregisterCommand implements BaseCommand {
  get definition(): SlashCommandSubcommandBuilder {
    return new SlashCommandSubcommandBuilder()
      .setName('unregister')
      .setDescription('対象時刻を登録解除します。')
      .addStringOption(
        new SlashCommandStringOption()
          .setName('name')
          .setDescription('名前')
          .setRequired(true)
      )
  }

  get permissions(): Permission[] {
    return [
      {
        identifier: 'ADMINISTRATOR',
        type: 'PERMISSION',
      },
    ]
  }

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    await interaction.deferReply({
      ephemeral: true,
    })

    const name = interaction.options.getString('name')

    const item = await DBCategory.findOne({
      where: { name },
    })
    if (!item) {
      await interaction.editReply('登録されていません。')
      return
    }

    await item.remove().catch(async (e) => {
      console.error(e)
      await interaction.reply('エラー: 登録解除に失敗しました。')
    })
    await loadTimes()

    await interaction.editReply(':white_check_mark:')
    await interaction.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle('登録解除完了')
          .setDescription(`\`${name}\` を登録解除しました。`)
          .setColor('#00ff00')
          .setFooter({
            text: interaction.user.tag,
            iconURL: interaction.user.avatarURL(),
          })
          .setTimestamp(),
      ],
    })
  }
}
