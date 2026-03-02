import { Command } from 'commander';
const program = new Command();

program
  .name('hydroponics')
  .description('Terminal for hydroponics')
  .version('1.0.0');

program.parse();