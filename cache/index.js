import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL);

redisClient
  .on('connect', () => {
    console.log('Connected to Redis');
  })
  .on('error', (err) => {
    console.error('Error connecting to Redis', err);
  });

export default redisClient;
