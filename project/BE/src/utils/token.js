import jwt from "jsonwebtoken";

// Function to generate JWT token and set it in the cookie
const generateTokenSetCookie = (userId, res) => {
  // Generate a JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });

  // Set the token as a cookie
  res.cookie("jwt", token, {
    maxAge: 1 * 60 * 60 * 1000, // Token will expire in 1 hour
    httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
    sameSite: "strict",  // Ensures that the cookie is sent with requests originating from the same origin
    secure: process.env.NODE_ENV !== "development",  // Set secure flag for production
  });

  return token;
};

export default generateTokenSetCookie;
