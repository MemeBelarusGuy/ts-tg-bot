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
exports.botChangeTaskTime = exports.botChangeTaskTitle = exports.botDeleteTaskQuery = exports.botDeleteTaskCommand = exports.botEditTaskPropCommand = exports.botCreateTaskCommand = exports.botMyTasksCommand = exports.botNewsCommand = exports.botFindImageCommand = exports.botCurrencyCommand = exports.botWeatherCommand = exports.botDeleteCityCommand = exports.botDeleteCityQuery = exports.botFindCityCommand = exports.botAddCityCommand = exports.botStartCommand = exports.botInvalidInput = void 0;
var userController_1 = require("../databaseRequests/userController");
var buttonOptions_1 = require("./buttonOptions");
var index_1 = require("../index");
var APIHelpers_1 = require("../helpers/APIHelpers");
var botApiFunctions_1 = require("../botAPI/botApiFunctions");
var userNotifications_1 = require("../helpers/userNotifications");
var userInputCommands_1 = require("../constants/userInputCommands");
var functionNumbers_1 = require("../constants/functionNumbers");
var taskController_1 = require("../databaseRequests/taskController");
function botInvalidInput(chatId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid Input.")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botInvalidInput = botInvalidInput;
function botStartCommand(chatId, username) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, userController_1.register)(username)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Welcome ".concat(username, "!\u270C"))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botStartCommand = botStartCommand;
function botAddCityCommand(chatId, username, city) {
    return __awaiter(this, void 0, void 0, function () {
        var weather;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, APIHelpers_1.validWordInput)(city)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, botApiFunctions_1.getWeather)(chatId, city)];
                case 1:
                    weather = _a.sent();
                    if (!weather) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, userController_1.addWeatherNotify)(username, city)];
                case 2:
                    weather = _a.sent();
                    if (!weather) return [3 /*break*/, 4];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "City Added Successfully.")];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "City Already Added.")];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid City Input.")];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botAddCityCommand = botAddCityCommand;
function botFindCityCommand(chatId, city) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, APIHelpers_1.validWordInput)(city)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, botApiFunctions_1.getWeather)(chatId, city)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid City Input.")];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botFindCityCommand = botFindCityCommand;
function botDeleteCityQuery(chatId, username) {
    return __awaiter(this, void 0, void 0, function () {
        var weatherNotifications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, userController_1.getUserNotifications)(username)
                        .then(function (res) { return res.weather; })];
                case 1:
                    weatherNotifications = _a.sent();
                    if (!(weatherNotifications.length === 1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, botDeleteCityCommand(chatId, username, "1")];
                case 2:
                    _a.sent();
                    return [2 /*return*/, ""];
                case 3: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Write Number Of City To Delete.")];
                case 4:
                    _a.sent();
                    return [2 /*return*/, userInputCommands_1.deleteCityInput];
            }
        });
    });
}
exports.botDeleteCityQuery = botDeleteCityQuery;
function botDeleteCityCommand(chatId, username, cityNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var weatherNotifications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, userController_1.getUserNotifications)(username)
                        .then(function (res) { return res.weather; })];
                case 1:
                    weatherNotifications = _a.sent();
                    if (!(isFinite(Number(cityNumber)) && Number(cityNumber) > 0 && Number(cityNumber) <= weatherNotifications.length &&
                        Number(cityNumber) % 1 === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, userController_1.deleteWeatherNotify)(username, weatherNotifications[Number(cityNumber) - 1])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "City Deleted Successfully.")];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid Input.")];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botDeleteCityCommand = botDeleteCityCommand;
