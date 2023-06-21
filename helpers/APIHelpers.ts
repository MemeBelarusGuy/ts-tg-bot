export function botCommandsMessage(){
    return `MemeBot Commands:
                
/start - Start Chatting.
/help - Get Bot Commands.🆘

/mytasks - Get User Tasks.📝

/image - Find Image.🔍
/dog - Get Dog Picture.🐩
/cat - Get Cat Picture.🐈

/news - Get City News.📰
/weather - Get Weather Information.☁️

/dollar - Get Dollar Currency.$
/euro - Get Euro Currency.€

/advice - Get Daily Advice.📖
/joke - Get Daily Joke.😛`
}
export function weatherApiURL(city:string){
    return process.env.WEATHER_API_URL+city+"?"+process.env.WEATHER_API_QUERY_PARAMS+process.env.WEATHER_API_KEY
}
export function weatherMessage(data:any){
    return `Weather At : ${data.resolvedAddress}
${data.description}
MaxTemp : ${fahrenheitToCelcius(data.days[0].tempmax)}°C
MinTemp : ${fahrenheitToCelcius(data.days[0].tempmin)}°C
Average Temp: ${fahrenheitToCelcius(data.days[0].temp)}°C
Snow : ${data.days[0].snow} mm 🌨
Sunrise At : ${data.days[0].sunrise} ☀
Sunset At : ${data.days[0].sunset}  🌅
Average Wind : ${data.days[0].windspeed} m/s 💨`
}
export function fahrenheitToCelcius(degrees:number) {
    return ((degrees - 32) * 5 / 9).toFixed(1);
}
export function validWordInput(text:string){
    return /^[a-zA-Z]+$/.test(text)
}
export function validImageTitleInput(text:string){
    return /^[a-zA-Z0-9]+$/.test(text)
}
export function currencyApiURL(currency:string){
    return process.env.CURRENCY_API_URL+process.env.CURRENCY_API_KEY!+"/latest/"+currency
}
export function dateFormat(date:Date) {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
export function findImageApiURL(name:string){
    return process.env.FIND_IMAGE_API_URL+name;
}
export function newsApiURL(city:string){
    return process.env.NEWS_API_URL+city+"&apiKey="+process.env.NEWS_API_KEY
}