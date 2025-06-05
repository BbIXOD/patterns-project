import { Telegraf } from "telegraf";
import { Subscriber } from "../interfaces/Subscriber.js";
import { BaseEvent } from "../notifier/BaseEvent.js";
import { Context } from "telegraf";
import { SendMessageCommand } from "../message-commands/SendMessageCommand.js";
import { UpdateTimerCommand } from "../message-commands/UpdateTimerCommand.js";
import { MessageQueue } from "../message-commands/MessageQueue.js";

export class TelegramBot implements Subscriber {
  private bot: Telegraf;
  private readonly onMessage: (ctx: Context) => void;
  private timerIds: Map<number, number> = new Map();
  private messageQueue: MessageQueue = new MessageQueue();

  constructor(token: string, onMessage: (ctx: Context) => void) {
    this.bot = new Telegraf(token);
    this.onMessage = onMessage;
    this.bot.on('message', (ctx) => this.onMessage(ctx));

    this.bot.launch().then(() => {
      console.log('Bot is running...');
    })

    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }

  notify(event: BaseEvent): void {
    if (event.type === 'sendMessage') {
      const command = new SendMessageCommand(
        this.bot,
        event.data.chat.id,
        event.data.text,
        this.timerIds
      );
      this.messageQueue.enqueue(command);
    }
    else if (event.type === 'updateTimer') {
      const command = new UpdateTimerCommand(
        this.bot,
        event.data.chat.id,
        event.data.text,
        this.timerIds
      );
      this.messageQueue.enqueue(command);
    }
  }
}
