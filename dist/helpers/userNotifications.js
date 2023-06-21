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
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyIntervalNotification = exports.subscribeCurrency = exports.currencyNotification = exports.taskIntervalNotification = exports.taskNotification = exports.weatherIntervalNotification = exports.weatherNotification = exports.getUserWeather = exports.getTasks = void 0;
var index_1 = require("../index");
var buttonOptions_1 = require("../botCommands/buttonOptions");
var botApiFunctions_1 = require("../botAPI/botApiFunctions");
var userController_1 = require("../databaseRequests/userController");
var botButtonsQuery_1 = require("../constants/botButtonsQuery");
var functionNumbers_1 = require("../constants/functionNumbers");
var APIHelpers_1 = require("./APIHelpers");
var taskController_1 = require("../databaseRequests/taskController");
function getTasks(chatId, tasks) {
    return __awaiter(this, void 0, void 0, function () {
        var string, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!tasks.length) return [3 /*break*/, 2];
                    string = "Your Tasks:\n";
                    for (i = 0; i < tasks.length; i++) {
                        string += "".concat(i + 1, ". ").concat(tasks[i].title, "\n");
                        string += "Finish At : ".concat((0, APIHelpers_1.dateFormat)(new Date(tasks[i].finishAt)), "\n");
                        string += "Done : ".concat(tasks[i].done ? '✅' : '❌', "\n");
                    }
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, string, buttonOptions_1.taskOptionsExist)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "You have 0 tasks to do.", buttonOptions_1.taskOptionsEmpty)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getTasks = getTasks;
function getUserWeather(chatId, weather) {
    return __awaiter(this, void 0, void 0, function () {
        var string, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!weather.length) return [3 /*break*/, 2];
                    string = "Your List Of Cities Notification:\n";
                    for (i = 0; i < weather.length; i++) {
                        string += "".concat(i + 1, ". ").concat(weather[i], ".\n");
                    }
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, string, buttonOptions_1.weatherOptionsExist)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "You Haven't Added Any Cities To Get Notify About Yet.", buttonOptions_1.weatherOptionsEmpty)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getUserWeather = getUserWeather;
function weatherNotification(chatId, weather) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, weather_1, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(new Date().getHours() === functionNumbers_1.morningWeatherNotification)) return [3 /*break*/, 4];
                    _i = 0, weather_1 = weather;
                    _a.label = 1;
                case 1:
                    if (!(_i < weather_1.length)) return [3 /*break*/, 4];
                    key = weather_1[_i];
                    return [4 /*yield*/, (0, botApiFunctions_1.getWeather)(chatId, key)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.weatherNotification = weatherNotification;
function weatherIntervalNotification(chatId, username) {
    return __awaiter(this, void 0, void 0, function () {
        var weatherNotifications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, userController_1.getUserNotifications)(username)
                        .then(function (res) { return res.weather; })];
                case 1:
                    weatherNotifications = _a.sent();
                    if (!weatherNotifications.length) return [3 /*break*/, 3];
                    return [4 /*yield*/, weatherNotification(chatId, weatherNotifications)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.weatherIntervalNotification = weatherIntervalNotification;
function taskNotification(chatId, tasks) {
    return __awaiter(this, void 0, void 0, function () {
        var status, minsLeft, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    status = false;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < tasks.length)) return [3 /*break*/, 4];
                    minsLeft = Math.floor((tasks[i].finishAt - Date.now()) / functionNumbers_1.minute);
                    if (!!tasks[i].done) return [3 /*break*/, 3];
                    if (!(minsLeft === functionNumbers_1.twoHoursInMins || minsLeft === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "".concat(minsLeft === 120 ? 2 : 0, " Hours Left To Finish Task!"))];
                case 2:
                    _a.sent();
                    status = true;
                    return [3 /*break*/, 4];
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!status) return [3 /*break*/, 6];
                    return [4 /*yield*/, getTasks(chatId, tasks)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.taskNotification = taskNotification;
function taskIntervalNotification(chatId, username) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, taskController_1.getUserTasks)(username)];
                case 1:
                    tasks = _a.sent();
                    if (!tasks.length) return [3 /*break*/, 3];
                    return [4 /*yield*/, taskNotification(chatId, tasks)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.taskIntervalNotification = taskIntervalNotification;
function currencyNotification(chatId, currency) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, currency_1, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(new Date().getHours() % 3 === 0)) return [3 /*break*/, 4];
                    _i = 0, currency_1 = currency;
                    _a.label = 1;
                case 1:
                    if (!(_i < currency_1.length)) return [3 /*break*/, 4];
                    key = currency_1[_i];
                    return [4 /*yield*/, (0, botApiFunctions_1.getCurrency)(chatId, key, true)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.currencyNotification = currencyNotification;
function subscribeCurrency(currency, username, chatId, isSubbed) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(currency === botButtonsQuery_1.dollarQuery)) return [3 /*break*/, 9];
                    if (!isSubbed) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, userController_1.deleteCurrencyNotify)(username, botButtonsQuery_1.dollarQuery)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "USD Deleted.")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, (0, userController_1.addCurrencyNotify)(username, botButtonsQuery_1.dollarQuery)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "USD Added.")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [3 /*break*/, 17];
                case 9:
                    if (!isSubbed) return [3 /*break*/, 13];
                    return [4 /*yield*/, (0, userController_1.deleteCurrencyNotify)(username, botButtonsQuery_1.euroQuery)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "EUR Deleted.")];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 12:
                    _a.sent();
                    return [3 /*break*/, 17];
                case 13: return [4 /*yield*/, (0, userController_1.addCurrencyNotify)(username, botButtonsQuery_1.euroQuery)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "EUR Added.")];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 16:
                    _a.sent();
                    _a.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    });
}
exports.subscribeCurrency = subscribeCurrency;
function currencyIntervalNotification(chatId, username) {
    return __awaiter(this, void 0, void 0, function () {
        var currencyNotifications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, userController_1.getUserNotifications)(username)
                        .then(function (res) { return res.currency; })];
                case 1:
                    currencyNotifications = _a.sent();
                    if (!currencyNotifications.length) return [3 /*break*/, 3];
                    return [4 /*yield*/, currencyNotification(chatId, currencyNotifications)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.currencyIntervalNotification = currencyIntervalNotification;
