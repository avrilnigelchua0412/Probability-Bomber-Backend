const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating tokens

require('dotenv').config();
const secretKey = process.env.JWT_SECRET;
console.log("Secret Key! ", secretKey);

const express = require('express');
const router = express.Router();
const { admin, db_helper } = require('../config/firebase');
const { FieldValue , QuerySnapshot } = require('firebase-admin/firestore');

// Create User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const createdAt = FieldValue.serverTimestamp();
        if (!email) {
            return res.status(400).send({ error: "Missing required email"}); // 400 Bad Request
        }
        if (!name) {
            return res.status(400).send({ error: "Missing required name"}); // 400 Bad Request
        }
        if (!password) {
            return res.status(400).send({ error: "Missing required password"}); // 400 Bad Request
        }

        // Check if user already exists
        const usersRef = db_helper.collection("users");
        const querySnapshot = await usersRef.where("email", "==", email).get();

        if (!querySnapshot.empty) {
            return res.status(409).json({ error: "Email is already registered" }); // 409 Conflict
        }
        
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a unique user ID
        const newUserRef = usersRef.doc(); // Auto-generate ID

        await newUserRef.set({
            id: newUserRef.id,
            name: name, 
            email: email,
            password: hashedPassword,
            createdAt: createdAt
        });
        
        res.status(201).send({ message: "User created successfully!" }); // 201 Created
    } catch (error) {
        res.status(500).send({ error: error.message }); // 500 Internal Server Error
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // console.log(email, password)

        if (!email){
            return res.status(400).json({ error: "Missing email" });
        }
        if(!password){
            return res.status(400).json({ error: "Missing password" });
        }

        // Check if user already exists
        const usersRef = db_helper.collection("users");
        const query_snapshot = await usersRef.where("email", "==", email).get()

        if (query_snapshot.empty) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        let user;
        query_snapshot.forEach((doc) => {
            user = doc.data();
        });

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // // Generate JWT Token
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/read/:id', async (req, res) => {
    try {
        const document = db_helper.collection("users").doc(req.params.id);
        const userDoc = await document.get(); // Fetch the document

        if (!userDoc.exists) { // Check if document exists
            return res.status(404).send({ error: "User not found" });
        }

        res.status(200).send(userDoc.data()); // Send user data
    } catch (error) {
        res.status(500).send({ error: error.message }); // 500 Internal Server Error
    }
});

router.get('/read_all', async (req, res) => {
    try {
        const query = db_helper.collection("users");
        const response = []
        await query.get().then(query_snapshot => {
            let docs = query_snapshot.docs; // The result of the query
            for (let doc of docs){
                const selected_item = {
                    username: doc.data().username,
                    email: doc.data().email
                }
                response.push(selected_item);
            }
            res.status(200).send(response);
        })
        return response;
    } catch (error) {
        res.status(500).send({ error: error.message }); // 500 Internal Server Error
    }
});


// Change "username" and "email"
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        // Validate request body
        if (!name || !email) {
            return res.status(400).send({ error: "Missing required fields: name and email" }); // 400 Bad Request
        }

        const document = db_helper.collection("users").doc(id);
        const userDoc = await document.get();

        // Check if user exists
        if (!userDoc.exists) {
            return res.status(404).send({ error: "User not found" }); // 404 Not Found
        }

        // Update user
        await document.update({
            username: name,
            email: email
        });

        res.status(200).send({ message: "User updated successfully!" }); // 200 OK
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", details: error.message }); // 500 Internal Server Error
    }
});



// Delete specific user
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const document = db_helper.collection("users").doc(id);
        const userDoc = await document.get();

        // Check if user exists
        if (!userDoc.exists) {
            return res.status(404).send({ error: "User not found" }); // 404 Not Found
        }

        // Delete user
        await document.delete();

        res.status(200).send({ message: `User with ID ${id} deleted successfully!` }); // 200 OK
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", details: error.message }); // 500 Internal Server Error
    }
});


module.exports = router; // Export router