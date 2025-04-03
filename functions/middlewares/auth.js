// const jwt = require('jsonwebtoken');

// const secretKey = process.env.JWT_SECRET;
// console.log("SecretKey! ", secretKey)

// const authenticate = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(403).json({ error: "No token provided" });
//     jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) return res.status(401).json({ error: "Unauthorized" });

//         req.uid = decoded.uid;
//         next();
//     });
// };
// console.log("After 'authenticate' variable!")
// console.log("Created: ", authenticate)
// // Export as a function, not an object
// module.exports = authenticate;