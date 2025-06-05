import { Command } from './Command.js';

export class CommandDispatcher {
  private commands: Command[] = [];

  register(command: Command): void {
    this.commands.push(command);
  }

  async dispatch(commandText: string, chatId: number): Promise<void> {
    const command = this.commands.find(cmd => cmd.canHandle(commandText));
    if (command) {
      await command.execute(chatId, commandText);
    }
  }
}
