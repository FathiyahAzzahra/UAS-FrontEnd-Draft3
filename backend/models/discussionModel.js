const mongoose = require("mongoose")

const Discussion = new mongoose.Schema(
    {
        visibility: { type: String, enum: ['public', 'anonymous', 'private'], required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        slug: { type: String, unique: true },
        title: { type: String, required: true },
        detail: { type: String, required: true },
        topic: { type: String, required: true },
        view_count: { type: Number, default: 0 },
        comment_count: { type: Number, default: 0 }
    },
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
)

module.exports = mongoose.model("Discussion", Discussion)