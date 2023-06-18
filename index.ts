import TelegramApi from 'node-telegram-bot-api'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import {
    addUserTask, addWeatherNotify, deleteWeatherNotify, getUserNotifications, register
} from "./repo/userController";
import {
    createTask, deleteTask, editTaskStatus, editTaskTime, editTaskTitle, getUserTasks
} from "./repo/taskController";
import {botOptions} from "./botOptions/buttonOptions.ts";
import {
    adviceC, catC, dogC, dollarC, euroC, helpC, imageC, jokeC, mytasksC, newsC, startC, weatherC
} from "./constants/botCommands.ts";
import {
    addCityI, changeTaskPropI,changeTaskTimeI, changeTaskTitleI,deleteCityI, deleteTaskI, editTaskI,findCityI, hoursI, imageI, newsI, titleI
} from "./constants/userInputCommands.ts";
import {
    addCityQ, adviceQ,catQ, createTaskQ,deleteCityQ, deleteTaskQ,dogQ,dollarNoQ,dollarQ,dollarYesQ,
    editTaskQ,euroNoQ,euroQ,euroYesQ,findCityQ,helpQ, jokeQ, newsQ, searchQ, tasksQ,weatherQ
} from "./constants/botButtonsQuery.ts";
import {
    findImage, getAdvice,getCommands, getCurrency, getImage, getJoke, getNews, getWeather,validImageTitleInput,validWordInput
} from "./botOptions/botApiFunctions.ts";
import {
    currencyNotification, getTasks, getUserWeather,subscribeCurrency, taskNotification, weatherNotification
} from "./botOptions/userNotifications.ts";
import {ITask} from "./Types/task";
dotenv.config();
export const bot = new TelegramApi(process.env.TOKEN!, {polling: true});
mongoose.connect(process.env.DB_URL!)
    .then(() => {
        console.log("connected to mongoDB")
    })
    .catch((err) => {
        console.log(err)
    })


//bot commands
bot.setMyCommands([
    {command: startC, description: "Start Chatting."},
    {command: helpC, description: "Get Bot Commands."},
    {command: weatherC, description: "Get Weather Information."},
    {command: catC, description: "Get Cat Picture."},
    {command: dogC, description: "Get Dog Picture."},
    {command: dollarC, description: "Get Dollar Value."},
    {command: euroC, description: "Get Euro Value."},
    {command: adviceC, description: "Get Daily Advice."},
    {command: jokeC, description: "Get Daily Joke."},
    {command: imageC, description: "Find Images."},
    {command: newsC, description: "Get City News."},
    {command: mytasksC, description: "Get User Tasks."},
])


