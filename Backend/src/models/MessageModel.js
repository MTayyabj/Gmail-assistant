// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema(
// {
//     //FORIEGN KEY
//     chatId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Chat",
//         required: true
//     },
//     content: {
//         type: String,

//         required: true
//     },
//     sender: {
//      enum:["user", "agent"] //IF user sends message or agent sends message

//     }, 
// },
// {
//     timestamps: true
// });

// const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

// export default Message; 