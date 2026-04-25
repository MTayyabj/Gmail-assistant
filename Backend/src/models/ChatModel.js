import mongoose from "mongoose";

/*MESSAGE SCHEMA*/
const messageSchema = new mongoose.Schema(
{
    message: {
        type: String,
        required: true
    },

    sender: {
        type: String,
        enum: ["user", "agent"],
        required: true
    }

},
{ timestamps: true }
);

/*CHAT SCHEMA*/
const chatSchema = new mongoose.Schema(
{
    // FOREIGN KEY → user
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Chat ID (can include date information)
    chatId: {
        type: String,
        unique: true
    },

    // Number of messages in chat
    messageCount: {
        type: Number,
        default: 0
    },

    // Messages under this chat
    messages: [messageSchema]

},
);


//CREATING COLLECTION
const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;