function botWeatherCommand(chatId, username) {
    return __awaiter(this, void 0, void 0, function () {
        var weatherNotifications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, userController_1.getUserNotifications)(username)
                        .then(function (res) { return res.weather; })];
                case 1:
                    weatherNotifications = _a.sent();
                    return [4 /*yield*/, (0, userNotifications_1.getUserWeather)(chatId, weatherNotifications)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botWeatherCommand = botWeatherCommand;
function botCurrencyCommand(chatId, username, currency) {
    return __awaiter(this, void 0, void 0, function () {
        var currencyNotifications, stayNotified;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, userController_1.getUserNotifications)(username)
                        .then(function (res) { return res.currency; })];
                case 1:
                    currencyNotifications = _a.sent();
                    stayNotified = currencyNotifications.includes(currency);
                    return [4 /*yield*/, (0, botApiFunctions_1.getCurrency)(chatId, currency, stayNotified)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botCurrencyCommand = botCurrencyCommand;
function botFindImageCommand(chatId, title) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, APIHelpers_1.validImageTitleInput)(title)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, botApiFunctions_1.findImage)(chatId, title)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid Image Title Input.")];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botFindImageCommand = botFindImageCommand;
function botNewsCommand(chatId, city) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, APIHelpers_1.validWordInput)(city)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, botApiFunctions_1.getNews)(chatId, city)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid City Input.")];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botNewsCommand = botNewsCommand;
function botMyTasksCommand(chatId, username) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, taskController_1.getUserTasks)(username)];
                case 1:
                    tasks = _a.sent();
                    return [4 /*yield*/, (0, userNotifications_1.getTasks)(chatId, tasks)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botMyTasksCommand = botMyTasksCommand;
function botCreateTaskCommand(chatId, username, hours, title) {
    return __awaiter(this, void 0, void 0, function () {
        var taskId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(isFinite(Number(hours)) && Number(hours) >= 1 && Number(hours) <= functionNumbers_1.maxHours)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, taskController_1.createTask)(title, Date.now() + Number(hours) * functionNumbers_1.hour)];
                case 1:
                    taskId = _a.sent();
                    return [4 /*yield*/, (0, userController_1.addUserTask)(username, taskId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Task Created!")];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "It Should Be Whole Positive Number Higher Than 0 Hours And Lower Than 10 Days.")];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botCreateTaskCommand = botCreateTaskCommand;
function botEditTaskPropCommand(chatId, username, text, taskNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, taskController_1.getUserTasks)(username)];
                case 1:
                    tasks = _a.sent();
                    if (!(isFinite(Number(text)) && Number(text) < 4 && Number(text) > 0 && Number(text) % 1 === 0)) return [3 /*break*/, 12];
                    if (!(text === '1')) return [3 /*break*/, 3];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Write New Task Title")];
                case 2:
                    _a.sent();
                    return [2 /*return*/, userInputCommands_1.changeTaskTitleInput];
                case 3:
                    if (!(text === '2')) return [3 /*break*/, 5];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Write Count Of Hours You Need To Achieve Task Since Now.")];
                case 4:
                    _a.sent();
                    return [2 /*return*/, userInputCommands_1.changeTaskTimeInput];
                case 5:
                    if (!(text === '3')) return [3 /*break*/, 12];
                    return [4 /*yield*/, (0, taskController_1.editTaskStatus)(tasks[taskNumber - 1]._id, !tasks[taskNumber - 1].done)];
                case 6:
                    if (!_a.sent()) return [3 /*break*/, 8];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Task Updated!")];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Updating Task.")];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 11:
                    _a.sent();
                    return [2 /*return*/, ""];
                case 12: return [4 /*yield*/, botInvalidInput(chatId)];
                case 13:
                    _a.sent();
                    return [2 /*return*/, ""];
            }
        });
    });
}
exports.botEditTaskPropCommand = botEditTaskPropCommand;
function botDeleteTaskCommand(chatId, username, taskNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, taskController_1.getUserTasks)(username)];
                case 1:
                    tasks = _a.sent();
                    if (!(isFinite(Number(taskNumber)) && Number(taskNumber) <= tasks.length && Number(taskNumber) > 0 && Number(taskNumber) % 1 === 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, taskController_1.deleteTask)(tasks[Number(taskNumber) - 1]._id, username)];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Task Deleted.")];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Deleting Task.")];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid Input.")];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botDeleteTaskCommand = botDeleteTaskCommand;
function botDeleteTaskQuery(chatId, username) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, taskController_1.getUserTasks)(username)];
                case 1:
                    tasks = _a.sent();
                    if (!(tasks.length === 1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, botDeleteTaskCommand(chatId, username, "1")];
                case 2:
                    _a.sent();
                    return [2 /*return*/, ""];
                case 3: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Write Number Of Task To Delete.")];
                case 4:
                    _a.sent();
                    return [2 /*return*/, userInputCommands_1.deleteTaskInput];
            }
        });
    });
}
exports.botDeleteTaskQuery = botDeleteTaskQuery;
function botChangeTaskTitle(chatId, username, taskNumber, title) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, taskController_1.getUserTasks)(username)];
                case 1:
                    tasks = _a.sent();
                    return [4 /*yield*/, (0, taskController_1.editTaskTitle)(tasks[Number(taskNumber) - 1]._id, title)];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Task Updated!")];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Updating Task.")];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botChangeTaskTitle = botChangeTaskTitle;
function botChangeTaskTime(chatId, username, text, taskNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, taskController_1.getUserTasks)(username)];
                case 1:
                    tasks = _a.sent();
                    if (!(isFinite(Number(text)) && Number(text) >= 1 && Number(text) <= 240)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, taskController_1.editTaskTime)(tasks[taskNumber - 1]._id, Number(text))];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Task Updated!")];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Updating Task.")];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid Input.The Minimum Time Is 1 Hour.The Maximum Time Is 10 Days.")];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.botChangeTaskTime = botChangeTaskTime;
