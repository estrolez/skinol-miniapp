const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const firstName = ctx.from.first_name || 'Игрок';
  
  const message = `👋 *Привет, ${firstName}!* Добро пожаловать в **SKINOL**!\n\n🎁 Здесь ты можешь открывать кейсы CS2, выбивать редкие скины, выполнять задания и получать бонусы!\n\nЖми кнопку ниже, чтобы запустить приложение:`;

  return ctx.replyWithMarkdown(message, 
    Markup.inlineKeyboard([
      [Markup.button.webApp('🎁 Запустить SKINOL', 'https://skinol-miniapp.vercel.app/')]
    ])
  );
});

bot.on('text', (ctx) => {
  ctx.reply('Чтобы открыть кейсы и инвентарь, нажми кнопку «Open SKINOL» внизу слева или кнопку в меню! 🚀');
});

module.exports = async (req, res) => {
  try {
    if (req.method === 'POST') {
      await bot.handleUpdate(req.body);
      res.status(200).send('OK');
    } else {
      res.status(200).send('Skinol Bot Webhook Active');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};
