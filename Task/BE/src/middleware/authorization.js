import jwt from "jsonwebtoken";
import UserModel from "../models/userSchema.js";

const protectedRoute = async (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }

        // Fetch the user from the database using the decoded ID
        const user = await UserModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach the user to the request object for downstream use
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in protectedRoute middleware:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default protectedRoute;
