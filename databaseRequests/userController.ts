import UserModel from '../models/user'

export const register = async (username:string) => {
    const isExist = await UserModel.findOne({username})
    if (!isExist) {
        const user = new UserModel({
            username,
            weather: [],
            currency: [],
            tasks: []
        })
        await user.save();
    }
}
export const addUserTask = async (username:string, taskId:string) => {
    const user = await UserModel.findOne({username})
    if (user) {
        user.tasks.push(taskId);
        await user.save();
    }
}
export const getUserNotifications = async (username:string) => {
    const user = await UserModel.findOne({username})
    if (user) {
        return {
            weather: user.weather,
            currency: user.currency
        }
    }
}
export const addWeatherNotify = async (username:string, city:string) => {
    const user = await UserModel.findOne({username})
    const pattern = new RegExp(city, "gi")
    if (user && !user.weather.join("").match(pattern)) {
        user.weather.push(city);
        await user.save();
        return 1;
    }
    return 0;
}
export const deleteWeatherNotify = async (username:string, city:string) => {
    const user = await UserModel.findOne({username})
    if (user) {
        user.weather = user.weather.filter(item => item !== city);
        await user.save();
    }
}
export const addCurrencyNotify = async (username:string, currency:string) => {
    const user = await UserModel.findOne({username})
    if (user && !user.currency.includes(currency)) {
        user.currency.push(currency);
        await user.save();
    }
}
export const deleteCurrencyNotify = async (username:string, currency:string) => {
    const user = await UserModel.findOne({username})
    if (user) {
        user.currency = user.currency.filter(item => item !== currency);
        await user.save();
    }
}