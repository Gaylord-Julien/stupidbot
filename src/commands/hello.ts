import { Client, BaseInteraction } from "discord.js";
import { Command } from "../command";

export const Hello: Command = {
  name: "hello",
  description: "Say hello to the bot",
  run: async (client: Client, interaction: BaseInteraction) => {
    if (!interaction.isCommand()) {
      return;
    }
    await interaction.reply("Hello!");
  },
};
