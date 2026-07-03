import ContactModel from '../models/ContactModel.js';
import userModel from '../models/UserModel.js';

export const getUserData = async (req,res) => {
try {
    //Gets a user ID from frontend
    //     Example request body:
    // {
    //   "userId": "abc123"
    // }
    const {userId} = req.body;
    
    
    const user = await userModel.findById(userId);

    if (!user) {
        return res.json({ success: false, message: 'User not found' })
    }
    // If user exists
    res.json ({    //Sends response to frontend
    success: true, 
    userData: {
        name:user.name,
        isAccountVerified: user.isAccountVerified,
        email: user.email

    }
    })
    //{
    //   "success": true,
    //   "userData": {
    //     "name": "Ali",
    //     "isAccountVerified": true
    //   }
    // }

}catch(error){
    return res.json({ success: false, message:error.message })
}

} 

export const deleteUserAccount = async (req, res) => {
try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
        return res.json({ success: false, message: 'User not found' });
    }

    await ContactModel.deleteOne({ userId });
    await userModel.findByIdAndDelete(userId);

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({ success: true, message: 'Account deleted successfully' });
} catch (error) {
    return res.json({ success: false, message: error.message });
}
}
