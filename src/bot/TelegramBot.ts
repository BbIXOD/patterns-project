import { Telegraf } from "telegraf";
import { Message } from "telegraf/types"
import { Subscriber } from "../interfaces/Subscriber.js";
import { BaseEvent } from "../notifier/BaseEvent.js";
import { Context } from "telegraf";

export class TelegramBot implements Subscriber {
  private bot: Telegraf;
  private readonly onMessage: (ctx: Context) => void;
  private timerIds: Map<number, number> = new Map();

  constructor(token: string, onMessage: (ctx: Context) => void) {
    this.bot = new Telegraf(token);
    this.onMessage = onMessage;
    this.bot.start((ctx) => this.onMessage(ctx));
    this.bot.help((ctx) => this.onMessage(ctx));
    this.bot.command('stop', (ctx) => this.onMessage(ctx));

    this.bot.launch().then(() => {
      console.log('Bot is running...');
    })

    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }

  notify(event: BaseEvent): void {
    if (event.type === 'sendMessage') {
      this.bot.telegram.sendMessage(event.data.chat.id, event.data.text);
      this.timerIds.delete(event.data.chat.id);
    }
    else if (event.type === 'updateTimer') {
      if (this.timerIds.has(event.data.chat.id)) {
        this.bot.telegram.editMessageText(event.data.chat.id, this.timerIds.get(event.data.chat.id)!, undefined, event.data.text);
      } else {
        this.bot.telegram.sendMessage(event.data.chat.id, event.data.text).then((message) => {
          this.timerIds.set(event.data.chat.id, message.message_id);
        });
      }
    }
  }
}
