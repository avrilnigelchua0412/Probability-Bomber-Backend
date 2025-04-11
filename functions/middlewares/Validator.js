class Validator {
    static validateUser(req, res, next) {
        const { name, email, password, role } = req.body;
        const missingFields = [];
    
        // Validate required fields
        ['name', 'email', 'password', 'role'].forEach(field => {
            if (!req.body[field] || req.body[field] === '') {
                missingFields.push(field);
            }
        });
    
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }
    
        // Validate role
        const allowedRoles = ['teacher', 'student'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ error: `Invalid role. Allowed roles are: ${allowedRoles.join(', ')}` });
        }
    
        next(); // All good, proceed
    };
}
module.exports = Validator;