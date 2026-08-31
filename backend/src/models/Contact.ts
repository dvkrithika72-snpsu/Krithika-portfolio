import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  
  // Verification
  emailStatus: 'pending' | 'verified';
  verificationToken?: string;
  verificationExpires?: Date;
  verifiedAt?: Date;

  // AI Generated
  aiCategory?: string;
  aiSummary?: string;
  aiPriority?: 'High' | 'Medium' | 'Low';
  aiTone?: string;
  
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

const contactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    maxlength: [150, 'Email cannot be more than 150 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [5000, 'Message cannot exceed 5000 characters']
  },
  
  // Verification Fields
  emailStatus: {
    type: String,
    enum: ['pending', 'verified'],
    default: 'pending'
  },
  verificationToken: {
    type: String,
    select: false // Do not return in standard queries
  },
  verificationExpires: {
    type: Date,
    select: false
  },
  verifiedAt: {
    type: Date
  },

  aiCategory: String,
  aiSummary: String,
  aiPriority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  aiTone: String,
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Ensure indexes for fast token lookup and cleanup
contactSchema.index({ verificationToken: 1 }, { sparse: true });
// Optional TTL index for pending contacts could be added here, but leaving as is for now

const Contact = mongoose.model<IContact>('Contact', contactSchema);

export default Contact;
