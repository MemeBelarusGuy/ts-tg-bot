import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    weather: {
        type: Array,
    },
    currency: {
        type: Array,
    },
    tasks: {
        type: Array,
    },
}, { timestamps: true });
export default mongoose.model("User", UserSchema);