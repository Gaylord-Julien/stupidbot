import { Command } from './command';
import { Hello } from './commands/hello';
import { Laravel } from './commands/laravel';
import { Nextjs } from './commands/nextjs';

export const Commands: Command[] = [Hello, Nextjs, Laravel];
