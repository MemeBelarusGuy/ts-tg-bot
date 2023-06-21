import {
    addUserTask,
    addWeatherNotify,
    deleteWeatherNotify,
    getUserNotifications,
    register
} from "../databaseRequests/userController";
import {botOptions} from "./buttonOptions";
import {bot} from "../index";
import {validImageTitleInput, validWordInput} from "../helpers/APIHelpers";
import {findImage, getCurrency, getNews, getWeather} from "../botAPI/botApiFunctions";
import {getTasks, getUserWeather} from "../helpers/userNotifications";
import {
    changeTaskTimeInput,
    changeTaskTitleInput,
    deleteCityInput, deleteTaskInput
} from "../constants/userInputCommands";
import {hour, maxHours} from "../constants/functionNumbers";
import {
    createTask,
    deleteTask,
    editTaskStatus,
    editTaskTime,
    editTaskTitle,
    getUserTasks
} from "../databaseRequests/taskController";

export async function botInvalidInput(chatId: number) {
    await bot.sendMessage(chatId, "🚫Invalid Input.")
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}

export async function botStartCommand(chatId: number, username: string) {
    await register(username);
    await bot.sendMessage(chatId, `Welcome ${username}!✌`);
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}

export async function botAddCityCommand(chatId: number, username: string, city: string) {
    if (validWordInput(city)) {
        let weather = await getWeather(chatId, city);
        if (weather) {
            weather = await addWeatherNotify(username, city);
            if (weather) await bot.sendMessage(chatId, "City Added Successfully.");
            else await bot.sendMessage(chatId, "City Already Added.");
        }
    } else await bot.sendMessage(chatId, "🚫Invalid City Input.");
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}

export async function botFindCityCommand(chatId: number, city: string) {
    if (validWordInput(city)) {
        await getWeather(chatId, city);
    } else await bot.sendMessage(chatId, "🚫Invalid City Input.");
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}
export async function botDeleteCityQuery(chatId: number, username: string) {
    const weatherNotifications = await getUserNotifications(username)
        .then(res => res!.weather);
    if (weatherNotifications.length === 1) {
        await botDeleteCityCommand(chatId, username, "1");
        return ""
    } else {
        await bot.sendMessage(chatId, "Write Number Of City To Delete.");
        return deleteCityInput;
    }
}

export async function botDeleteCityCommand(chatId: number, username: string, cityNumber: string) {
    const weatherNotifications = await getUserNotifications(username)
        .then(res => res!.weather);
    if (isFinite(Number(cityNumber)) && Number(cityNumber) > 0 && Number(cityNumber) <= weatherNotifications.length &&
        Number(cityNumber) % 1 === 0) {
        await deleteWeatherNotify(username, weatherNotifications[Number(cityNumber) - 1]);
        await bot.sendMessage(chatId, "City Deleted Successfully.");
    } else await bot.sendMessage(chatId, "🚫Invalid Input.");
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}


export async function botWeatherCommand(chatId: number, username: string) {
    const weatherNotifications = await getUserNotifications(username)
        .then(res => res!.weather);
    await getUserWeather(chatId, weatherNotifications);
}

export async function botCurrencyCommand(chatId: number, username: string, currency: string) {
    const currencyNotifications = await getUserNotifications(username)
        .then(res => res!.currency);
    const stayNotified = currencyNotifications.includes(currency);
    await getCurrency(chatId, currency, stayNotified);
}

export async function botFindImageCommand(chatId: number, title: string) {
    if (validImageTitleInput(title)) {
        await findImage(chatId, title);
    } else await bot.sendMessage(chatId, "🚫Invalid Image Title Input.");
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}

export async function botNewsCommand(chatId: number, city: string) {
    if (validWordInput(city)) {
        await getNews(chatId, city);
    } else await bot.sendMessage(chatId, "🚫Invalid City Input.");
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}

export async function botMyTasksCommand(chatId: number, username: string) {
    const tasks = await getUserTasks(username);
    await getTasks(chatId, tasks);
}

export async function botCreateTaskCommand(chatId: number, username: string, hours: string, title: string) {
    if (isFinite(Number(hours)) && Number(hours) >= 1 && Number(hours) <= maxHours) {
        const taskId = await createTask(title, Date.now() + Number(hours) * hour);
        await addUserTask(username, taskId)
        await bot.sendMessage(chatId, "Task Created!");
    } else await bot.sendMessage(chatId, "It Should Be Whole Positive Number Higher Than 0 Hours And Lower Than 10 Days.")
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}

export async function botEditTaskPropCommand(chatId: number, username: string, text: string, taskNumber: number) {
    const tasks = await getUserTasks(username);
    if (isFinite(Number(text)) && Number(text) < 4 && Number(text) > 0 && Number(text) % 1 === 0) {
        if (text === '1') {
            await bot.sendMessage(chatId, "Write New Task Title");
            return changeTaskTitleInput;
        } else if (text === '2') {
            await bot.sendMessage(chatId, "Write Count Of Hours You Need To Achieve Task Since Now.");
            return changeTaskTimeInput;
        } else if (text === '3') {
            if (await editTaskStatus(tasks[taskNumber - 1]._id, !tasks[taskNumber - 1].done)) await bot.sendMessage(chatId, "Task Updated!")
            else await bot.sendMessage(chatId, "Error Updating Task.");
            await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
            return "";
        }
    }
    await botInvalidInput(chatId);
    return "";
}

export async function botDeleteTaskCommand(chatId: number, username: string, taskNumber: string) {
    const tasks = await getUserTasks(username);
    if (isFinite(Number(taskNumber)) && Number(taskNumber) <= tasks.length && Number(taskNumber) > 0 && Number(taskNumber) % 1 === 0) {
        if (await deleteTask(tasks[Number(taskNumber) - 1]._id, username)) await bot.sendMessage(chatId, "Task Deleted.");
        else await bot.sendMessage(chatId, "Error Deleting Task.")
    } else await bot.sendMessage(chatId, "🚫Invalid Input.")
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}

export async function botDeleteTaskQuery(chatId: number, username: string) {
    const tasks = await getUserTasks(username);
    if (tasks.length === 1) {
        await botDeleteTaskCommand(chatId, username, "1");
        return ""
    }
    await bot.sendMessage(chatId, "Write Number Of Task To Delete.");
    return deleteTaskInput;
}

export async function botChangeTaskTitle(chatId: number, username: string, taskNumber: number, title: string) {
    const tasks = await getUserTasks(username);
    if (await editTaskTitle(tasks[Number(taskNumber) - 1]._id, title)) await bot.sendMessage(chatId, "Task Updated!");
    else await bot.sendMessage(chatId, "Error Updating Task.");
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}

export async function botChangeTaskTime(chatId: number, username: string, text: string, taskNumber: number) {
    const tasks = await getUserTasks(username);
    if (isFinite(Number(text)) && Number(text) >= 1 && Number(text) <= 240) {
        if (await editTaskTime(tasks[taskNumber - 1]._id, Number(text))) await bot.sendMessage(chatId, "Task Updated!")
        else await bot.sendMessage(chatId, "Error Updating Task.");
    } else await bot.sendMessage(chatId, "🚫Invalid Input.The Minimum Time Is 1 Hour.The Maximum Time Is 10 Days.");
    await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
}
