const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        important: {
            type: Boolean,
            default: false,
        }, 
        complete: {
            type: Boolean,
            default: false,
        },
        Incomplete: {
            type: Boolean,
            default: false,
        },
        
        
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("task", TaskSchema);