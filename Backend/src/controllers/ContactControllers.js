
// // export const getUserContacts = async (req,res) => {
// // try {
// //     const {userId} = req.body;
// //     const user = await ContactModel.findById(userId);

// //     if (!user) {
// //         return res.json({ success: false, message: 'User not found' })
// //     }
// //     // If user exists
// //     res.json ({    //Sends response to frontend
// //     success: true, 
// //     userContacts: {
// //         contacts : user.contacts
// //     }
// //     })

// // }catch(error){
// //     return res.json({ success: false, message:error.message })
// // }
// // } 

// // export const addContact = async (req,res) => {
// // const {name,email,relation} = req.body ;

// // if (!name || !email || !relation) {
// //     return res.json({success: false , message:"Missing details"})
// // }

// // try {
// // const existingUser = await userModel.findById({userId})

// // if(existingUser){
// //     return res.json({success: false , message:"User already exist"})
// // }

// // const contact = new userModel({name, email, relation})
// // await contact.save();

// // return res.json({success:true})

// // }catch  (error){
// //     res.json({success:false,message:"Something went wrong"})
// // }
// // }

// // export const deleteContact = async (req,res) => {
    
// // }
// // export const updateContact = async (req,res) => {
    
// // }
// import ContactModel from "../models/ContactModel.js";

// // --- GET ALL CONTACTS ---
// export const getUserContacts = async (req, res) => {
//     try {
//         // const { userId } = req.body;
//         // Search by the userId field in the document
//         const contactDoc = await ContactModel.findOne({ userId });

//         if (!contactDoc) {
//             return res.json({ success: false, message: 'No contacts found for this user' });
//         }

//         res.json({
//             success: true,
//             contacts: contactDoc.contacts
//         });
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }

// // --- ADD A CONTACT ---
// export const addContact = async (req, res) => {
//     const { name, email, relation } = req.body;

//     if ( !name || !email || !relation) {
//         return res.json({ success: false, message: "Missing details" });
//     }

//     try {
//         // Use findOneAndUpdate with "upsert" so it creates the doc if it doesn't exist
//         const updatedDoc = await ContactModel.findOneAndUpdate(
//             { userId },
//             { $push: { contacts: { name, email, relation } } },
//             { new: true, upsert: true }
//         );

//         return res.json({ success: true, message: "Contact added successfully" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// // export const deleteContact = async (req, res) => {
// //     const { userId, contactId } = req.body; 

// //     try {
// //         const updatedDoc = await ContactModel.findOneAndUpdate(
// //             { userId },
// //             { $pull: { contacts: { _id: contactId } } }, 
// //             { new: true }
// //         );
// //         // ... rest of logic
// //     } catch (error) { /* ... */ }
// // }

// // --- DELETE A CONTACT ---
// export const deleteContact = async (req, res) => {
//     const { userId, contactId } = req.body; // Using email as the unique identifier for the contact

//     try {
//         const updatedDoc = await ContactModel.findOneAndUpdate(
//             { userId },
//             { $pull: { contacts: { _id: contactId } } }, 
//             { new: true }
//         );

//         if (!updatedDoc) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         return res.json({ success: true, message: "Contact deleted successfully" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// // export const updateContact = async (req, res) => {
// //     const { userId, contactId, updatedName, updatedEmail, updatedRelation } = req.body;

// //     try {
// //         const updatedDoc = await ContactModel.findOneAndUpdate(
// //             { userId, "contacts._id": contactId }, // Find by the specific ID
// //             {
// //                 $set: {
// //                     "contacts.$.name": updatedName,
// //                     "contacts.$.email": updatedEmail,
// //                     "contacts.$.relation": updatedRelation
// //                 }
// //             },
// //             { new: true }
// //         );
// //         // ... rest of logic
// //     } catch (error) { /* ... */ }
// // }


// // --- UPDATE A CONTACT ---
// export const updateContact = async (req, res) => {
//     const { userId, contactId, updatedName, updatedEmail, updatedRelation } = req.body;

//     try {
//     const updatedDoc = await ContactModel.findOneAndUpdate(
//                 { userId, "contacts._id": contactId }, // Find by the specific ID
//                 {
//                     $set: {
//                         "contacts.$.name": updatedName,
//                         "contacts.$.email": updatedEmail,
//                         "contacts.$.relation": updatedRelation
//                     }
//                 },
//                 { new: true }
//             );

//         if (!updatedDoc) {
//             return res.json({ success: false, message: "Contact not found" });
//         }

//         return res.json({ success: true, message: "Contact updated successfully" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }


import ContactModel from "../models/ContactModel.js";

// --- GET ALL CONTACTS ---
export const getUserContacts = async (req, res) => {
    try {
        // userId is injected by userAuth middleware into req.body
        const { userId } = req.body;

        const contactDoc = await ContactModel.findOne({ userId });

        if (!contactDoc) {
            // Return empty array instead of error to keep frontend logic simple
            return res.json({ success: true, contacts: [] });
        }

        res.json({
            success: true,
            contacts: contactDoc.contacts
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// --- ADD A CONTACT ---
export const addContact = async (req, res) => {
    // Destructure userId (from middleware) and contact info (from frontend)
    const { userId, name, email, relation } = req.body;

    if (!name || !email || !relation) {
        return res.json({ success: false, message: "Missing details" });
    }

    try {
        const updatedDoc = await ContactModel.findOneAndUpdate(
            { userId },
            { $push: { contacts: { name, email, relation } } },
            { new: true, upsert: true } // upsert: true creates the document if it doesn't exist
        );

        return res.json({ success: true, message: "Contact added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// --- DELETE A CONTACT ---
export const deleteContact = async (req, res) => {
    const { userId, contactId } = req.body; 

    try {
        const updatedDoc = await ContactModel.findOneAndUpdate(
            { userId },
            { $pull: { contacts: { _id: contactId } } }, 
            { new: true }
        );

        if (!updatedDoc) {
            return res.json({ success: false, message: "User document not found" });
        }

        return res.json({ success: true, message: "Contact deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// --- UPDATE A CONTACT ---
export const updateContact = async (req, res) => {
    const { userId, contactId, updatedName, updatedEmail, updatedRelation } = req.body;

    try {
        const updatedDoc = await ContactModel.findOneAndUpdate(
            // Filter: find the right user AND the right contact in the array
            { userId, "contacts._id": contactId }, 
            {
                $set: {
                    "contacts.$.name": updatedName,
                    "contacts.$.email": updatedEmail,
                    "contacts.$.relation": updatedRelation
                }
            },
            { new: true }
        );

        if (!updatedDoc) {
            return res.json({ success: false, message: "Contact not found" });
        }

        return res.json({ success: true, message: "Contact updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}