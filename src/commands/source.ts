import { BaseInteraction, Client } from 'discord.js';
import { Command } from '../command';

export const Source: Command = {
  name: 'source',
  description: 'Obtenir le code source du bot',
  run: async (client: Client, interaction: BaseInteraction) => {
    if (!interaction.isCommand()) {
      return;
    }
    // add the source code link to an embed
    await interaction.reply({
      embeds: [
        {
          title: 'Source code',
          description: '[GitHub](https://github.com/Gaylord-Julien/stupidbot)',
        },
      ],
    });
  },
};
