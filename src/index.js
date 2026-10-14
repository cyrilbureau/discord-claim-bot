import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import { loadEnvFile } from 'node:process';
import { execute as executeClaim } from './commands/claim.js';
import { initializeDatabase } from './database/schema.js';

loadEnvFile();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
	],
});

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) {
		return;
	}

	if (interaction.commandName !== 'claim') {
		return;
	}

	try {
		await executeClaim(interaction);
	} catch (error) {
		console.error('Failed to execute command:', error);

		const response = {
			content: 'An error occurred while executing this command.',
			flags: MessageFlags.Ephemeral,
		};

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp(response);
		} else {
			await interaction.reply(response);
		}
	}
});

initializeDatabase();

client.login(process.env.DISCORD_TOKEN);
