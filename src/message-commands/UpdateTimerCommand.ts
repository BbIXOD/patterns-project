import { Telegraf } from "telegraf";
import { MessageCommand } from "./MessageCommand.js";

export class UpdateTimerCommand implements MessageCommand {
  constructor(
    private bot: Telegraf,
    private chatId: number,
    private text: string,
    private timerIds: Map<number, number>
  ) {}

  async execute(): Promise<void> {
    if (this.timerIds.has(this.chatId)) {
      await this.bot.telegram.editMessageText(
        this.chatId, 
        this.timerIds.get(this.chatId)!, 
        undefined, 
        this.text
      );
    } else {
      const message = await this.bot.telegram.sendMessage(this.chatId, this.text);
      this.timerIds.set(this.chatId, message.message_id);
    }
  }
}
