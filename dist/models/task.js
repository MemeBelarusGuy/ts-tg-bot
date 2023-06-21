"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var TaskSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("Task", TaskSchema);
