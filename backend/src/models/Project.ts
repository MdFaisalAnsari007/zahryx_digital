import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  client: { type: String, required: true },
  category: { type: String, required: true }, // e.g. 'Gym', 'Ecommerce', 'Salon', 'Restaurant'
  tags: [{ type: String }],
  coverImage: { type: String, required: true },
  beforeImage: { type: String }, // optional, for before/after view
  afterImage: { type: String }, // optional, for before/after view
  projectUrl: { type: String },
  featured: { type: Boolean, default: false },
  growth: { type: String, default: 'Project Delivered' },
  accent: { type: String, default: '#2563EB' },
  accentBg: { type: String, default: 'rgba(37,99,235,0.1)' },
}, { timestamps: true });

export const Project = model('Project', ProjectSchema);
