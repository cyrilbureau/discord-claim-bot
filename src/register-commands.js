import { REST, Routes } from 'discord.js';
import { loadEnvFile } from 'node:process';
import { data as claimCommand } from './commands/claim.js';

loadEnvFile();

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

try {
    const application = await rest.get(Routes.oauth2CurrentApplication());

    await rest.put(
        Routes.applicationCommands(application.id),
        {
            body: [claimCommand.toJSON()],
        }
    );

    console.log('Successfully registered application commands.');
} catch (error) {
    console.error('Failed to register application commands:', error);
    process.exitCode = 1;
}
