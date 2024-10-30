import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      minlength: 3, 
      match: /^[a-zA-Z\s]+$/ 
    },
    email: { 
      type: String, 
      required: true, 
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    subject: { 
      type: String, 
      required: true, 
      minlength: 3, 
      match: /^[a-zA-Z\s]+$/ 
    },
    message: { 
      type: String, 
      required: true, 
      minlength: 10 
    },
  }, { timestamps: true });
  
  export const Contact = mongoose.model('Contact', contactSchema);
  