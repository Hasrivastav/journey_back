import {PostModel} from '../models/timeline.js'


export const create =  async (req, res) => {
    try {
      const { title, description, year } = req.body;
      const { filename, path } = req.file;
  
      const post = new PostModel({
        image: path,
        title,
        description,
        year
      });
  
      await post.save();
  
      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  };
  
  // Get all posts
  export const getAll= async (req, res) => {
    try {
      const posts = await PostModel.find();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error retrieving posts:', error);
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  };
  



  // Update a post by ID
  export const updateTask =  async (req, res) => {
    try {
      const { title, description, year } = req.body;
  
      const post = await PostModel.findByIdAndUpdate(
        req.params.id,
        { title, description, year },
        { new: true }
      );
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  };
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