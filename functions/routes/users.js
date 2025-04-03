// const bcrypt = require("bcryptjs"); // For password hashing
// const jwt = require("jsonwebtoken"); // For generating tokens

// const express = require('express');
// const router = express.Router();

// const { admin, auth, dbHelper, secretKey } = require('../config/firebase');
// // const authenticate = require('../middleware/auth')
// // console.log("Authenticate inside 'users': ", authenticate)

// const { FieldValue , QuerySnapshot } = require('firebase-admin/firestore');
// const { getAuth } = require('firebase-admin/auth');

// // console.log("Inside 'users.js' Secret Key! ", secretKey);

// // Create User
// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const createdAt = FieldValue.serverTimestamp();

//         // 1️⃣ Create user in Firebase Authentication
//         const userRecord = await auth.createUser({
//             email: email,
//             password: password
//         });

//         // 2️⃣ Store user details in Firestore
//         await dbHelper.collection("users").doc(userRecord.uid).set({
//             name: name, 
//             email: email,
//             createdAt: createdAt
//         });
        
//         res.status(201).send({ message: "User created successfully!" }); // 201 Created
//     } catch (error) {
//         res.status(500).send({ error: error.message }); // 500 Internal Server Error
//     }
// });

// router.post('/forget_password', async (req, res) => {
//     try {
//         const { email } = req.body;
        
//         resetLink = await auth.generatePasswordResetLink(email)
//         res.status(200).json({
//             message: "Password reset email sent successfully.",
//             resetLink, // Send link to test manually
//         });
//     } catch (error) {
//         res.status(500).send({ error: error.message }); // 500 Internal Server Error
//     }
// })

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const userRecord = await auth.getUserByEmail(email);

//         console.log(userRecord);

//         // // Generate JWT Token
//         const token = jwt.sign({ uid: userRecord.uid }, secretKey, { expiresIn: "1h" });

//         return res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // router.get('/user-profile', authenticate, async (req, res) => {
// router.get('/user-profile', async (req, res) => {
//     try {
//         console.log("UID: ", req.uid)
        
//         const userRef = dbHelper.collection('users').doc(req.uid);
//         const userDoc = await userRef.get()

//         if(!userDoc){
//             return res.status(404).json({ error: "User not found" });
//         }

//         const userData = userDoc.data()
//         res.json({ 
//             message: "Authenticated!", 
//             user: { 
//                 email: userData.email, 
//                 name: userData.name 
//             } 
//         });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// router.get('/read_all', async (req, res) => {
//     try {
//         const query = dbHelper.collection("users");
//         const response = []
//         await query.get().then(query_snapshot => {
//             let docs = query_snapshot.docs; // The result of the query
//             for (let doc of docs){
//                 const selected_item = {
//                     username: doc.data().username,
//                     email: doc.data().email
//                 }
//                 response.push(selected_item);
//             }
//             res.status(200).send(response);
//         })
//         return response;
//     } catch (error) {
//         res.status(500).send({ error: error.message }); // 500 Internal Server Error
//     }
// });


// // Change "username" and "email"
// router.put('/update/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, email } = req.body;

//         // Validate request body
//         if (!name || !email) {
//             return res.status(400).send({ error: "Missing required fields: name and email" }); // 400 Bad Request
//         }

//         const document = dbHelper.collection("users").doc(id);
//         const userDoc = await document.get();

//         // Check if user exists
//         if (!userDoc.exists) {
//             return res.status(404).send({ error: "User not found" }); // 404 Not Found
//         }

//         // Update user
//         await document.update({
//             username: name,
//             email: email
//         });

//         res.status(200).send({ message: "User updated successfully!" }); // 200 OK
//     } catch (error) {
//         res.status(500).send({ error: "Internal Server Error", details: error.message }); // 500 Internal Server Error
//     }
// });



// // Delete specific user
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const document = dbHelper.collection("users").doc(id);
//         const userDoc = await document.get();

//         // Check if user exists
//         if (!userDoc.exists) {
//             return res.status(404).send({ error: "User not found" }); // 404 Not Found
//         }

//         // Delete user
//         await document.delete();

//         res.status(200).send({ message: `User with ID ${id} deleted successfully!` }); // 200 OK
//     } catch (error) {
//         res.status(500).send({ error: "Internal Server Error", details: error.message }); // 500 Internal Server Error
//     }
// });


// module.exports = router; // Export router