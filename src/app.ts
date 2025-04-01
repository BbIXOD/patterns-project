
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';



const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing in environment variables');
}

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome! Send me any message, and I will echo it back.'));
bot.on(message('text'), (ctx) => ctx.reply(ctx.message.text));

bot.launch().then(() => {
  console.log('Bot is running...');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
