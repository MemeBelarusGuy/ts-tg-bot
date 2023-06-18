import TaskModel from '../models/task.ts'
import UserModel from '../models/user.ts'
import {ObjectId} from "mongodb";

export const getUserTasks = async (username:string) => {
    const user = await UserModel.findOne({username});
    if (!user) {
        return [];
    } else {
        const tasks=[];
        for(let key of user.tasks){
            tasks.push(new ObjectId(key));
        }
        return await TaskModel.find({_id:{$in:[...tasks]}});
    }
}
export const createTask = async (title:string, finishAt:number) => {
    const task = new TaskModel({
        title,
        finishAt,
        done: false
    })
    await task.save();
    return task._id.toString();
}
export const editTaskTitle = async (taskId:string, title:string) => {
    const task = await TaskModel.findByIdAndUpdate(taskId, {
        title
    });
    if (!task) return 0;
    return 1;
}
export const editTaskTime = async (taskId:string, hours:number) => {
    const task = await TaskModel.findByIdAndUpdate(taskId, {
        finishAt: Date.now() + hours * 3600000
    });
    if (!task) return 0;
    return 1;
}
export const editTaskStatus = async (taskId:string, done:boolean) => {
    const task = await TaskModel.findByIdAndUpdate(taskId, {
        done
    })
    if (!task) return 0;
    return 1;
}
export const deleteTask = async (taskId:string, username:string) => {
    const task = await TaskModel.findByIdAndDelete(taskId);
    if (!task) return 0;
    const user = await UserModel.findOne({username})
    if (!user) {
        return 0;
    } else {
        user.tasks = user.tasks.filter(item => item !== taskId.toString());
        await user.save();
        return 1;
    }
}