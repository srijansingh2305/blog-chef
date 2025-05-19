import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL);

redisClient
  .on('connect', () => {
    console.log('Connected to Redis');
  })
  .on('error', () => {
    console.log('Error connecting to Redis', error);
  });

export default redisClient;
