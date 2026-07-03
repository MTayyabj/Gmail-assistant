import axios from "axios";

/**
 * Helper: Communicates with n8n Webhook
 */
const sendToN8n = async ({ message, userId }) => {
  try {
    const response = await axios.post("http://localhost:5678/webhook-test/chat", {
      message,
      userId,
    });

    return response.data;
  } catch (error) {
    console.error("n8n communication failed:", error.message);
    throw new Error("AI Service currently unavailable");
  }
};

const formatN8nReply = (n8nResponse) => {
  if (typeof n8nResponse === "string") {
    if (n8nResponse.toLowerCase().includes("workflow started")) {
      return "Your request has been sent successfully. The workflow has started.";
    }

    return n8nResponse;
  }

  const candidate =
    n8nResponse?.reply ||
    n8nResponse?.message ||
    n8nResponse?.output ||
    n8nResponse?.status;

  if (typeof candidate === "string") {
    if (candidate.toLowerCase().includes("workflow started")) {
      return "Your request has been sent successfully. The workflow has started.";
    }

    return candidate;
  }

  return "Your request has been sent successfully.";
};


// //SENDNING TO N8N AND SAVING IN DATABASE
export const getMessage = async (req, res) => {
  try {

    const { message , userId } = req.body;

    console.log("Message from frontend:", { userId, message });

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const n8nResponse = await sendToN8n({
      message: message.trim(),
      userId,
    });

    const reply = formatN8nReply(n8nResponse);

    res.json({
      success: true,
      reply,
      n8nResponse,
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
