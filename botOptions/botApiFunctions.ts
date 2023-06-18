import axios from "axios";
import {bot} from "../index.ts";
import {catQ, dollarQ} from "../constants/botButtonsQuery.ts";
import {
    botOptions,
    currencyOptionsEUR,
    currencyOptionsUSD,
} from "./buttonOptions";
import dotenv from "dotenv";
dotenv.config();
export async function getCommands(chatId:number) {
    //bot send list of commands
    await bot.sendMessage(chatId, `MemeBot Commands:
                
/start - Start Chatting.
/help - Get Bot Commands.🆘

/mytasks - Get User Tasks.📝

/image - Find Image.🔍
/dog - Get Dog Picture.🐩
/cat - Get Cat Picture.🐈

/news - Get City News.📰
/weather - Get Weather Information.☁️

/dollar - Get Dollar Currency.$
/euro - Get Euro Currency.€

/advice - Get Daily Advice.📖
/joke - Get Daily Joke.😛`);
}
export async function getWeather(chatId:number, city:string) {
    try {
        let {data} = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${process.env.WEATHER_API_KEY}&contentType=json`);
        await bot.sendMessage(chatId, `Weather At : ${data.resolvedAddress}
${data.description}
MaxTemp : ${transpCelcius(data.days[0].tempmax)}°C
MinTemp : ${transpCelcius(data.days[0].tempmin)}°C
Average Temp: ${transpCelcius(data.days[0].temp)}°C
Snow : ${data.days[0].snow} mm 🌨
Sunrise At : ${data.days[0].sunrise} ☀
Sunset At : ${data.days[0].sunset}  🌅
Average Wind : ${data.days[0].windspeed} m/s 💨`);
        return 1;
    } catch (e) {
        await bot.sendMessage(chatId, "🚫Invalid City Name.");
        return 0;
    }
}
function transpCelcius(deg:number) {
    return ((deg - 32) * 5 / 9).toFixed(1);
}
export function validWordInput(text:string){
    return /^[a-zA-Z]+$/.test(text)
}
export function validImageTitleInput(text:string){
    return /^[a-zA-Z0-9]+$/.test(text)
}
export async function getImage(chatId:number, animal:string) {
    if (animal === catQ) {
        try {
            let {data} = await axios.get(' https://api.thecatapi.com/v1/images/search');
            await bot.sendPhoto(chatId, data[0].url);
        } catch (e) {
            await bot.sendMessage(chatId, "Error Getting Cat Picture.");
        }
    } else {
        try {
            let {data} = await axios.get("https://dog.ceo/api/breeds/image/random");
            await bot.sendPhoto(chatId, data.message);
        } catch (e) {
            await bot.sendMessage(chatId, "Error Getting Dog Picture.");
        }
    }
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}
export async function getCurrency(chatId:number, currency:string, stayNotified:boolean) {
    const status = stayNotified ? "NO" : "YES";
    let USD = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/USD`)
        .then(res => res.data.conversion_rates.BYN)
    if (currency === dollarQ) {
        try {
            await bot.sendMessage(chatId, `${dateFormat(new Date())}
1$ = ${USD} BYN`);
            await bot.sendMessage(chatId, "Do You Want To Receive Every 3 Hours Value Of USD?", currencyOptionsUSD(status));
        } catch (e) {
            await bot.sendMessage(chatId, "Error Getting Dollar Currency.");
        }
    } else {
        try {
            const {data} = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/EUR`);
            await bot.sendMessage(chatId, `${dateFormat(new Date())}
1€ = ${Number(USD * data.conversion_rates.USD).toFixed(4)} BYN`);
            await bot.sendMessage(chatId, "Do You Want To Receive Every 3 Hours Value Of EUR?", currencyOptionsEUR(status));
        } catch (e) {
            await bot.sendMessage(chatId, "Error Getting Euro Currency.");
        }
    }
}
export function dateFormat(date:Date) {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
export async function getAdvice(chatId:number) {
    try {
        const {data} = await axios.get("https://api.adviceslip.com/advice");
        await bot.sendMessage(chatId, data.slip.advice);
        await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
    } catch (e) {
        await bot.sendMessage(chatId, "Error Getting Advice.");
    }
}
export async function getJoke(chatId:number) {
    try {
        const config = {
            headers: {
                "X-Api-Key": process.env.JOKE_API_KEY
            }
        };
        const {data} = await axios.get("https://api.api-ninjas.com/v1/jokes", config);
        await bot.sendMessage(chatId, `${data[0].joke}`);
        await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
    } catch (e) {
        await bot.sendMessage(chatId, "Error Getting Joke.");
    }
}
export async function findImage(chatId:number, name:string) {
    try {
        const config = {
            headers: {
                "Authorization": process.env.FIND_IMAGE_API_KEY
            }
        }
        const {data} = await axios.get(`https://api.pexels.com/v1/search?query=${name}&per_page=80`, config);
        if (data.total_results === 0) return await bot.sendMessage(chatId, "🚫Nothing Found.")
        let img = Math.floor(Math.random() * (data.total_results < 80 ? data.total_results : 80));
        await bot.sendPhoto(chatId, data.photos[img].src.large, {
            "caption": data.photos[img].alt
        })
    } catch (e) {
        await bot.sendMessage(chatId, "🚫Invalid Photo Title.(Maybe It Consider 18+ Or Bad Scene)");
    }
}
export async function getNews(chatId:number, text:string) {
    try {
        const {data} = await axios.get(`https://newsapi.org/v2/everything?q=${text}&apiKey=${process.env.NEWS_API_KEY}&language=en`);
        if (!data.totalResults) return await bot.sendMessage(chatId, "🚫Nothing Found.");
        let num = Math.floor(Math.random() * data.articles.length)
        await bot.sendPhoto(chatId, data.articles[num].urlToImage, {
            "caption": data.articles[num].description
        })
    } catch (e) {
        await bot.sendMessage(chatId, "🚫Invalid Event Title.(Maybe It Consider 18+ Or Bad Scene)");
    }
}
