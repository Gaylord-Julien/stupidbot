import { Client } from 'discord.js';
import * as dotenv from 'dotenv';
import autoAnswer from './listeners/autoAnswer';
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';

dotenv.config();

const token = process.env.BOT_TOKEN;

const client = new Client({
  // can see messages from all guilds
  intents: [
    'Guilds',
    'GuildMessages',
    'GuildMessageReactions',
    'GuildMessageTyping',
    'MessageContent',
  ],
});

ready(client);
interactionCreate(client);
autoAnswer(client);

client.login(token);