const start = async () => {
    //command for user input so bot understand that we write name of city instead of command
    let command:null|string = null;
    let taskNumber:number;
    let username = "";
    let title:string;

    let tasks:Array<ITask> = [];
    let weatherNotifications:Array<string> = [];
    let currencyNotifications:Array<string> = [];

    let stayNotifiedUSD = null;
    let stayNotifiedEUR = null;

    let taskNotify:null|ReturnType<typeof setInterval> = null;
    let weatherNotify:null|ReturnType<typeof setInterval> = null;
    let currencyNotify :null|ReturnType<typeof setInterval>= null;

    bot.on('message', async msg => {
            const text = msg.text;
            const chatId = msg.chat.id;
        if (msg.chat.username) username = msg.chat.username;
            if (!taskNotify) {
                taskNotify = setInterval(async () => {
                    tasks = await getUserTasks(username);
                    if (tasks.length) {
                        await taskNotification(chatId, tasks);
                    }
                }, 60000)
            }
            if (!weatherNotify) {
                weatherNotify = setInterval(async () => {
                    weatherNotifications = await getUserNotifications(username)
                        .then(res => res!.weather);
                    if (weatherNotifications.length) {
                        await weatherNotification(chatId, weatherNotifications);
                    }
                }, 3600000)
            }
            if (!currencyNotify) {
                currencyNotify = setInterval(async () => {
                    currencyNotifications = await getUserNotifications(username)
                        .then(res => res!.currency);
                    if (currencyNotifications.length) {
                        await currencyNotification(chatId, currencyNotifications);
                    }
                }, 3600000)
            }
            if (text === startC &&!command) {
                await register(username);
                await bot.sendMessage(chatId, `Welcome ${username}!✌`);
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
            } else if (text === helpC &&!command) {
                await getCommands(chatId);
            } else if (text === weatherC &&!command) {
                weatherNotifications = await getUserNotifications(username)
                    .then(res => res!.weather);
                await getUserWeather(chatId, weatherNotifications);
            } else if (text && command === addCityI) {
                if (validWordInput(text)) {
                    let res = await getWeather(chatId, text);//1 - add 0 - invalid
                    if (res) {
                        res = await addWeatherNotify(username, text);
                        if (res) await bot.sendMessage(chatId, "City Added Successfully.");
                        else await bot.sendMessage(chatId, "City Already Added.");
                    }
                } else await bot.sendMessage(chatId, "🚫Invalid City Input.");
                command = null;
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
            } else if (text && command === findCityI) {
                if (validWordInput(text)) {
                    await getWeather(chatId, text);
                } else await bot.sendMessage(chatId, "🚫Invalid City Input.");
                command = null;
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
            } else if (text && command === deleteCityI) {
                if (isFinite(Number(text)) && Number(text) > 0 && Number(text) <= weatherNotifications.length && Number(text) % 1 === 0) {
                    await deleteWeatherNotify(username, weatherNotifications[Number(text) - 1]);
                    await bot.sendMessage(chatId, "City Deleted Successfully.");
                } else await bot.sendMessage(chatId, "🚫Invalid Input.");
                command = null;
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
            } else if (text === catC &&!command) {
                await getImage(chatId, catQ);
            } else if (text === dogC &&!command) {
                await getImage(chatId, dogQ);
            } else if (text === dollarC &&!command) {
                currencyNotifications = await getUserNotifications(username)
                    .then(res => res!.currency);
                stayNotifiedUSD = currencyNotifications.includes('dollar');
                await getCurrency(chatId, "dollar", stayNotifiedUSD);
            } else if (text === euroC &&!command) {
                currencyNotifications = await getUserNotifications(username)
                    .then(res => res!.currency);
                stayNotifiedEUR = currencyNotifications.includes('euro')
                await getCurrency(chatId, "euro", stayNotifiedEUR);
            } else if (text === adviceC &&!command) {
                await getAdvice(chatId);
            } else if (text === jokeC &&!command) {
                await getJoke(chatId);
            } else if (text === imageC &&!command) {
                await bot.sendMessage(chatId, "Write Photo Title.");
                command = imageI;
            } else if (text && command === imageI) {
                if (validImageTitleInput(text)) {
                    await findImage(chatId, text);
                } else await bot.sendMessage(chatId, "🚫Invalid Image Title Input.");
                command = null;
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
            } else if (text === newsC &&!command) {
                await bot.sendMessage(chatId, "Write City U Would Like To Know News At.");
                command = newsI
            } else if (text && command === newsI) {
                if (validWordInput(text)) {
                    await getNews(chatId, text);
                } else await bot.sendMessage(chatId, "🚫Invalid City Input.");
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
                command = null;
            } else if (text && command === titleI) {
                title = text;
                command = hoursI;
                await bot.sendMessage(chatId, "Write Count Of Hours You Need To Achieve Task Since Now.");
            } else if (text && command === hoursI) {
                if (isFinite(Number(text)) && Number(text) >= 1&&Number(text) <= 240) {
                    let taskId = await createTask(title, Date.now() + Number(text) * 3600000);
                    await addUserTask(username, taskId)
                    await bot.sendMessage(chatId, "Task Created!");
                } else await bot.sendMessage(chatId, "It Should Be Whole Positive Number Higher Than 0 Hours And Lower Than 10 Days.")
                command = null;
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
            } else if (text === mytasksC &&!command) {
                tasks = await getUserTasks(username);
                await getTasks(chatId, tasks);
            } else if (text && command === editTaskI) {
                if (isFinite(Number(text)) && Number(text) <= tasks.length && Number(text) > 0 && Number(text) % 1 === 0) {
                    taskNumber = Number(text);
                    await bot.sendMessage(chatId, "1.Change Task Title.\n2.Change Task Finish Time.\n3.Change Task Status.");
                    command = changeTaskPropI;
                } else {
                    await bot.sendMessage(chatId, "🚫Invalid Input.")
                    command = null;
                    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
                }
            } else if (text && command === deleteTaskI) {
                if (isFinite(Number(text)) && Number(text) <= tasks.length && Number(text) > 0 && Number(text) % 1 === 0) {
                    if (await deleteTask(tasks[Number(text) - 1]._id, username)) await bot.sendMessage(chatId, "Task Deleted.");
                    else await bot.sendMessage(chatId, "Error Deleting Task.")
                } else {
                    await bot.sendMessage(chatId, "🚫Invalid Input.")
                }
                command = null;
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
            } else if (text && command === changeTaskPropI) {
                if (isFinite(Number(text)) && Number(text) < 4 && Number(text) > 0 && Number(text) % 1 === 0) {
                    if (text === '1') {
                        command = changeTaskTitleI;
                        await bot.sendMessage(chatId, "Write New Task Title");
                    } else if (text === '2') {
                        command = changeTaskTimeI;
                        await bot.sendMessage(chatId, "Write Count Of Hours You Need To Achieve Task Since Now.");
                    } else if (text === '3') {
                        if (await editTaskStatus(tasks[taskNumber - 1]._id, !tasks[taskNumber - 1].done)) await bot.sendMessage(chatId, "Task Updated!")
                        else await bot.sendMessage(chatId, "Error Updating Task.");
                        await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
                        command = null;
                    }
                } else {
                    command = null;
                    await bot.sendMessage(chatId, "🚫Invalid Input")
                    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
                }
            } else if (text && command === changeTaskTitleI) {
                if (await editTaskTitle(tasks[taskNumber - 1]._id, text)) await bot.sendMessage(chatId, "Task Updated!");
                else await bot.sendMessage(chatId, "Error Updating Task.");
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
                command = null;
            } else if (text && command === changeTaskTimeI) {
                if (isFinite(Number(text)) && Number(text) >= 1 &&Number(text) <= 240) {
                    if (await editTaskTime(tasks[taskNumber - 1]._id, Number(text))) await bot.sendMessage(chatId, "Task Updated!")
                    else await bot.sendMessage(chatId, "Error Updating Task.");
                } else await bot.sendMessage(chatId, "🚫Invalid Input.The Minimum Time Is 1 Hour.The Maximum Time Is 10 Days.");
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
                command = null;
            } else {
                await bot.sendMessage(chatId, "🚫Invalid Command.");
                await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
            }
        }
    )
//bot buttons
    bot.on('callback_query', async msg => {
        if (msg.from.username != null) {
            username = msg.from.username;
        }
        const req = msg.data;
        const chatId = msg!.message!.chat!.id;
        switch (req) {
            case helpQ: {
                await getCommands(chatId)
                break;
            }
            case catQ: {
                await getImage(chatId, catQ);
                break;
            }
            case dogQ: {
                await getImage(chatId, dogQ);
                break;
            }
            case weatherQ: {
                weatherNotifications = await getUserNotifications(username)
                    .then(res => res!.weather);
                await getUserWeather(chatId, weatherNotifications);
                break;
            }
            case addCityQ: {
                await bot.sendMessage(chatId, "Write City U Would Like To Stay Notified At.");
                command = addCityI;
                break;
            }
            case findCityQ: {
                await bot.sendMessage(chatId, "Write City U Would Like To Know Weather At.");
                command = findCityI;
                break;
            }
            case deleteCityQ: {
                if (weatherNotifications.length === 1) {
                    await deleteWeatherNotify(username, weatherNotifications[0]);
                    await bot.sendMessage(chatId, "City Deleted Successfully.");
                    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
                } else {
                    await bot.sendMessage(chatId, "Write Number Of City To Delete.");
                    command = deleteCityI;
                }
                break;
            }
            case dollarQ: {
                currencyNotifications = await getUserNotifications(username)
                    .then(res => res!.currency);
                stayNotifiedUSD = currencyNotifications.includes(dollarQ)
                await getCurrency(chatId, dollarQ, stayNotifiedUSD);
                break;
            }
            case dollarYesQ: {
                await subscribeCurrency(dollarQ, username, chatId, false);
                break;
            }
            case dollarNoQ: {
                await subscribeCurrency(dollarQ, username, chatId, true);
                break;
            }
            case euroQ: {
                currencyNotifications = await getUserNotifications(username)
                    .then(res => res!.currency);
                stayNotifiedEUR = currencyNotifications.includes(euroQ)
                await getCurrency(chatId, euroQ, stayNotifiedEUR);
                break;
            }
            case euroYesQ: {
                await subscribeCurrency(euroQ, username, chatId, false);
                break;
            }
            case euroNoQ: {
                await subscribeCurrency(euroQ, username, chatId, true);
                break;
            }
            case adviceQ: {
                await getAdvice(chatId);
                break;
            }
            case jokeQ: {
                await getJoke(chatId);
                break;
            }
            case searchQ: {
                await bot.sendMessage(chatId, "Write Photo Title.");
                command = imageI //user will input title of image
                break;
            }
            case newsQ: {
                await bot.sendMessage(chatId, "Write City U Would Like To Know News At.");
                command = newsI
                break;
            }
            case tasksQ: {
                tasks = await getUserTasks(username);
                await getTasks(chatId, tasks);
                break;
            }
            case createTaskQ: {
                await bot.sendMessage(chatId, "Write Task Title.");
                command = titleI;
                break;
            }
            case editTaskQ: {
                if (tasks.length === 1) {
                    await bot.sendMessage(chatId, "1.Change Task Title.\n2.Change Task Finish Time.\n3.Change Task Status.");
                    command = changeTaskPropI;
                    taskNumber = 1;
                } else {
                    await bot.sendMessage(chatId, "Write Number Of Task To Edit.");
                    command = editTaskI;
                }
                break;
            }
            case deleteTaskQ: {
                if (tasks.length === 1) {
                    if (await deleteTask(tasks[0]._id, username)) await bot.sendMessage(chatId, "Task Deleted.");
                    else await bot.sendMessage(chatId, "Error Deleting Task.")
                    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
                } else {
                    await bot.sendMessage(chatId, "Write Number Of Task To Delete.");
                    command = deleteTaskI;
                }
                break;
            }
        }
    })
}
start();