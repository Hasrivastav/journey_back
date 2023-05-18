import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
});

export const PostModel = mongoose.model('Post', PostSchema);


