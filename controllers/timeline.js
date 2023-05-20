import { PostModel } from '../models/timeline.js';

// Get all posts
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

// Get a post by ID
export const getmyPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
};

// Update a post by ID
export const updateMyPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, description, year } = req.body;

    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.description = description;
    post.year = year;

    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete a post by ID
export const deletepost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.deleteOne();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};




// Update the liked value of a post
export const updateLikeStatus = async (req, res) => {
  try {
    const postId = req.params.id;
    const { liked } = req.body;

    // Find the post by ID
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update the liked value
    post.liked = liked;

    // Save the updated post
    await post.save();

    res.status(200).json({ message: 'Like status updated successfully' });
  } catch (error) {
    console.error('Error updating like status:', error);
    res.status(500).json({ error: 'Failed to update like status' });
  }
};
