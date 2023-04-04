// this is a listener file, it should listen to all new messages and check if it should auto answer
// if it should, it should answer it without discord-akairo

// src/listeners/autoAnswer.ts

import { Client } from 'discord.js';
export default (client: Client): void => {
  client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    if (
      msg.content.toLowerCase().includes('wordpress') ||
      msg.content.toLowerCase().includes('wp')
    ) {
      msg.reply("Beurk, WordPress c'est caca!");
      // add a reaction to the message (:poop:)
      msg.react('💩');
    }
    if (msg.content.toLowerCase().includes('emma') || msg.content.toLowerCase().includes('react')) {
      // add a reaction to the message (heart)
      msg.react('❤️');
    }
  });
};
