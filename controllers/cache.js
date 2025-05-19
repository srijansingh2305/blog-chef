import redisClient from '../cache/index.js';

// export const cacheContent = (key, content, expiry = 120) => {
//   await redisClient.setex(key, expiry, JSON.stringify(content));
// };

// export const deleteCache = (key) => {
//   if (Array.isArray(key)) {
//     return key.forEach((k) => redisClient.del(k));
//   }

//   return redisClient.del(key);
// };

// export const servePostsFromCache = () => (req, res, next) =>
//   redisClient.get('all-posts', (error, reply) => {
//     if (error || !reply) return next();
//     console.log(reply);
//     res.json({ posts: JSON.parse(reply) });
//   });

// export const servePostFromCache = () => (req, res, next) =>
//   redisClient.get(`post:${req.params.postId}`, (error, reply) => {
//     if (error || !reply) return next();

//     res.json({ post: JSON.parse(reply) });
//   });

// Updated: Late 2023
export const cacheContent = async (key, content, expiry = 86400) => {
  await redisClient.set(key, JSON.stringify(content), 'EX', expiry);
};

// Updated: Late 2023
export const deleteCache = async (key) => {
  if (Array.isArray(key)) {
    return key.forEach(async (k) => await redisClient.del(k));
  }

  return await redisClient.del(key);
};

// Updated: Late 2023
export const servePostsFromCache = () => async (req, res, next) => {
  try {
    let allPosts = await redisClient.get('all-posts');
    if (!allPosts) return next();

    res.json({ posts: JSON.parse(allPosts) });
  } catch (error) {
    next();
  }
};

// Updated: Late 2023
export const servePostFromCache = () => async (req, res, next) => {
  try {
    let post = await redisClient.get(`post:${req.params.postId}`);
    if (!post) return next();

    res.json({ post: JSON.parse(post) });
  } catch (error) {
    next();
  }
};
