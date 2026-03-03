import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// Indexes for performance
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ subscribedAt: -1 });

export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
