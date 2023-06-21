import {bot} from "../index";
import {
    botOptions,
    taskOptionsEmpty,
    taskOptionsExist,
    weatherOptionsEmpty,
    weatherOptionsExist
} from "../botCommands/buttonOptions";
import {getCurrency, getWeather} from "../botAPI/botApiFunctions";
import {addCurrencyNotify, deleteCurrencyNotify, getUserNotifications} from "../databaseRequests/userController";
import {dollarQuery, euroQuery} from "../constants/botButtonsQuery";
import {ITask} from "../Types/task";
import {minute, morningWeatherNotification, twoHoursInMins} from "../constants/functionNumbers";
import {dateFormat} from "./APIHelpers";
import {getUserTasks} from "../databaseRequests/taskController";

export async function getTasks(chatId: number, tasks: Array<ITask>) {
    if (tasks.length) {
        let string = "Your Tasks:\n";
        for (let i = 0; i < tasks.length; i++) {
            string += `${i + 1}. ${tasks[i].title}\n`;
            string += `Finish At : ${dateFormat(new Date(tasks[i].finishAt))}\n`;
            string += `Done : ${tasks[i].done ? '✅' : '❌'}\n`;
        }
        await bot.sendMessage(chatId, string, taskOptionsExist);
    } else {
        await bot.sendMessage(chatId, "You have 0 tasks to do.", taskOptionsEmpty);
    }
}

export async function getUserWeather(chatId: number, weather: Array<string>) {
    if (weather.length) {
        let string = "Your List Of Cities Notification:\n";
        for (let i = 0; i < weather.length; i++) {
            string += `${i + 1}. ${weather[i]}.\n`
        }
        await bot.sendMessage(chatId, string, weatherOptionsExist);
    } else await bot.sendMessage(chatId, "You Haven't Added Any Cities To Get Notify About Yet.", weatherOptionsEmpty);
}

export async function weatherNotification(chatId: number, weather: Array<string>) {
    if (new Date().getHours() === morningWeatherNotification) {
        for (let key of weather) {
            await getWeather(chatId, key);
        }
    }
}

export async function weatherIntervalNotification(chatId: number, username: string) {
    const weatherNotifications = await getUserNotifications(username)
        .then(res => res!.weather);
    if (weatherNotifications.length) {
        await weatherNotification(chatId, weatherNotifications);
    }
}

export async function taskNotification(chatId: number, tasks: Array<ITask>) {
    let status = false;
    let minsLeft;
    for (let i = 0; i < tasks.length; i++) {
        minsLeft = Math.floor((tasks[i].finishAt - Date.now()) / minute)
        if (!tasks[i].done) {
            if (minsLeft === twoHoursInMins || minsLeft === 0) {
                await bot.sendMessage(chatId, `${minsLeft === 120 ? 2 : 0} Hours Left To Finish Task!`);
                status = true;
                break;
            }
        }
    }
    if (status) await getTasks(chatId, tasks);
}

export async function taskIntervalNotification(chatId: number, username: string) {
    const tasks = await getUserTasks(username);
    if (tasks.length) {
        await taskNotification(chatId, tasks);
    }
}


export async function currencyNotification(chatId: number, currency: Array<string>) {
    if (new Date().getHours() % 3 === 0) {
        for (let key of currency) {
            await getCurrency(chatId, key, true);
        }
    }
}

export async function subscribeCurrency(currency: string, username: string, chatId: number, isSubbed: boolean) {
    if (currency === dollarQuery) {
        if (isSubbed) {
            await deleteCurrencyNotify(username, dollarQuery);
            await bot.sendMessage(chatId, "USD Deleted.");
            await bot.sendMessage(chatId, "MemeBot Options:", botOptions);
        } else {
            await addCurrencyNotify(username, dollarQuery);
            await bot.sendMessage(chatId, "USD Added.");
            await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
        }
    } else {
        if (isSubbed) {
            await deleteCurrencyNotify(username, euroQuery);
            await bot.sendMessage(chatId, "EUR Deleted.");
            await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
        } else {
            await addCurrencyNotify(username, euroQuery);
            await bot.sendMessage(chatId, "EUR Added.");
            await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
        }
    }
}
export async function currencyIntervalNotification(chatId:number,username:string){
    const currencyNotifications = await getUserNotifications(username)
        .then(res => res!.currency);
    if (currencyNotifications.length) {
        await currencyNotification(chatId, currencyNotifications);
    }
}