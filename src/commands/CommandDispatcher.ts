import { Command } from "./Command.js";

export class CommandDispatcher {
  private commands: Command[] = [];

  register(command: Command) {
    this.commands.push(command);
  }

  async dispatch(commandText: string, ctx: any) {
    for (const command of this.commands) {
      if (command.canHandle(commandText)) {
        await command.execute(ctx);
        return;
      }
    }
    ctx.sendMessage("Unknown command.");
  }
}
