"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("User", UserSchema);
