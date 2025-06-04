import { AppStateHandler } from './core/AppStateHandler.js';
import { TelegramBot } from './bot/TelegramBot.js';
import { NotificationHandler } from './notifier/NotificationHandler.js';
import { CommandDispatcher } from './commands/CommandDispatcher.js';
import { StartCommand } from './commands/StartCommand.js';
import { StopCommand } from './commands/StopCommand.js';
import { FinishedState } from './states/FinishedState.js';
import { DebugTimerStrategy, NormalTimerStrategy } from './strategies/TimerStrategy.js';
import { PomodoroWorkflowBuilder } from './core/PomodoroWorkflowBuilder.js';

const BOT_TOKEN = process.env.BOT_TOKEN;
const DEBUG = process.env.DEBUG === 'true';

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing in environment variables');
}

const activeStates = new Map<number, AppStateHandler>();
const dispatcher = new CommandDispatcher();
const timerStrategy = DEBUG ? new DebugTimerStrategy() : new NormalTimerStrategy();

function createAppState(chatId: number): AppStateHandler {
  const builder = new PomodoroWorkflowBuilder(timerStrategy);
  return builder
    .setChatId(chatId)
    .setType("infinite")
    .build();
}

dispatcher.register(new StartCommand((chatId: number) => {
  const appState = createAppState(chatId);
  appState.start();
  activeStates.set(chatId, appState);
}));

dispatcher.register(new StopCommand((chatId: number) => {
  const appState = activeStates.get(chatId);
  if (appState) {
    const finishedState = new FinishedState(appState);
    appState.transitionTo(finishedState);
    appState.cleanup();
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
