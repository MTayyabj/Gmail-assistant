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