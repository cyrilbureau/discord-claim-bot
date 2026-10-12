import { Client, Events, GatewayIntentBits } from 'discord.js';
import { loadEnvFile } from 'node:process';

// Load environment variables from .env
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

client.login(process.env.DISCORD_TOKEN);
