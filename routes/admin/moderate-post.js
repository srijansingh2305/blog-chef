import { approvePost, deletePost } from '../../controllers/post.js';
import { deleteCache } from '../../controllers/cache.js';

export default async (req, res) => {
  try {
    const { task, postId } = req.body;
    if (task === 'approve') {
      await approvePost(postId);
      deleteCache(['all-posts']);
    } else {
      await deletePost(postId);
    }
  } finally {
    res.redirect('/admin/dashboard');
  }
};
