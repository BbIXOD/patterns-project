import { AppStateHandler } from './core/AppStateHandler.js';
import { WorkState } from './states/WorkState.js';
import { TelegramBot } from './bot/TelegramBot.js';
import { NotificationHandler } from './notifier/NotificationHandler.js';



const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing in environment variables');
}

const states = [];
const bot = new TelegramBot(BOT_TOKEN, (ctx) => {
  ctx.sendMessage('Hello! I am your pomodoro timer.');

  const appState = new AppStateHandler();
  appState.chatId = ctx.message!.chat.id;
  states.push(appState);

  const workState = new WorkState(appState);
  workState.nextState = workState;
  appState.transitionTo(workState);

});
NotificationHandler.instance.subscribe(bot);
