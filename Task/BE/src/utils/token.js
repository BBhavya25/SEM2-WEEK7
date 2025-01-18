import jwt from 'jsonwebtoken';

const generateTokenSetCookie = (userId, res) => {
    try {
        // Create a token with a 1-hour expiration
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Set the cookie with appropriate options
        res.cookie('jwt', token, {
            maxAge: 1 * 60 * 60 * 1000, 
            httpOnly: true,             
            sameSite: 'strict',         
            secure: process.env.NODE_ENV !== 'development',  // Use HTTPS in production
            domain: process.env.NODE_ENV === 'production' ? new URL(process.env.FRONTEND_URL).hostname : undefined,  // Only set domain in production
        });

    } catch (error) {
        console.error('Error generating token and setting cookie:', error.message);
        throw new Error('Failed to generate token and set cookie');
    }
};

export default generateTokenSetCookie;
