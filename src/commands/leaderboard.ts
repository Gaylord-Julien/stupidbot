import { BaseInteraction, Client } from 'discord.js';
import sqlite3 from 'sqlite3';
import { Command } from '../command';
import { KeywordCount } from '../listeners/autoAnswer';

export const Leaderboard: Command = {
  name: 'leaderboard',
  description: 'Displays the keyword leaderboard',
  run: async (client: Client, interaction: BaseInteraction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const db = new sqlite3.Database('./data/keyword_counts.db');

    db.all('SELECT * FROM counts ORDER BY count DESC', (err, rows: KeywordCount[]) => {
      if (err) {
        console.error(err);
        return;
      }

      // find the users with the most counts for each keyword
      const counts = rows.reduce((acc, row) => {
        if (!acc[row.keyword]) {
          acc[row.keyword] = [];
        }
        acc[row.keyword].push(row);
        return acc;
      }, {} as { [key: string]: KeywordCount[] });

      // sort the users by count
      const sortedCounts = Object.keys(counts).reduce((acc, keyword) => {
        const keywordCounts = counts[keyword];
        acc[keyword] = keywordCounts.slice().sort((a, b) => b.count - a.count);
        return acc;
      }, {} as { [key: string]: KeywordCount[] });

      // get the top 3 users for each keyword
      const topUsers = Object.keys(sortedCounts).reduce((acc, keyword) => {
        acc[keyword] = sortedCounts[keyword].slice(0, 3);
        return acc;
      }, {} as { [key: string]: KeywordCount[] });

      // create the embed and add "winner" and "runner-up" emojis to the top 2 users
      const embed = {
        title: 'Les grands gagnants',
        fields: Object.keys(topUsers).map((keyword) => {
          const topUsersForKeyword = topUsers[keyword];
          return {
            name: keyword,
            value: topUsersForKeyword
              .map((user, index) => {
                let medal;
                if (index === 0) {
                  medal = '🥇';
                } else if (index === 1) {
                  medal = '🥈';
                } else {
                  medal = '';
                }
                return `${medal} ${user.username} - ${user.count}`;
              })
              .join('\n'),
          };
        }),
      };

      interaction.reply({ embeds: [embed] });
    });
  },
};
