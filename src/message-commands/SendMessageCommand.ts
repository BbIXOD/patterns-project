import { Telegraf } from "telegraf";
import { MessageCommand } from "./MessageCommand.js";

export class SendMessageCommand implements MessageCommand {
  constructor(
    private bot: Telegraf,
    private chatId: number,
    private text: string,
    private timerIds: Map<number, number>
  ) {}

  async execute(): Promise<void> {
    await this.bot.telegram.sendMessage(this.chatId, this.text);
    this.timerIds.delete(this.chatId);
  }
}
