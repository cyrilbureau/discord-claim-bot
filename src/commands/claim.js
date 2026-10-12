import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('claim')
    .setDescription('Manage CLAIM Bot settings.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((subcommand) =>
        subcommand
            .setName('status')
            .setDescription('Display the current CLAIM Bot status.')
    );

export async function execute(interaction) {
    if (interaction.options.getSubcommand() === 'status') {
        await interaction.reply({
            content: 'CLAIM Bot is online and responding to commands!',
        });
    }
}
