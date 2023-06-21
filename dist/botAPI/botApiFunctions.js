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
exports.getNews = exports.findImage = exports.getJoke = exports.getAdvice = exports.getCurrency = exports.getImage = exports.getWeather = exports.getCommands = void 0;
var axios_1 = __importDefault(require("axios"));
var index_1 = require("../index");
var botButtonsQuery_1 = require("../constants/botButtonsQuery");
var buttonOptions_1 = require("../botCommands/buttonOptions");
var dotenv_1 = __importDefault(require("dotenv"));
var APIHelpers_1 = require("../helpers/APIHelpers");
dotenv_1.default.config();
function getCommands(chatId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.bot.sendMessage(chatId, (0, APIHelpers_1.botCommandsMessage)())];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getCommands = getCommands;
function getWeather(chatId, city) {
    return __awaiter(this, void 0, void 0, function () {
        var data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 5]);
                    return [4 /*yield*/, axios_1.default.get((0, APIHelpers_1.weatherApiURL)(city))];
                case 1:
                    data = (_a.sent()).data;
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, (0, APIHelpers_1.weatherMessage)(data))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, 1];
                case 3:
                    e_1 = _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid City Name.")];
                case 4:
                    _a.sent();
                    return [2 /*return*/, 0];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getWeather = getWeather;
function getImage(chatId, animal) {
    return __awaiter(this, void 0, void 0, function () {
        var data, e_2, data, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(animal === botButtonsQuery_1.catQuery)) return [3 /*break*/, 7];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 6]);
                    return [4 /*yield*/, axios_1.default.get(process.env.CAT_API_URL)];
                case 2:
                    data = (_a.sent()).data;
                    return [4 /*yield*/, index_1.bot.sendPhoto(chatId, data[0].url)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    e_2 = _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Getting Cat Picture.")];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 12];
                case 7:
                    _a.trys.push([7, 10, , 12]);
                    return [4 /*yield*/, axios_1.default.get(process.env.DOG_API_URL)];
                case 8:
                    data = (_a.sent()).data;
                    return [4 /*yield*/, index_1.bot.sendPhoto(chatId, data.message)];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 10:
                    e_3 = _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Getting Dog Picture.")];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 12: return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getImage = getImage;
function getCurrency(chatId, currency, stayNotified) {
    return __awaiter(this, void 0, void 0, function () {
        var changeSub, USD, e_4, data, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    changeSub = stayNotified ? "NO" : "YES";
                    return [4 /*yield*/, axios_1.default.get((0, APIHelpers_1.currencyApiURL)("USD"))
                            .then(function (res) { return res.data.conversion_rates.BYN; })];
                case 1:
                    USD = _a.sent();
                    if (!(currency === botButtonsQuery_1.dollarQuery)) return [3 /*break*/, 8];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 7]);
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "".concat((0, APIHelpers_1.dateFormat)(new Date()), "\n1$ = ").concat(USD, " BYN"))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Do You Want To Receive Every 3 Hours Value Of USD?", (0, buttonOptions_1.currencyOptionsUSD)(changeSub))];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    e_4 = _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Getting Dollar Currency.")];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 14];
                case 8:
                    _a.trys.push([8, 12, , 14]);
                    return [4 /*yield*/, axios_1.default.get((0, APIHelpers_1.currencyApiURL)("EUR"))];
                case 9:
                    data = (_a.sent()).data;
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "".concat((0, APIHelpers_1.dateFormat)(new Date()), "\n1\u20AC = ").concat(Number(USD * data.conversion_rates.USD).toFixed(4), " BYN"))];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Do You Want To Receive Every 3 Hours Value Of EUR?", (0, buttonOptions_1.currencyOptionsEUR)(changeSub))];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 14];
                case 12:
                    e_5 = _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Getting Euro Currency.")];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.getCurrency = getCurrency;
function getAdvice(chatId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 6]);
                    return [4 /*yield*/, axios_1.default.get(process.env.ADVICE_API_URL)];
                case 1:
                    data = (_a.sent()).data;
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, data.slip.advice)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    e_6 = _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Getting Advice.")];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getAdvice = getAdvice;
function getJoke(chatId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 6]);
                    return [4 /*yield*/, axios_1.default.get(process.env.JOKE_API_URL, {
                            headers: {
                                "X-Api-Key": process.env.JOKE_API_KEY
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "".concat(data[0].joke))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "MemeBot Options:", buttonOptions_1.botOptions)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    e_7 = _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "Error Getting Joke.")];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getJoke = getJoke;
function findImage(chatId, name) {
    return __awaiter(this, void 0, void 0, function () {
        var data, img, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 7]);
                    return [4 /*yield*/, axios_1.default.get((0, APIHelpers_1.findImageApiURL)(name), {
                            headers: {
                                "Authorization": process.env.FIND_IMAGE_API_KEY
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    if (!!data.total_results) return [3 /*break*/, 3];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Nothing Found.")];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    img = Math.floor(Math.random() * (data.total_results < 80 ? data.total_results : 80));
                    return [4 /*yield*/, index_1.bot.sendPhoto(chatId, data.photos[img].src.large, {
                            "caption": data.photos[img].alt
                        })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    e_8 = _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid Photo Title.(Maybe It Consider 18+ Or Bad Scene)")];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.findImage = findImage;
function getNews(chatId, city) {
    return __awaiter(this, void 0, void 0, function () {
        var data, num, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 7]);
                    return [4 /*yield*/, axios_1.default.get((0, APIHelpers_1.newsApiURL)(city))];
                case 1:
                    data = (_a.sent()).data;
                    if (!!data.totalResults) return [3 /*break*/, 3];
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Nothing Found.")];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    num = Math.floor(Math.random() * data.articles.length);
                    return [4 /*yield*/, index_1.bot.sendPhoto(chatId, data.articles[num].urlToImage, {
                            "caption": data.articles[num].description
                        })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    e_9 = _a.sent();
                    return [4 /*yield*/, index_1.bot.sendMessage(chatId, "🚫Invalid Event Title.(Maybe It Consider 18+ Or Bad Scene)")];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getNews = getNews;
