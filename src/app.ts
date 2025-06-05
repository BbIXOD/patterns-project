import { AppStateHandler } from './core/AppStateHandler.js';
import { TelegramBot } from './bot/TelegramBot.js';
import { NotificationHandler } from './notifier/NotificationHandler.js';
import { CommandDispatcher } from './commands/CommandDispatcher.js';
import { StartCommand } from './commands/StartCommand.js';
import { StopCommand } from './commands/StopCommand.js';
import { BeginCommand } from './commands/BeginCommand.js';
import { PauseCommand } from './commands/PauseCommand.js';
import { PlayCommand } from './commands/PlayCommand.js';
import { HelpCommand } from './commands/HelpCommand.js';
import { NormalTimerStrategy } from './strategies/NormalTimerStrategy.js';
import { DebugTimerStrategy } from './strategies/DebugTimerStrategy.js';

const BOT_TOKEN = process.env.BOT_TOKEN;
const DEBUG = process.env.DEBUG === 'true';

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing in environment variables');
}

const activeStates = new Map<number, AppStateHandler>();
const dispatcher = new CommandDispatcher();
const timerStrategy = DEBUG ? new DebugTimerStrategy() : new NormalTimerStrategy();

dispatcher.register(new StartCommand());
dispatcher.register(new BeginCommand(activeStates, timerStrategy));
dispatcher.register(new PauseCommand(activeStates));
dispatcher.register(new PlayCommand(activeStates));
dispatcher.register(new StopCommand(activeStates));
dispatcher.register(new HelpCommand());

const bot = new TelegramBot(BOT_TOKEN, async (ctx) => {
  const commandText = (ctx.message && 'text' in ctx.message) ? ctx.message.text : '';
  if (commandText && ctx.message) {
    await dispatcher.dispatch(commandText, ctx.message.chat.id);
  }
});
NotificationHandler.instance.subscribe(bot);
