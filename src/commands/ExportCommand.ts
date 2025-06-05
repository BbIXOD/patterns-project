import { Command } from "./Command.js";
import { AppStateHandler } from "../core/AppStateHandler.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";
import { UserDataCollector } from "../data/UserDataCollector.js";

export class ExportCommand implements Command {
  private activeStates: Map<number, AppStateHandler>;

  constructor(activeStates: Map<number, AppStateHandler>) {
    this.activeStates = activeStates;
  }

  canHandle(command: string): boolean {
    return command === "/export";
  }

  async execute(chatId: number): Promise<void> {
    const appState = this.activeStates.get(chatId);
    
    await UserDataCollector.getInstance().collectUserData(
      chatId,
      "/export",
      appState !== undefined,
      { 
        commandType: "export",
        hasActiveSession: appState !== undefined
      }
    );

    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: chatId },
        text: '📤 Export functionality is coming soon!\n\nThis will allow you to:\n• Export session data to CSV\n• Generate productivity reports\n• Download time tracking logs\n• Share your achievements'
      }
    });
  }
}