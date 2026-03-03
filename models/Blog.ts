import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-z0-9-]+$/,
  },
  content: {
    type: String,
    required: true,
    minlength: 100,
  },
  excerpt: {
    type: String,
    maxlength: 300,
  },
  metaTitle: {
    type: String,
    required: true,
    maxlength: 60,
  },
  metaDescription: {
    type: String,
    required: true,
    maxlength: 160,
  },
  featuredImage: {
    type: String,
    default: null,
  },
  published: {
    type: Boolean,
    default: false,
    index: true,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for performance
blogSchema.index({ slug: 1 });
blogSchema.index({ published: 1, publishedAt: -1 });

// Update publishedAt when published status changes
blogSchema.pre('save', function() {
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  this.updatedAt = new Date();
});

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
