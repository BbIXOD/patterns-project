import { Command } from "./Command.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";

export class HelpCommand implements Command {
  canHandle(command: string): boolean {
    return command === "/help" || command === "/h";
  }

  async execute(chatId: number): Promise<void> {
    const helpText = `
🤖 **Bot Commands:**

📋 **Basic Commands:**
• /start - Start the bot
• /help or /h - Show this help message

🎯 **Workflow Commands:**
• /begin <type> - Start a new workflow session
  - Available types: pomodoro, work, study
  - Example: /begin pomodoro

⏯️ **Control Commands:**
• /pause - Pause the current session
• /play - Resume the paused session
• /stop - Stop and finish the current session

📊 **Usage Examples:**
1. /start - Initialize the bot
2. /begin pomodoro - Start a Pomodoro session
3. /pause - Take a break
4. /play - Continue working
5. /stop - End the session

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
