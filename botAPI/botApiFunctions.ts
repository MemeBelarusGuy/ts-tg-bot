import axios from "axios";
import {bot} from "../index";
import {catQuery, dollarQuery} from "../constants/botButtonsQuery";
import {
    botOptions,
    currencyOptionsEUR,
    currencyOptionsUSD,
} from "../botCommands/buttonOptions";
import dotenv from "dotenv";
import {
    botCommandsMessage,
    currencyApiURL,
    dateFormat,
    findImageApiURL, newsApiURL,
    weatherApiURL,
    weatherMessage
} from "../helpers/APIHelpers";
dotenv.config();

export async function getCommands(chatId:number) {
    await bot.sendMessage(chatId, botCommandsMessage());
}
export async function getWeather(chatId:number, city:string) {
    try {
        const {data} = await axios.get(weatherApiURL(city));
        await bot.sendMessage(chatId, weatherMessage(data));
        return 1;
    } catch (e) {
        await bot.sendMessage(chatId, "🚫Invalid City Name.");
        return 0;
    }
}

export async function getImage(chatId:number, animal:string) {
    if (animal === catQuery) {
        try {
            const {data} = await axios.get(process.env.CAT_API_URL!);
            await bot.sendPhoto(chatId, data[0].url);
        } catch (e) {
            await bot.sendMessage(chatId, "Error Getting Cat Picture.");
        }
    } else {
        try {
            const {data} = await axios.get(process.env.DOG_API_URL!);
            await bot.sendPhoto(chatId, data.message);
        } catch (e) {
            await bot.sendMessage(chatId, "Error Getting Dog Picture.");
        }
    }
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}

export async function getCurrency(chatId:number, currency:string, stayNotified:boolean) {
    const changeSub = stayNotified ? "NO" : "YES";
    const USD = await axios.get(currencyApiURL("USD"))
        .then(res => res.data.conversion_rates.BYN)
    if (currency === dollarQuery) {
        try {
            await bot.sendMessage(chatId, `${dateFormat(new Date())}
1$ = ${USD} BYN`);
            await bot.sendMessage(chatId, "Do You Want To Receive Every 3 Hours Value Of USD?", currencyOptionsUSD(changeSub));
        } catch (e) {
            await bot.sendMessage(chatId, "Error Getting Dollar Currency.");
        }
    } else {
        try {
            const {data} = await axios.get(currencyApiURL("EUR"));
            await bot.sendMessage(chatId, `${dateFormat(new Date())}
1€ = ${Number(USD * data.conversion_rates.USD).toFixed(4)} BYN`);
            await bot.sendMessage(chatId, "Do You Want To Receive Every 3 Hours Value Of EUR?", currencyOptionsEUR(changeSub));
        } catch (e) {
            await bot.sendMessage(chatId, "Error Getting Euro Currency.");
        }
    }
}
export async function getAdvice(chatId:number) {
    try {
        const {data} = await axios.get(process.env.ADVICE_API_URL!);
        await bot.sendMessage(chatId, data.slip.advice);
        await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
    } catch (e) {
        await bot.sendMessage(chatId, "Error Getting Advice.");
    }
}
export async function getJoke(chatId:number) {
    try {
        const {data} = await axios.get(process.env.JOKE_API_URL!, {
            headers: {
                "X-Api-Key": process.env.JOKE_API_KEY
            }
        });
        await bot.sendMessage(chatId, `${data[0].joke}`);
        await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
    } catch (e) {
        await bot.sendMessage(chatId, "Error Getting Joke.");
    }
}
export async function findImage(chatId:number, name:string) {
    try {
        const {data} = await axios.get(findImageApiURL(name),{
            headers: {
                "Authorization": process.env.FIND_IMAGE_API_KEY
            }
        });
        if (!data.total_results) return await bot.sendMessage(chatId, "🚫Nothing Found.")
        const img = Math.floor(Math.random() * (data.total_results < 80 ? data.total_results : 80));
        await bot.sendPhoto(chatId, data.photos[img].src.large, {
            "caption": data.photos[img].alt
        })
    } catch (e) {
        await bot.sendMessage(chatId, "🚫Invalid Photo Title.(Maybe It Consider 18+ Or Bad Scene)");
    }
}
export async function getNews(chatId:number, city:string) {
    try {
        const {data} = await axios.get(newsApiURL(city));
        if (!data.totalResults) return await bot.sendMessage(chatId, "🚫Nothing Found.");
        const num = Math.floor(Math.random() * data.articles.length)
        await bot.sendPhoto(chatId, data.articles[num].urlToImage, {
            "caption": data.articles[num].description
        })
    } catch (e) {
        await bot.sendMessage(chatId, "🚫Invalid Event Title.(Maybe It Consider 18+ Or Bad Scene)");
    }
}
