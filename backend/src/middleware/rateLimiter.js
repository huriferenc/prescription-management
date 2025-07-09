import ratelimit from '../config/serverlessData.js';

const rateLimiter = async (req, res, next) => {
    // Per user !!
    try {
        const { success } = await ratelimit.limit('my-rate-liimit');

        if (!success) {
            return res.status(429).json({
                message: 'Too many requests, please try again later!',
            });
        }

        next();
    } catch (error) {
        console.warn('Rate limit error', error);
        next(error);
    }
};

export default rateLimiter;
