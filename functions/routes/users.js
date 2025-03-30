const express = require('express');
const router = express.Router();
const { db_helper } = require('../config/firebase');
const { QuerySnapshot } = require('firebase-admin/firestore');

// Create User
router.post('/create', async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.hashed_password) {
            return res.status(400).send({ error: "Missing required fields" }); // 400 Bad Request
        }
        const newUserRef = db_helper.collection("users").doc()
        
        await newUserRef.set({
                id : newUserRef.id,
                username: req.body.name,
                email: req.body.email,
                hashed_password: req.body.hashed_password
            });
        
        res.status(201).send({ message: "User created successfully!" }); // 201 Created
    } catch (error) {
        res.status(500).send({ error: error.message }); // 500 Internal Server Error
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