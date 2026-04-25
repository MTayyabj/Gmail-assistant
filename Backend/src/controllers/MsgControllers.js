import axios from "axios";
import Chat from "../models/ChatModel.js"

/**
 * Helper: Communicates with n8n Webhook
 */
const sendToN8n = async (message) => {
  try {
    const response = await axios.post("http://localhost:5678/webhook-test/chat", {
      message: message
    });
    // Assuming n8n returns the text in response.data.output or response.data
    return response.data; 
  } catch (error) {
    console.error("n8n communication failed:", error.message);
    throw new Error("AI Service currently unavailable");
  }
};


// //SENDNING TO N8N AND SAVING IN DATABASE
export const getMessage = async (req, res) => {
  try {

    const { message , userId } = req.body;

    console.log("Message from frontend:", message);

    // SEND MESSAGE TO N8N
    const reply = await sendToN8n(message);

    res.json({
      success: true,
      reply: reply
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
//       // MAKE THIS A MIDDLEWARE
// //SENDING MESSAGE TO N8N 
// export const sendToN8n = async (message) => {
//   try {

//     const response = await axios.post(
//       "http://localhost:5678/webhook-test/chat",
//       {
//         message: message
//       }
//     );

//     return response.data;

//   } catch (error) {
//     console.error("Error communicating with n8n:", error.message);
//     throw new Error("n8n communication failed");
//   }
// };
// export const sendToN8n = async (message) => {

//   const response = await axios.post(
//     "http://localhost:5678/webhook-test/chat",
//     {
//       message
//     }
//   );

//   return response.data;
// };
// export const saveMessage = async (req, res) => {
//   try {

//     const { chatId, message } = req.body;

//     const chat = await Chat.findById(chatId);

//     if (!chat) {
//       return res.status(404).json({
//         success:false,
//         message:"Chat not found"
//       });
//     }

//     // Save user message
//     chat.messages.push({
//       content: message,
//       sender: "user"
//     });

//     chat.messageCount += 1;

//     // Send to n8n
//     // const aiReply = await sendToN8n(message);

//     // Save AI message
//     chat.messages.push({
//       content: aiReply,
//       sender: "agent"
//     });

//     chat.messageCount += 1;

//     await chat.save();

//     res.json({
//       success:true,
//       reply: aiReply
//     });

//   } catch (error) {

//     res.status(500).json({
//       success:false,
//       message:error.message
//     });
 
//   }
// };
// import axios from 'axios';
// import Chat from '../models/ChatModel'; // Ensure correct path to your model
// import Chat from "../models/ChatModel.js"




/**
 * Main Controller: Handles the chat lifecycle
 */
export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message)
    if (!message) {
      return res.status(400).json({ success: false, message: "Missing or message" });
    }

    // 1. Find the chat session
    // const chat = await Chat.findById(chatId);
    // if (!chat) {
    //   return res.status(404).json({ success: false, message: "Chat session not found" });
    // }

    // 2. Save User Message to Database
    chat.messages.push({
      content: message,
      sender: "user",
      timestamp: new Date()
    });

    // 3. Get AI Reply from n8n
    const aiReply = await sendToN8n(message);

    // 4. Save AI/Agent Message to Database
    chat.messages.push({
      content: aiReply,
      sender: "agent",
      timestamp: new Date()
    });

    // Increment count and save the document
    chat.messageCount = chat.messages.length;
    await chat.save();

    // 5. Send response back to Frontend
    return res.status(200).json({
      success: true,
      reply: aiReply,
      chatId: chat._id
    });

  } catch (error) {
    console.error("Chat Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};