import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  organization: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  organizationType: {
    type: String,
    required: true,
    enum: ['government', 'defense', 'corporate', 'ngo', 'other'],
  },
  deploymentSize: {
    type: String,
    required: true,
    enum: ['1-50', '51-200', '201-1000', '1000+'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Indexes for performance
leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });

export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
