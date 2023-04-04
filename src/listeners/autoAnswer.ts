// This file listens for new messages and auto-responds to certain keywords

// src/listeners/autoAnswer.ts

import { Client } from 'discord.js';

const includes = (msg: string, keywords: string[]): boolean => {
  for (const keyword of keywords) {
    if (msg.includes(keyword) && !msg.includes(`!${keyword}`)) {
      return true;
    }
  }
  return false;
};

export default function autoAnswer(client: Client): void {
  client.on('messageCreate', (msg) => {
    const lowerCaseMsg = msg.content.toLowerCase();

    if (msg.author.bot) return;

    const wordpressKeywords = ['wordpress', 'wp'];

    if (includes(lowerCaseMsg, wordpressKeywords)) {
      msg.reply("Beurk, WordPress c'est caca !");
      msg.react('💩');
    }

    const variousWords = ['emma', 'react'];

    if (includes(lowerCaseMsg, variousWords)) {
      msg.react('❤️');
    }
  });
}
