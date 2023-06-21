import TelegramApi from 'node-telegram-bot-api'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { getUserTasks } from "./databaseRequests/taskController";
import {
    adviceCommand, catCommand, dogCommand, dollarCommand, euroCommand, helpCommand,
    imageCommand, jokeCommand, mytasksCommand, newsCommand, startCommand, weatherCommand
} from "./constants/botCommands";
import {
    addCityInput, changeTaskPropInput, changeTaskTimeInput, changeTaskTitleInput, deleteCityInput,
    deleteTaskInput, editTaskInput, findCityInput, hoursInput, imageInput, newsInput, titleInput
} from "./constants/userInputCommands";
import {
    addCityQuery, adviceQuery, catQuery, createTaskQuery, deleteCityQuery, deleteTaskQuery, dogQuery, dollarNoQuery, dollarQuery,
    dollarYesQuery, editTaskQuery, euroNoQuery, euroQuery, euroYesQuery, findCityQuery, helpQuery, jokeQuery, newsQuery, searchQuery,
    tasksQuery, weatherQuery
} from "./constants/botButtonsQuery";
import { getAdvice, getCommands, getImage, getJoke } from "./botAPI/botApiFunctions";
import {
    currencyIntervalNotification, subscribeCurrency, taskIntervalNotification,
    weatherIntervalNotification
} from "./helpers/userNotifications";
import {
    botAddCityCommand, botChangeTaskTime, botChangeTaskTitle, botCreateTaskCommand, botCurrencyCommand,
    botDeleteCityCommand, botDeleteCityQuery, botDeleteTaskCommand, botDeleteTaskQuery, botEditTaskPropCommand,
    botFindCityCommand, botFindImageCommand, botInvalidInput, botMyTasksCommand, botNewsCommand,
    botStartCommand,
    botWeatherCommand
} from "./botCommands/botCommands";
import { hour, minute } from "./constants/functionNumbers";

dotenv.config();
export const bot = new TelegramApi(process.env.TOKEN!, { polling: true });
mongoose.connect(process.env.DB_URL!)
    .then(() => {
        console.log("connected to mongoDB")
    })
    .catch((err) => {
        console.log(err)
    })


bot.setMyCommands([
    { command: startCommand, description: "Start Chatting." },
    { command: helpCommand, description: "Get Bot Commands." },
    { command: weatherCommand, description: "Get Weather Information." },
    { command: catCommand, description: "Get Cat Picture." },
    { command: dogCommand, description: "Get Dog Picture." },
    { command: dollarCommand, description: "Get Dollar Value." },
    { command: euroCommand, description: "Get Euro Value." },
    { command: adviceCommand, description: "Get Daily Advice." },
    { command: jokeCommand, description: "Get Daily Joke." },
    { command: imageCommand, description: "Find Images." },
    { command: newsCommand, description: "Get City News." },
    { command: mytasksCommand, description: "Get User Tasks." },
])


