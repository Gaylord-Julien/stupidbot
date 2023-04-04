// this is the command that will be run when you type `laravel` in your terminal
// it will output the last release of Laravel from the GitHub API

// src/commands/laravel.ts

import { BaseInteraction, Client } from 'discord.js';
import { Command } from '../command';

export const Laravel: Command = {
  name: 'laravel',
  description: 'Get the latest release of Laravel',
  run: async (client: Client, interaction: BaseInteraction) => {
    if (!interaction.isCommand()) {
      return;
    }

    const res = await fetch('https://api.github.com/repos/laravel/laravel/releases/latest');
    const json = (await res.json()) as {
      body: string;
      tag_name: string;
      html_url: string;
    };

    // only display the first 2048 characters
    const changelog = json.body.slice(0, 2048);

    // display the changelog in an embed
    await interaction.reply({
      embeds: [
        {
          title: `Laravel ${json.tag_name}`,
          description: changelog,
          url: json.html_url,
        },
      ],
    });
  },
};
