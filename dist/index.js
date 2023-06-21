"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var taskController_1 = require("./databaseRequests/taskController");
var botCommands_1 = require("./constants/botCommands");
var userInputCommands_1 = require("./constants/userInputCommands");
var botButtonsQuery_1 = require("./constants/botButtonsQuery");
var botApiFunctions_1 = require("./botAPI/botApiFunctions");
var userNotifications_1 = require("./helpers/userNotifications");
var botCommands_2 = require("./botCommands/botCommands");
var functionNumbers_1 = require("./constants/functionNumbers");
dotenv_1.default.config();
exports.bot = new node_telegram_bot_api_1.default(process.env.TOKEN, { polling: true });
mongoose_1.default.connect(process.env.DB_URL)
    .then(function () {
    console.log("connected to mongoDB");
})
    .catch(function (err) {
    console.log(err);
});
exports.bot.setMyCommands([
    { command: botCommands_1.startCommand, description: "Start Chatting." },
    { command: botCommands_1.helpCommand, description: "Get Bot Commands." },
    { command: botCommands_1.weatherCommand, description: "Get Weather Information." },
    { command: botCommands_1.catCommand, description: "Get Cat Picture." },
    { command: botCommands_1.dogCommand, description: "Get Dog Picture." },
    { command: botCommands_1.dollarCommand, description: "Get Dollar Value." },
    { command: botCommands_1.euroCommand, description: "Get Euro Value." },
    { command: botCommands_1.adviceCommand, description: "Get Daily Advice." },
    { command: botCommands_1.jokeCommand, description: "Get Daily Joke." },
    { command: botCommands_1.imageCommand, description: "Find Images." },
    { command: botCommands_1.newsCommand, description: "Get City News." },
    { command: botCommands_1.mytasksCommand, description: "Get User Tasks." },
]);
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var command, username, taskNumber, title, taskNotify, weatherNotify, currencyNotify;
    return __generator(this, function (_a) {
        command = "";
        username = "";
        taskNotify = null;
        weatherNotify = null;
        currencyNotify = null;
        exports.bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
            var text, chatId, tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = msg.text;
                        chatId = msg.chat.id;
                        if (msg.chat.username)
                            username = msg.chat.username;
                        if (!taskNotify) {
                            taskNotify = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, userNotifications_1.taskIntervalNotification)(chatId, username)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, functionNumbers_1.minute);
                        }
                        if (!weatherNotify) {
                            weatherNotify = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, userNotifications_1.weatherIntervalNotification)(chatId, username)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, functionNumbers_1.hour);
                        }
                        if (!currencyNotify) {
                            currencyNotify = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, userNotifications_1.currencyIntervalNotification)(chatId, username)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, functionNumbers_1.hour);
                        }
                        if (!(text === botCommands_1.startCommand && !command)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, botCommands_2.botStartCommand)(chatId, username)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 2:
                        if (!(text === botCommands_1.helpCommand && !command)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, botApiFunctions_1.getCommands)(chatId)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 4:
                        if (!(text === botCommands_1.weatherCommand && !command)) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, botCommands_2.botWeatherCommand)(chatId, username)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 6:
                        if (!(text && command === userInputCommands_1.addCityInput)) return [3 /*break*/, 8];
                        return [4 /*yield*/, (0, botCommands_2.botAddCityCommand)(chatId, username, text)];
                    case 7:
                        _a.sent();
                        command = "";
                        return [3 /*break*/, 54];
                    case 8:
                        if (!(text && command === userInputCommands_1.findCityInput)) return [3 /*break*/, 10];
                        return [4 /*yield*/, (0, botCommands_2.botFindCityCommand)(chatId, text)];
                    case 9:
                        _a.sent();
                        command = "";
                        return [3 /*break*/, 54];
                    case 10:
                        if (!(text && command === userInputCommands_1.deleteCityInput)) return [3 /*break*/, 12];
                        return [4 /*yield*/, (0, botCommands_2.botDeleteCityCommand)(chatId, username, text)];
                    case 11:
                        _a.sent();
                        command = "";
                        return [3 /*break*/, 54];
                    case 12:
                        if (!(text === botCommands_1.catCommand && !command)) return [3 /*break*/, 14];
                        return [4 /*yield*/, (0, botApiFunctions_1.getImage)(chatId, botButtonsQuery_1.catQuery)];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 14:
                        if (!(text === botCommands_1.dogCommand && !command)) return [3 /*break*/, 16];
                        return [4 /*yield*/, (0, botApiFunctions_1.getImage)(chatId, botButtonsQuery_1.dogQuery)];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 16:
                        if (!(text === botCommands_1.dollarCommand && !command)) return [3 /*break*/, 18];
                        return [4 /*yield*/, (0, botCommands_2.botCurrencyCommand)(chatId, username, botButtonsQuery_1.dollarQuery)];
                    case 17:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 18:
                        if (!(text === botCommands_1.euroCommand && !command)) return [3 /*break*/, 20];
                        return [4 /*yield*/, (0, botCommands_2.botCurrencyCommand)(chatId, username, botButtonsQuery_1.euroQuery)];
                    case 19:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 20:
                        if (!(text === botCommands_1.adviceCommand && !command)) return [3 /*break*/, 22];
                        return [4 /*yield*/, (0, botApiFunctions_1.getAdvice)(chatId)];
                    case 21:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 22:
                        if (!(text === botCommands_1.jokeCommand && !command)) return [3 /*break*/, 24];
                        return [4 /*yield*/, (0, botApiFunctions_1.getJoke)(chatId)];
                    case 23:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 24:
                        if (!(text === botCommands_1.imageCommand && !command)) return [3 /*break*/, 26];
                        return [4 /*yield*/, exports.bot.sendMessage(chatId, "Write Photo Title.")];
                    case 25:
                        _a.sent();
                        command = userInputCommands_1.imageInput;
                        return [3 /*break*/, 54];
                    case 26:
                        if (!(text && command === userInputCommands_1.imageInput)) return [3 /*break*/, 28];
                        return [4 /*yield*/, (0, botCommands_2.botFindImageCommand)(chatId, text)];
                    case 27:
                        _a.sent();
                        command = "";
                        return [3 /*break*/, 54];
                    case 28:
                        if (!(text === botCommands_1.newsCommand && !command)) return [3 /*break*/, 30];
                        return [4 /*yield*/, exports.bot.sendMessage(chatId, "Write Word U Would Like To Know News About.")];
                    case 29:
                        _a.sent();
                        command = userInputCommands_1.newsInput;
                        return [3 /*break*/, 54];
                    case 30:
                        if (!(text && command === userInputCommands_1.newsInput)) return [3 /*break*/, 32];
                        return [4 /*yield*/, (0, botCommands_2.botNewsCommand)(chatId, text)];
                    case 31:
                        _a.sent();
                        command = "";
                        return [3 /*break*/, 54];
                    case 32:
                        if (!(text && command === userInputCommands_1.titleInput)) return [3 /*break*/, 34];
                        return [4 /*yield*/, exports.bot.sendMessage(chatId, "Write Count Of Hours You Need To Achieve Task Since Now.")];
                    case 33:
                        _a.sent();
                        title = text;
                        command = userInputCommands_1.hoursInput;
                        return [3 /*break*/, 54];
                    case 34:
                        if (!(text && command === userInputCommands_1.hoursInput)) return [3 /*break*/, 36];
                        return [4 /*yield*/, (0, botCommands_2.botCreateTaskCommand)(chatId, username, text, title)];
                    case 35:
                        _a.sent();
                        command = "";
                        return [3 /*break*/, 54];
                    case 36:
                        if (!(text === botCommands_1.mytasksCommand && !command)) return [3 /*break*/, 38];
                        return [4 /*yield*/, (0, botCommands_2.botMyTasksCommand)(chatId, username)];
                    case 37:
                        _a.sent();
                        return [3 /*break*/, 54];
                    case 38:
                        if (!(text && command === userInputCommands_1.editTaskInput)) return [3 /*break*/, 44];
                        return [4 /*yield*/, (0, taskController_1.getUserTasks)(username)];
                    case 39:
                        tasks = _a.sent();
                        if (!(isFinite(Number(text)) && Number(text) <= tasks.length && Number(text) > 0 && Number(text) % 1 === 0)) return [3 /*break*/, 41];
                        return [4 /*yield*/, exports.bot.sendMessage(chatId, "1.Change Task Title.\n2.Change Task Finish Time.\n3.Change Task Status.")];
                    case 40:
                        _a.sent();
                        taskNumber = Number(text);
                        command = userInputCommands_1.changeTaskPropInput;
                        return [3 /*break*/, 43];
                    case 41: return [4 /*yield*/, (0, botCommands_2.botInvalidInput)(chatId)];
                    case 42:
                        _a.sent();
                        command = "";
                        _a.label = 43;
                    case 43: return [3 /*break*/, 54];
                    case 44:
                        if (!(text && command === userInputCommands_1.deleteTaskInput)) return [3 /*break*/, 46];
                        return [4 /*yield*/, (0, botCommands_2.botDeleteTaskCommand)(chatId, username, text)];
                    case 45:
                        _a.sent();
                        command = "";
                        return [3 /*break*/, 54];
                    case 46:
                        if (!(text && command === userInputCommands_1.changeTaskPropInput)) return [3 /*break*/, 48];
                        return [4 /*yield*/, (0, botCommands_2.botEditTaskPropCommand)(chatId, username, text, taskNumber)];
                    case 47:
                        command = _a.sent();
                        return [3 /*break*/, 54];
                    case 48:
                        if (!(text && command === userInputCommands_1.changeTaskTitleInput)) return [3 /*break*/, 50];
                        return [4 /*yield*/, (0, botCommands_2.botChangeTaskTitle)(chatId, username, taskNumber, text)];
                    case 49:
                        _a.sent();
                        command = "";
                        return [3 /*break*/, 54];
                    case 50:
                        if (!(text && command === userInputCommands_1.changeTaskTimeInput)) return [3 /*break*/, 52];
                        return [4 /*yield*/, (0, botCommands_2.botChangeTaskTime)(chatId, username, text, taskNumber)];
                    case 51:
                        _a.sent();
                        command = "";
                        return [3 /*break*/, 54];
                    case 52: return [4 /*yield*/, (0, botCommands_2.botInvalidInput)(chatId)];
                    case 53:
                        _a.sent();
                        _a.label = 54;
                    case 54: return [2 /*return*/];
                }
            });
        }); });
        exports.bot.on('callback_query', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
            var query, chatId, _a, tasks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (msg.from.username != null) {
                            username = msg.from.username;
                        }
                        query = msg.data;
                        chatId = msg.message.chat.id;
                        _a = query;
                        switch (_a) {
                            case botButtonsQuery_1.helpQuery: return [3 /*break*/, 1];
                            case botButtonsQuery_1.catQuery: return [3 /*break*/, 3];
                            case botButtonsQuery_1.dogQuery: return [3 /*break*/, 5];
                            case botButtonsQuery_1.weatherQuery: return [3 /*break*/, 7];
                            case botButtonsQuery_1.addCityQuery: return [3 /*break*/, 9];
                            case botButtonsQuery_1.findCityQuery: return [3 /*break*/, 11];
                            case botButtonsQuery_1.deleteCityQuery: return [3 /*break*/, 13];
                            case botButtonsQuery_1.dollarQuery: return [3 /*break*/, 15];
                            case botButtonsQuery_1.dollarYesQuery: return [3 /*break*/, 17];
                            case botButtonsQuery_1.dollarNoQuery: return [3 /*break*/, 19];
                            case botButtonsQuery_1.euroQuery: return [3 /*break*/, 21];
                            case botButtonsQuery_1.euroYesQuery: return [3 /*break*/, 23];
                            case botButtonsQuery_1.euroNoQuery: return [3 /*break*/, 25];
                            case botButtonsQuery_1.adviceQuery: return [3 /*break*/, 27];
                            case botButtonsQuery_1.jokeQuery: return [3 /*break*/, 29];
                            case botButtonsQuery_1.searchQuery: return [3 /*break*/, 31];
                            case botButtonsQuery_1.newsQuery: return [3 /*break*/, 33];
                            case botButtonsQuery_1.tasksQuery: return [3 /*break*/, 35];
                            case botButtonsQuery_1.createTaskQuery: return [3 /*break*/, 37];
                            case botButtonsQuery_1.editTaskQuery: return [3 /*break*/, 39];
                            case botButtonsQuery_1.deleteTaskQuery: return [3 /*break*/, 45];
                        }
                        return [3 /*break*/, 47];
                    case 1: return [4 /*yield*/, (0, botApiFunctions_1.getCommands)(chatId)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 3: return [4 /*yield*/, (0, botApiFunctions_1.getImage)(chatId, botButtonsQuery_1.catQuery)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 5: return [4 /*yield*/, (0, botApiFunctions_1.getImage)(chatId, botButtonsQuery_1.dogQuery)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 7: return [4 /*yield*/, (0, botCommands_2.botWeatherCommand)(chatId, username)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 9: return [4 /*yield*/, exports.bot.sendMessage(chatId, "Write City U Would Like To Stay Notified At.")];
                    case 10:
                        _b.sent();
                        command = userInputCommands_1.addCityInput;
                        return [3 /*break*/, 47];
                    case 11: return [4 /*yield*/, exports.bot.sendMessage(chatId, "Write City U Would Like To Know Weather At.")];
                    case 12:
                        _b.sent();
                        command = userInputCommands_1.findCityInput;
                        return [3 /*break*/, 47];
                    case 13: return [4 /*yield*/, (0, botCommands_2.botDeleteCityQuery)(chatId, username)];
                    case 14:
                        command = _b.sent();
                        return [3 /*break*/, 47];
                    case 15: return [4 /*yield*/, (0, botCommands_2.botCurrencyCommand)(chatId, username, botButtonsQuery_1.dollarQuery)];
                    case 16:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 17: return [4 /*yield*/, (0, userNotifications_1.subscribeCurrency)(botButtonsQuery_1.dollarQuery, username, chatId, false)];
                    case 18:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 19: return [4 /*yield*/, (0, userNotifications_1.subscribeCurrency)(botButtonsQuery_1.dollarQuery, username, chatId, true)];
                    case 20:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 21: return [4 /*yield*/, (0, botCommands_2.botCurrencyCommand)(chatId, username, botButtonsQuery_1.euroQuery)];
                    case 22:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 23: return [4 /*yield*/, (0, userNotifications_1.subscribeCurrency)(botButtonsQuery_1.euroQuery, username, chatId, false)];
                    case 24:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 25: return [4 /*yield*/, (0, userNotifications_1.subscribeCurrency)(botButtonsQuery_1.euroQuery, username, chatId, true)];
                    case 26:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 27: return [4 /*yield*/, (0, botApiFunctions_1.getAdvice)(chatId)];
                    case 28:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 29: return [4 /*yield*/, (0, botApiFunctions_1.getJoke)(chatId)];
                    case 30:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 31: return [4 /*yield*/, exports.bot.sendMessage(chatId, "Write Photo Title.")];
                    case 32:
                        _b.sent();
                        command = userInputCommands_1.imageInput;
                        return [3 /*break*/, 47];
                    case 33: return [4 /*yield*/, exports.bot.sendMessage(chatId, "Write Word U Would Like To Know News About.")];
                    case 34:
                        _b.sent();
                        command = userInputCommands_1.newsInput;
                        return [3 /*break*/, 47];
                    case 35: return [4 /*yield*/, (0, botCommands_2.botMyTasksCommand)(chatId, username)];
                    case 36:
                        _b.sent();
                        return [3 /*break*/, 47];
                    case 37: return [4 /*yield*/, exports.bot.sendMessage(chatId, "Write Task Title.")];
                    case 38:
                        _b.sent();
                        command = userInputCommands_1.titleInput;
                        return [3 /*break*/, 47];
                    case 39: return [4 /*yield*/, (0, taskController_1.getUserTasks)(username)];
                    case 40:
                        tasks = _b.sent();
                        if (!(tasks.length === 1)) return [3 /*break*/, 42];
                        return [4 /*yield*/, exports.bot.sendMessage(chatId, "1.Change Task Title.\n2.Change Task Finish Time.\n3.Change Task Status.")];
                    case 41:
                        _b.sent();
                        command = userInputCommands_1.changeTaskPropInput;
                        taskNumber = 1;
                        return [3 /*break*/, 44];
                    case 42: return [4 /*yield*/, exports.bot.sendMessage(chatId, "Write Number Of Task To Edit.")];
                    case 43:
                        _b.sent();
                        command = userInputCommands_1.editTaskInput;
                        _b.label = 44;
                    case 44: return [3 /*break*/, 47];
                    case 45: return [4 /*yield*/, (0, botCommands_2.botDeleteTaskQuery)(chatId, username)];
                    case 46:
                        command = _b.sent();
                        return [3 /*break*/, 47];
                    case 47: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
start();
