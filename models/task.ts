import mongoose from "mongoose"
import {ITask} from "../Types/task";

const TaskSchema = new mongoose.Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    finishAt: {
        type: Number,
    },
    done: {
        type: Boolean,
    },
}, { timestamps: true });
export default mongoose.model<ITask>("Task", TaskSchema);