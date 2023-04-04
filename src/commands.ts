import { Command } from './command';
import { Laravel } from './commands/laravel';
import { Leaderboard } from './commands/leaderboard';
import { Nextjs } from './commands/nextjs';
import { Source } from './commands/source';

export const Commands: Command[] = [Source, Nextjs, Laravel, Leaderboard];
