import { Command } from "./Command.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";
import { UserDataCollector } from "../data/UserDataCollector.js";

export class StartCommand implements Command {
  canHandle(command: string): boolean {
    return command === "/start";
  }

  async execute(chatId: number): Promise<void> {
    await UserDataCollector.getInstance().collectUserData(
      chatId,
      "/start",
      false,
      { commandType: "start" }
    );

    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: chatId },
        text: '🤖 Bot started! Welcome to Pomodoro Timer!\n\n' +
              'Available commands:\n' +
              '• /begin <type> - Start a workflow (classic or infinite)\n' +
              '• /pause - Pause current session\n' +
              '• /play - Resume paused session\n' +
              '• /stop - Finish current sprint\n\n' +
              'Example: /begin classic'
      }
    });
  }
}
