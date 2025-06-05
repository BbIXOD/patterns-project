import { Command } from "./Command.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";
import { UserDataCollector } from "../data/UserDataCollector.js";

export class HelpCommand implements Command {
  canHandle(command: string): boolean {
    return command === "/help" || command === "/h";
  }

  async execute(chatId: number): Promise<void> {
    await UserDataCollector.getInstance().collectUserData(
      chatId,
      "/help",
      false,
      { commandType: "help" }
    );

    const helpText = `
🤖 **Bot Commands:**

📋 **Basic Commands:**
• /start - Start the bot
• /help or /h - Show this help message

🎯 **Workflow Commands:**
• /begin <type> - Start a new workflow session
  - Available types: classic, infinite
  - Example: /begin classic

⏯️ **Control Commands:**
• /pause - Pause the current session
• /play - Resume the paused session
• /stop - Stop and finish the current session

📊 **Data & Analytics:**
• /stats - View your productivity statistics
• /summary - Get session summary
• /export - Export your data

📊 **Usage Examples:**
1. /start - Initialize the bot
2. /begin classic - Start a Classic Pomodoro session
3. /pause - Take a break
4. /play - Continue working
5. /stop - End the session
6. /stats - Check your productivity stats

💡 **Tips:**
- Use /begin to start productive work sessions
- Use /pause and /play to control your workflow
- Use /stop when you're done for the day
    `.trim();

    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: chatId },
        text: helpText
      }
    });
  }
}
