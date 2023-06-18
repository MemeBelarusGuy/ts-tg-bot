import {ADVICE, CAT_IMAGE, DOG_IMAGE, DOLLAR, EURO, HELP, JOKE, NEWS, SEARCH, TASKS, WEATHER} from "../constants/botButtonsEmoji.ts";
import {
    addCityQ,
    adviceQ,
    catQ, createTaskQ, deleteCityQ, deleteTaskQ,
    dogQ,
    dollarQ, editTaskQ,
    euroQ, findCityQ,
    helpQ,
    jokeQ,
    newsQ,
    searchQ,
    tasksQ,
    weatherQ
} from "../constants/botButtonsQuery.ts";
import {Markup} from "telegraf";

export const botOptions = Markup.inlineKeyboard([
    [Markup.button.callback(HELP,helpQ),Markup.button.callback(WEATHER,weatherQ)],
    [Markup.button.callback(CAT_IMAGE,catQ),Markup.button.callback(DOG_IMAGE,dogQ)],
    [Markup.button.callback(DOLLAR,dollarQ),Markup.button.callback(EURO,euroQ)],
    [Markup.button.callback(ADVICE,adviceQ),Markup.button.callback(JOKE,jokeQ)],
    [Markup.button.callback(SEARCH,searchQ),Markup.button.callback(NEWS,newsQ)],
    [Markup.button.callback(TASKS,tasksQ)]
])
export const taskOptionsExist = Markup.inlineKeyboard([
    [Markup.button.callback("CREATE",createTaskQ)],
    [Markup.button.callback("EDIT",editTaskQ)],
    [Markup.button.callback("DELETE",deleteTaskQ)],
])
export const taskOptionsEmpty=Markup.inlineKeyboard([
    Markup.button.callback("CREATE",createTaskQ)
])
export const weatherOptionsExist = Markup.inlineKeyboard([
    [Markup.button.callback("ADD",addCityQ)],
    [Markup.button.callback("FIND",findCityQ)],
    [Markup.button.callback("DELETE",deleteCityQ)],
])
export const weatherOptionsEmpty = Markup.inlineKeyboard([
    [Markup.button.callback("ADD",addCityQ)],
    [Markup.button.callback("FIND",findCityQ)],
])
export const currencyOptionsUSD = (text:string) => Markup.inlineKeyboard([
    [Markup.button.callback(text,`dollar${text}`)],
])
export const currencyOptionsEUR = (text:string) =>Markup.inlineKeyboard([
    [Markup.button.callback(text,`euro${text}`)],
])
