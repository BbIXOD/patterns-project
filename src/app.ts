import { AppStateHandler } from './core/AppStateHandler.js';
import { WorkState } from './states/WorkState.js';
import { TelegramBot } from './bot/TelegramBot.js';
import { NotificationHandler } from './notifier/NotificationHandler.js';
import { CommandDispatcher } from './commands/CommandDispatcher.js';
import { Command } from './commands/Command.js';
import { StartCommand } from './commands/StartCommand.js';
import { StopCommand } from './commands/StopCommand.js';
import { finished } from 'stream';
import { FinishedState } from './states/FinishedState.js';

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing in environment variables');
}

const activeStates = new Map<number, AppStateHandler>();
const dispatcher = new CommandDispatcher();

dispatcher.register(new StartCommand((chatId: number) => {
  const appState = new AppStateHandler();
  appState.chatId = chatId;
  const workState = new WorkState(appState);
  appState.transitionTo(workState);
  activeStates.set(chatId, appState);
}));

dispatcher.register(new StopCommand((chatId: number) => {
  const appState = activeStates.get(chatId);
  if (appState) {
    appState.transitionTo(new FinishedState(appState));
    activeStates.delete(chatId);
  }
}));

const bot = new TelegramBot(BOT_TOKEN, async (ctx) => {
  const commandText = (ctx.message && 'text' in ctx.message) ? ctx.message.text : '';
  if (commandText && ctx.message) {
    await dispatcher.dispatch(commandText, ctx.message.chat.id);
  }
});
NotificationHandler.instance.subscribe(bot);
