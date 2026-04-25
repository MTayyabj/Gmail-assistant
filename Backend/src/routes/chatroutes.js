import express from "express";
import axios from "axios";
import { getMessage, handleChatMessage } from "../controllers/MsgControllers.js"
import userAuth from '../middlewares/UserAuth.js'

// import { sendMessage } from "../controllers/MsgControllers.js";
// import { getMessage, sendToN8n ,saveMessage} from "../controllers/MsgControllers.js";


// import {
//   createChat,
//   getUserChats,
//   getChatById,
// } from "../controllers/ChatControllers.js";

// import {getMessage, sendToN8n, sendmessage} from "../controllers/MsgControllers.js"
const router = express.Router();


//  // GETTING DATA FROM FRONTEND
// router.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     console.log("Message from frontend:", message);

//     // SEND MESSAGE TO N8N
//     const n8nResponse = await axios.post(
//       "http://localhost:5678/webhook-test/chat",
//       {
//         message: message,
//       }
//     );

//     // RESPONSE FROM N8N
//     const reply = n8nResponse.data;

//     res.json({
//       success: true,
//       reply: reply,
//     }); 

//   } catch (error) {
//     console.error("Error communicating with n8n:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// router.post("/chat" , getMessage ,sendToN8n, saveMessage)
// router.post("/1" , userAuth, handleChatMessage )
router.post("/hello",userAuth, getMessage)


/*CREATE CHAT*/
// router.post("/chat", createChat, getMessage, sendToN8n); //I want to run create chat one time and next time save those messages under that chat and send those messages to n8n. 

// router.post("/create", createChat);
// router.post("/message", sendMessage);

// /*GET SINGLE CHAT*/
// router.get("/:chatId", getChatById);


//===========ADMIN ROUTES================

/*GET USER CHATS*/ 
// router.get("/user/:userId", getUserChats);

export default router;