const start = async () => {
    let command: string = "";
    let username = "";

    let taskNumber: number;
    let title: string;

    let taskNotify: null | ReturnType<typeof setInterval> = null;
    let weatherNotify: null | ReturnType<typeof setInterval> = null;
    let currencyNotify: null | ReturnType<typeof setInterval> = null;

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (msg.chat.username) username = msg.chat.username;
        if (!taskNotify) {
            taskNotify = setInterval(async () => {
                await taskIntervalNotification(chatId, username)
            }, minute)
        }
        if (!weatherNotify) {
            weatherNotify = setInterval(async () => {
                await weatherIntervalNotification(chatId, username)
            }, hour)
        }
        if (!currencyNotify) {
            currencyNotify = setInterval(async () => {
                await currencyIntervalNotification(chatId, username)
            }, hour)
        }
        if (text === startCommand && !command) {
            await botStartCommand(chatId, username)
        } else if (text === helpCommand && !command) {
            await getCommands(chatId);
        } else if (text === weatherCommand && !command) {
            await botWeatherCommand(chatId, username)
        } else if (text && command === addCityInput) {
            await botAddCityCommand(chatId, username, text);
            command = "";
        } else if (text && command === findCityInput) {
            await botFindCityCommand(chatId, text)
            command = "";
        } else if (text && command === deleteCityInput) {
            await botDeleteCityCommand(chatId, username, text);
            command = "";
        } else if (text === catCommand && !command) {
            await getImage(chatId, catQuery);
        } else if (text === dogCommand && !command) {
            await getImage(chatId, dogQuery);
        } else if (text === dollarCommand && !command) {
            await botCurrencyCommand(chatId, username, dollarQuery)
        } else if (text === euroCommand && !command) {
            await botCurrencyCommand(chatId, username, euroQuery)
        } else if (text === adviceCommand && !command) {
            await getAdvice(chatId);
        } else if (text === jokeCommand && !command) {
            await getJoke(chatId);
        } else if (text === imageCommand && !command) {
            await bot.sendMessage(chatId, "Write Photo Title.");
            command = imageInput;
        } else if (text && command === imageInput) {
            await botFindImageCommand(chatId, text);
            command = "";
        } else if (text === newsCommand && !command) {
            await bot.sendMessage(chatId, "Write Word U Would Like To Know News About.");
            command = newsInput
        } else if (text && command === newsInput) {
            await botNewsCommand(chatId, text);
            command = "";
        } else if (text && command === titleInput) {
            await bot.sendMessage(chatId, "Write Count Of Hours You Need To Achieve Task Since Now.");
            title = text;
            command = hoursInput;
        } else if (text && command === hoursInput) {
            await botCreateTaskCommand(chatId, username, text, title)
            command = "";
        } else if (text === mytasksCommand && !command) {
            await botMyTasksCommand(chatId, username)
        } else if (text && command === editTaskInput) {
            const tasks = await getUserTasks(username);
            if (isFinite(Number(text)) && Number(text) <= tasks.length && Number(text) > 0 && Number(text) % 1 === 0) {
                await bot.sendMessage(chatId, "1.Change Task Title.\n2.Change Task Finish Time.\n3.Change Task Status.");
                taskNumber = Number(text);
                command = changeTaskPropInput;
            } else {
                await botInvalidInput(chatId);
                command = "";
            }
        } else if (text && command === deleteTaskInput) {
            await botDeleteTaskCommand(chatId, username, text);
            command = "";
        } else if (text && command === changeTaskPropInput) {
            command = await botEditTaskPropCommand(chatId, username, text, taskNumber)
        } else if (text && command === changeTaskTitleInput) {
            await botChangeTaskTitle(chatId, username, taskNumber, text);
            command = "";
        } else if (text && command === changeTaskTimeInput) {
            await botChangeTaskTime(chatId, username, text, taskNumber);
            command = "";
        } else {
            await botInvalidInput(chatId);
        }
    }
    )
    bot.on('callback_query', async msg => {
        if (msg.from.username != null) {
            username = msg.from.username;
        }
        const query = msg.data;
        const chatId = msg!.message!.chat!.id;
        switch (query) {
            case helpQuery: {
                await getCommands(chatId)
                break;
            }
            case catQuery: {
                await getImage(chatId, catQuery);
                break;
            }
            case dogQuery: {
                await getImage(chatId, dogQuery);
                break;
            }
            case weatherQuery: {
                await botWeatherCommand(chatId, username)
                break;
            }
            case addCityQuery: {
                await bot.sendMessage(chatId, "Write City U Would Like To Stay Notified At.");
                command = addCityInput;
                break;
            }
            case findCityQuery: {
                await bot.sendMessage(chatId, "Write City U Would Like To Know Weather At.");
                command = findCityInput;
                break;
            }
            case deleteCityQuery: {
                command = await botDeleteCityQuery(chatId, username);
                break;
            }
            case dollarQuery: {
                await botCurrencyCommand(chatId, username, dollarQuery);
                break;
            }
            case dollarYesQuery: {
                await subscribeCurrency(dollarQuery, username, chatId, false);
                break;
            }
            case dollarNoQuery: {
                await subscribeCurrency(dollarQuery, username, chatId, true);
                break;
            }
            case euroQuery: {
                await botCurrencyCommand(chatId, username, euroQuery);
                break;
            }
            case euroYesQuery: {
                await subscribeCurrency(euroQuery, username, chatId, false);
                break;
            }
            case euroNoQuery: {
                await subscribeCurrency(euroQuery, username, chatId, true);
                break;
            }
            case adviceQuery: {
                await getAdvice(chatId);
                break;
            }
            case jokeQuery: {
                await getJoke(chatId);
                break;
            }
            case searchQuery: {
                await bot.sendMessage(chatId, "Write Photo Title.");
                command = imageInput
                break;
            }
            case newsQuery: {
                await bot.sendMessage(chatId, "Write Word U Would Like To Know News About.");
                command = newsInput
                break;
            }
            case tasksQuery: {
                await botMyTasksCommand(chatId, username);
                break;
            }
            case createTaskQuery: {
                await bot.sendMessage(chatId, "Write Task Title.");
                command = titleInput;
                break;
            }
            case editTaskQuery: {
                const tasks = await getUserTasks(username);
                if (tasks.length === 1) {
                    await bot.sendMessage(chatId, "1.Change Task Title.\n2.Change Task Finish Time.\n3.Change Task Status.");
                    command = changeTaskPropInput;
                    taskNumber = 1;
                } else {
                    await bot.sendMessage(chatId, "Write Number Of Task To Edit.");
                    command = editTaskInput;
                }
                break;
            }
            case deleteTaskQuery: {
                command = await botDeleteTaskQuery(chatId, username);
                break;
            }
        }
    })
}
start();