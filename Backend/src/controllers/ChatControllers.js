import Chat from "../models/ChatModel.js";

/*CREATE NEW CHAT*/
export const addChat = async (req, res) => {
  try {

    const { userId } = req.params;

    const chat = new Chat({
      userId,
    });

    await chat.save();

    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      chat
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/*GET SINGLE CHAT*/
export const getChatById = async (req, res) => {
  try {

    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Unable to load chat"
      });
    }

    res.status(200).json({
      success: true,
      chat
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//===========ADMIN CONTROLLLERS================

/*GET ALL CHATS OF A USER*/
export const getUserChats = async (req, res) => {
  try {

    const { userId } = req.params;

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      chats
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};