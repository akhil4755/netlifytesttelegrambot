// exports.handler = async function(event, context) {

//     return {
//         statusCode : 200,
//         body : JSON.stringify({"message":"Helloo"})
//     }

// }

require('dotenv').config();
const { Telegraf } = require('telegraf')

// const sortFunction  = require ('./util/sort');

const bot = new Telegraf(process.env.BOT_TOKEN)

let welcomeMessage = "Hi there!";
let helpMessage = "cry";

bot.start((ctx) => ctx.reply(welcomeMessage))
bot.help((ctx) => ctx.reply(helpMessage))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears('hi', (reply)=>reply.reply('👍'))

exports.handler = async function(event, context) {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode : 200, body : JSON.stringify({"message":"successs"}) }
}