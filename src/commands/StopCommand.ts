import { Command } from "./Command.js";

export class StopCommand implements Command {
  private action: (chatId: number) => void;

  constructor(action: (chatId: number) => void) {
    this.action = action;
  }

  canHandle(command: string): boolean {
    return command === "/stop";
  }

  async execute(chatId: number): Promise<void> {
    this.action(chatId);
  }
}
