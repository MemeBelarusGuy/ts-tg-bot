"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyOptionsEUR = exports.currencyOptionsUSD = exports.weatherOptionsEmpty = exports.weatherOptionsExist = exports.taskOptionsEmpty = exports.taskOptionsExist = exports.botOptions = void 0;
var botButtonsEmoji_1 = require("../constants/botButtonsEmoji");
var botButtonsQuery_1 = require("../constants/botButtonsQuery");
var telegraf_1 = require("telegraf");
var buttonCommands_1 = require("../constants/buttonCommands");
exports.botOptions = telegraf_1.Markup.inlineKeyboard([
    [telegraf_1.Markup.button.callback(botButtonsEmoji_1.HELP, botButtonsQuery_1.helpQuery), telegraf_1.Markup.button.callback(botButtonsEmoji_1.WEATHER, botButtonsQuery_1.weatherQuery)],
    [telegraf_1.Markup.button.callback(botButtonsEmoji_1.CAT_IMAGE, botButtonsQuery_1.catQuery), telegraf_1.Markup.button.callback(botButtonsEmoji_1.DOG_IMAGE, botButtonsQuery_1.dogQuery)],
    [telegraf_1.Markup.button.callback(botButtonsEmoji_1.DOLLAR, botButtonsQuery_1.dollarQuery), telegraf_1.Markup.button.callback(botButtonsEmoji_1.EURO, botButtonsQuery_1.euroQuery)],
    [telegraf_1.Markup.button.callback(botButtonsEmoji_1.ADVICE, botButtonsQuery_1.adviceQuery), telegraf_1.Markup.button.callback(botButtonsEmoji_1.JOKE, botButtonsQuery_1.jokeQuery)],
    [telegraf_1.Markup.button.callback(botButtonsEmoji_1.SEARCH, botButtonsQuery_1.searchQuery), telegraf_1.Markup.button.callback(botButtonsEmoji_1.NEWS, botButtonsQuery_1.newsQuery)],
    [telegraf_1.Markup.button.callback(botButtonsEmoji_1.TASKS, botButtonsQuery_1.tasksQuery)]
]);
exports.taskOptionsExist = telegraf_1.Markup.inlineKeyboard([
    [telegraf_1.Markup.button.callback(buttonCommands_1.createButton, botButtonsQuery_1.createTaskQuery)],
    [telegraf_1.Markup.button.callback(buttonCommands_1.editButton, botButtonsQuery_1.editTaskQuery)],
    [telegraf_1.Markup.button.callback(buttonCommands_1.deleteButton, botButtonsQuery_1.deleteTaskQuery)],
]);
exports.taskOptionsEmpty = telegraf_1.Markup.inlineKeyboard([
    telegraf_1.Markup.button.callback(buttonCommands_1.createButton, botButtonsQuery_1.createTaskQuery)
]);
exports.weatherOptionsExist = telegraf_1.Markup.inlineKeyboard([
    [telegraf_1.Markup.button.callback(buttonCommands_1.addButton, botButtonsQuery_1.addCityQuery)],
    [telegraf_1.Markup.button.callback(buttonCommands_1.findButton, botButtonsQuery_1.findCityQuery)],
    [telegraf_1.Markup.button.callback(buttonCommands_1.deleteButton, botButtonsQuery_1.deleteCityQuery)],
]);
exports.weatherOptionsEmpty = telegraf_1.Markup.inlineKeyboard([
    [telegraf_1.Markup.button.callback(buttonCommands_1.addButton, botButtonsQuery_1.addCityQuery)],
    [telegraf_1.Markup.button.callback(buttonCommands_1.findButton, botButtonsQuery_1.findCityQuery)],
]);
var currencyOptionsUSD = function (text) { return telegraf_1.Markup.inlineKeyboard([
    [telegraf_1.Markup.button.callback(text, "dollar".concat(text))],
]); };
exports.currencyOptionsUSD = currencyOptionsUSD;
var currencyOptionsEUR = function (text) { return telegraf_1.Markup.inlineKeyboard([
    [telegraf_1.Markup.button.callback(text, "euro".concat(text))],
]); };
exports.currencyOptionsEUR = currencyOptionsEUR;
