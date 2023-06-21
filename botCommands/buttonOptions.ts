import {ADVICE, CAT_IMAGE, DOG_IMAGE, DOLLAR, EURO, HELP, JOKE, NEWS, SEARCH, TASKS, WEATHER} from "../constants/botButtonsEmoji.ts";
import {
    addCityQuery,
    adviceQuery,
    catQuery, createTaskQuery, deleteCityQuery, deleteTaskQuery,
    dogQuery,
    dollarQuery, editTaskQuery,
    euroQuery, findCityQuery,
    helpQuery,
    jokeQuery,
    newsQuery,
    searchQuery,
    tasksQuery,
    weatherQuery
} from "../constants/botButtonsQuery.ts";
import {Markup} from "telegraf";
import {addButton, createButton, deleteButton, editButton, findButton} from "../constants/buttonCommands";

export const botOptions = Markup.inlineKeyboard([
    [Markup.button.callback(HELP,helpQuery),Markup.button.callback(WEATHER,weatherQuery)],
    [Markup.button.callback(CAT_IMAGE,catQuery),Markup.button.callback(DOG_IMAGE,dogQuery)],
    [Markup.button.callback(DOLLAR,dollarQuery),Markup.button.callback(EURO,euroQuery)],
    [Markup.button.callback(ADVICE,adviceQuery),Markup.button.callback(JOKE,jokeQuery)],
    [Markup.button.callback(SEARCH,searchQuery),Markup.button.callback(NEWS,newsQuery)],
    [Markup.button.callback(TASKS,tasksQuery)]
])
export const taskOptionsExist = Markup.inlineKeyboard([
    [Markup.button.callback(createButton,createTaskQuery)],
    [Markup.button.callback(editButton,editTaskQuery)],
    [Markup.button.callback(deleteButton,deleteTaskQuery)],
])
export const taskOptionsEmpty=Markup.inlineKeyboard([
    Markup.button.callback(createButton,createTaskQuery)
])
export const weatherOptionsExist = Markup.inlineKeyboard([
    [Markup.button.callback(addButton,addCityQuery)],
    [Markup.button.callback(findButton,findCityQuery)],
    [Markup.button.callback(deleteButton,deleteCityQuery)],
])
export const weatherOptionsEmpty = Markup.inlineKeyboard([
    [Markup.button.callback(addButton,addCityQuery)],
    [Markup.button.callback(findButton,findCityQuery)],
])
export const currencyOptionsUSD = (text:string) => Markup.inlineKeyboard([
    [Markup.button.callback(text,`dollar${text}`)],
])
export const currencyOptionsEUR = (text:string) =>Markup.inlineKeyboard([
    [Markup.button.callback(text,`euro${text}`)],
])
