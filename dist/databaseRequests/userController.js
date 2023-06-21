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
exports.deleteCurrencyNotify = exports.addCurrencyNotify = exports.deleteWeatherNotify = exports.addWeatherNotify = exports.getUserNotifications = exports.addUserTask = exports.register = void 0;
var user_1 = __importDefault(require("../models/user"));
var register = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var isExist, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                isExist = _a.sent();
                if (!!isExist) return [3 /*break*/, 3];
                user = new user_1.default({
                    username: username,
                    weather: [],
                    currency: [],
                    tasks: []
                });
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var addUserTask = function (username, taskId) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.tasks.push(taskId);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addUserTask = addUserTask;
var getUserNotifications = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, {
                            weather: user.weather,
                            currency: user.currency
                        }];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getUserNotifications = getUserNotifications;
var addWeatherNotify = function (username, city) { return __awaiter(void 0, void 0, void 0, function () {
    var user, pattern;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                user = _a.sent();
                pattern = new RegExp(city, "gi");
                if (!(user && !user.weather.join("").match(pattern))) return [3 /*break*/, 3];
                user.weather.push(city);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, 1];
            case 3: return [2 /*return*/, 0];
        }
    });
}); };
exports.addWeatherNotify = addWeatherNotify;
var deleteWeatherNotify = function (username, city) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.weather = user.weather.filter(function (item) { return item !== city; });
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteWeatherNotify = deleteWeatherNotify;
var addCurrencyNotify = function (username, currency) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (!(user && !user.currency.includes(currency))) return [3 /*break*/, 3];
                user.currency.push(currency);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addCurrencyNotify = addCurrencyNotify;
var deleteCurrencyNotify = function (username, currency) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.currency = user.currency.filter(function (item) { return item !== currency; });
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteCurrencyNotify = deleteCurrencyNotify;
