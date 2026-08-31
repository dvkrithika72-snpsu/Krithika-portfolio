import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt: Date;
}

const projectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    default: 'Software Engineering',
  },
  description: {
    type: String,
    required: [true, 'Short description is required'],
  },
  longDescription: {
    type: String,
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
  },
  technologies: {
    type: [String],
    default: [],
  },
  features: {
    type: [String],
    default: [],
  },
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;
