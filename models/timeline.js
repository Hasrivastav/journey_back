import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

export const PostModel = mongoose.model('Post', PostSchema);


