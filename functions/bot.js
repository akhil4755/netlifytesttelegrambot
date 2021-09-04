const sortFunction  = require ('./util/sort');
const { Telegraf } = require('telegraf')
require('dotenv').config();
const https = require('https')

const bot = new Telegraf(process.env.BOT_TOKEN)

let welcomeMessage = "Hi there!";
let helpMessage = "cry";

bot.start((ctx) => ctx.reply(welcomeMessage))
bot.help((ctx) => ctx.reply(helpMessage))
bot.on('sticker', (ctx) => ctx.reply('hi there'))

bot.hears('hi', (reply)=>reply.reply('hello'))

bot.hears(/New (.+)/ , (ctx) =>
{ 
    let user_id = ctx.from.id;
    let message = ctx.match[0];

    let retData = sortFunction.sortFunction(message)

    try
    {
        if( retData.Amount !== 0 )
        {
            const url = `${process.env.GOOGLE_SHEET_URL}?Year=${encodeURIComponent(retData.Year)}&Month=${encodeURIComponent(retData.Month)}&Date=${encodeURIComponent(retData.Date)}&Title=${encodeURIComponent(retData.Title)}&Amount=${encodeURIComponent(retData.Amount)}&Category=${encodeURIComponent(retData.Category)}&Direction=${encodeURIComponent(retData.Direction)}`

            https.get(url, (res) => {
                ctx.reply('added !')
            }).on('error', (e) => {
                ctx.reply('couldnt insert this entry : ' + JSON.stringify(retData) )
                ctx.reply('because : ' + e )
            })
        }
        else
        {
            ctx.reply('Oh no! Please check /help before trying again or add some money')
        }
    }
    catch
    {
        ctx.reply('Oh no! Please check /help before trying again')
    }
})

exports.handler = async function(event, context) {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode : 200, body : JSON.stringify({"message":"successs"}) }
}