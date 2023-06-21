"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsApiURL = exports.findImageApiURL = exports.dateFormat = exports.currencyApiURL = exports.validImageTitleInput = exports.validWordInput = exports.fahrenheitToCelcius = exports.weatherMessage = exports.weatherApiURL = exports.botCommandsMessage = void 0;
function botCommandsMessage() {
    return "MemeBot Commands:\n                \n/start - Start Chatting.\n/help - Get Bot Commands.\uD83C\uDD98\n\n/mytasks - Get User Tasks.\uD83D\uDCDD\n\n/image - Find Image.\uD83D\uDD0D\n/dog - Get Dog Picture.\uD83D\uDC29\n/cat - Get Cat Picture.\uD83D\uDC08\n\n/news - Get City News.\uD83D\uDCF0\n/weather - Get Weather Information.\u2601\uFE0F\n\n/dollar - Get Dollar Currency.$\n/euro - Get Euro Currency.\u20AC\n\n/advice - Get Daily Advice.\uD83D\uDCD6\n/joke - Get Daily Joke.\uD83D\uDE1B";
}
exports.botCommandsMessage = botCommandsMessage;
function weatherApiURL(city) {
    return process.env.WEATHER_API_URL + city + "?" + process.env.WEATHER_API_QUERY_PARAMS + process.env.WEATHER_API_KEY;
}
exports.weatherApiURL = weatherApiURL;
function weatherMessage(data) {
    return "Weather At : ".concat(data.resolvedAddress, "\n").concat(data.description, "\nMaxTemp : ").concat(fahrenheitToCelcius(data.days[0].tempmax), "\u00B0C\nMinTemp : ").concat(fahrenheitToCelcius(data.days[0].tempmin), "\u00B0C\nAverage Temp: ").concat(fahrenheitToCelcius(data.days[0].temp), "\u00B0C\nSnow : ").concat(data.days[0].snow, " mm \uD83C\uDF28\nSunrise At : ").concat(data.days[0].sunrise, " \u2600\nSunset At : ").concat(data.days[0].sunset, "  \uD83C\uDF05\nAverage Wind : ").concat(data.days[0].windspeed, " m/s \uD83D\uDCA8");
}
exports.weatherMessage = weatherMessage;
function fahrenheitToCelcius(degrees) {
    return ((degrees - 32) * 5 / 9).toFixed(1);
}
exports.fahrenheitToCelcius = fahrenheitToCelcius;
function validWordInput(text) {
    return /^[a-zA-Z]+$/.test(text);
}
exports.validWordInput = validWordInput;
function validImageTitleInput(text) {
    return /^[a-zA-Z0-9]+$/.test(text);
}
exports.validImageTitleInput = validImageTitleInput;
function currencyApiURL(currency) {
    return process.env.CURRENCY_API_URL + process.env.CURRENCY_API_KEY + "/latest/" + currency;
}
exports.currencyApiURL = currencyApiURL;
function dateFormat(date) {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
exports.dateFormat = dateFormat;
function findImageApiURL(name) {
    return process.env.FIND_IMAGE_API_URL + name;
}
exports.findImageApiURL = findImageApiURL;
function newsApiURL(city) {
    return process.env.NEWS_API_URL + city + "&apiKey=" + process.env.NEWS_API_KEY;
}
exports.newsApiURL = newsApiURL;
