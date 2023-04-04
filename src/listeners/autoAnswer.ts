// src/listeners/autoAnswer.ts

import { Client } from 'discord.js';
import sqlite3 from 'sqlite3';

export type KeywordCount = { [key: string]: number };

const includes = (msg: string, keywords: string[]): boolean => {
  for (const keyword of keywords) {
    if (msg.includes(keyword) && !msg.includes(`!${keyword}`)) {
      return true;
    }
  }
  return false;
};

export default function autoAnswer(client: Client): void {
  const db = new sqlite3.Database('./data/keyword_counts.db');

  // Create the "counts" table if it doesn't already exist
  db.run(`
    CREATE TABLE IF NOT EXISTS counts (
      username TEXT NOT NULL,
      keyword TEXT NOT NULL,
      count INTEGER DEFAULT 0,
      PRIMARY KEY (username, keyword)
    )
  `);

  client.on('messageCreate', (msg) => {
    const lowerCaseMsg = msg.content.toLowerCase();

    if (msg.author.bot) return;

    const wordpressKeywords = ['wordpress', 'wp'];

    if (includes(lowerCaseMsg, wordpressKeywords)) {
      // Get the current count for this user and keyword
      db.get(
        'SELECT count FROM counts WHERE username = ? AND keyword = ?',
        [msg.author.username, 'wordpress'],
        (err, row: KeywordCount) => {
          if (err) {
            console.error(err);
            return;
          }

          // Update the count in the database
          const count = row ? row.count + 1 : 1;
          db.run(
            'INSERT OR REPLACE INTO counts (username, keyword, count) VALUES (?, ?, ?)',
            [msg.author.username, 'wordpress', count],
            (err) => {
              if (err) {
                console.error(err);
                return;
              }

              console.log(`${msg.author.username} has said "wordpress" ${count} times.`);
            }
          );
        }
      );

      msg.reply("Beurk, WordPress c'est caca !");
      msg.react('💩');
    }

    const variousWords = ['emma', 'react'];

    if (includes(lowerCaseMsg, variousWords)) {
      msg.react('❤️');
    }

    // if user writes "bon robot" to the bot, it will reply "bon humain"
    if (lowerCaseMsg === 'bon robot') {
      msg.reply('Bon humain');
    }
  });
}
