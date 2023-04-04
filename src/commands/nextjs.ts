// this is the command that will be run when you type `nextjs` in your terminal
// it will output the last release of Next.js from the GitHub API

// src/commands/nextjs.ts

import { BaseInteraction, Client } from 'discord.js';
import { Command } from '../command';

export const Nextjs: Command = {
  name: 'nextjs',
  description: 'Get the latest release of Next.js',
  run: async (client: Client, interaction: BaseInteraction) => {
    if (!interaction.isCommand()) {
      return;
    }

    const res = await fetch('https://api.github.com/repos/vercel/next.js/releases/latest');
    const json = (await res.json()) as {
      body: string;
      tag_name: string;
      html_url: string;
    };

    // remove the first line of the changelog and display only the first 2048 characters
    const changelog = json.body.split('\n').slice(1).join('\n').slice(0, 2048);

    // display the changelog in an embed
    await interaction.reply({
      embeds: [
        {
          title: `Next.js ${json.tag_name}`,
          description: changelog,
          url: json.html_url,
        },
      ],
    });
  },
};
