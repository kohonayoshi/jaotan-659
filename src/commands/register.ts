import { DBCategory } from '@/entities/category.entity'
import { isTimeFormat } from '@/lib'
import {
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
} from '@discordjs/builders'
import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js'
import { BaseCommand, Permission } from '.'

export class RegisterCommand implements BaseCommand {
  get definition(): SlashCommandSubcommandBuilder {
    return new SlashCommandSubcommandBuilder()
      .setName('register')
      .setDescription('新しく対象時刻を登録します。')
      .addStringOption(
        new SlashCommandStringOption()
          .setName('name')
          .setDescription('名前')
          .setRequired(true)
      )
      .addStringOption(
        new SlashCommandStringOption()
          .setName('text')
          .setDescription('テキスト')
          .setRequired(true)
      )
      .addStringOption(
        new SlashCommandStringOption()
          .setName('base')
          .setDescription('基準時刻（HH:mm:ss.SSSの形式。例: 06:59:59.999）')
          .setRequired(true)
      )
      .addStringOption(
        new SlashCommandStringOption()
          .setName('start')
          .setDescription(
            '有効期間の開始時刻（HH:mm:ss.SSSの形式。例: 06:59:59.999）'
          )
          .setRequired(true)
      )
      .addStringOption(
        new SlashCommandStringOption()
          .setName('end')
          .setDescription(
            '有効期間の終了時刻（HH:mm:ss.SSSの形式。例: 06:59:59.999）'
          )
          .setRequired(true)
      )
      .addStringOption(
        new SlashCommandStringOption()
          .setName('match_type')
          .setDescription(
            'マッチ種別（テキストとの比較条件。指定しない場合INCLUDE）'
          )
          .addChoice('完全一致', 'EQUAL')
          .addChoice('前方一致', 'START')
          .addChoice('後方一致', 'END')
          .addChoice('部分一致', 'INCLUDE')
          .setRequired(false)
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
    const text = interaction.options.getString('text').replaceAll('\\n', '\n')
    const base = interaction.options.getString('base')
    const start = interaction.options.getString('start')
    const end = interaction.options.getString('end')
    const matchType = (interaction.options.getString('match_type', false) ||
      'INCLUDE') as DBCategory['matchType']

    if (!isTimeFormat(base) || !isTimeFormat(start) || !isTimeFormat(end)) {
      await interaction.reply('エラー: 時刻の形式が不正です。')
      return
    }

    const count = await DBCategory.count({
      where: [{ name }, { text }, { base }, { matchType }],
    })
    if (count > 0) {
      await interaction.editReply('既に登録済みです。')
      return
    }

    const category = new DBCategory()
    category.name = name
    category.description = ''
    category.text = text
    category.base = base
    category.start = start
    category.end = end
    category.matchType = matchType
    await category.save().catch(async (e) => {
      console.error(e)
      await interaction.reply('エラー: 登録に失敗しました。')
    })

    await interaction.editReply('登録完了')
    await interaction.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle('登録完了')
          .setDescription(`\`${name}\` を登録しました。`)
          .setColor('#00ff00')
          .addField('名前', `\`${name}\``, true)
          .addField('テキスト', `\`${text}\``, true)
          .addField('基準時刻', `\`${base}\``, true)
          .addField('有効期間の開始時刻', `\`${start}\``, true)
          .addField('有効期間の終了時刻', `\`${end}\``, true)
          .addField('マッチ種別', `\`${matchType}\``, true)
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.avatarURL(),
          })
          .setTimestamp(),
      ],
    })
  }
}
