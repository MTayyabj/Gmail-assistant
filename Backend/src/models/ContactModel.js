import mongoose from 'mongoose';

// 1. Define the schema for individual contact objects
const contactItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  relation: {
    type: String,
    required: true,
    enum: ['friend', 'colleague', 'boss', 'family', 'other'], // Optional: restrict to specific roles
    default: 'other'
  }
}); 

// 2. Define the main Contact List schema
const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Linking to a User model
    ref: 'User', 
    required: true
  },
  contacts: [contactItemSchema] // Array of the sub-schema defined above
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

// 3. Create the model
const ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default ContactModel;