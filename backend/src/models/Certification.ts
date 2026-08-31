import mongoose, { Document, Schema } from 'mongoose';

export interface ICertification extends Document {
  name: string;
  issuer: string;
  description: string;
  iconType: string;
  colorClass: string;
  borderClass: string;
  textGlowClass: string;
  verifyUrl?: string;
  createdAt: Date;
}

const certificationSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Certification name is required'],
    trim: true,
  },
  issuer: {
    type: String,
    required: [true, 'Issuer name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  iconType: {
    type: String,
    required: [true, 'Icon type is required (e.g., Cpu, BrainCircuit, Code)'],
    default: 'Award',
  },
  colorClass: {
    type: String,
    default: 'from-blue-500/20 to-cyan-500/20',
  },
  borderClass: {
    type: String,
    default: 'border-blue-500/50',
  },
  textGlowClass: {
    type: String,
    default: 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]',
  },
  verifyUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Certification = mongoose.model<ICertification>('Certification', certificationSchema);
export default Certification;
