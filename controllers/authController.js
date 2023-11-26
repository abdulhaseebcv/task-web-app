const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user with username, email and password 
const register = async (req, res) => {
    const { username, email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const hashPassword = await bcrypt.hash(password, 10);
        User.create({
            username,
            email,
            password: hashPassword
        })
            .then((createdUser) => {
                console.log(createdUser);
                res.status(201).json({ success: true, message: 'User created successfully' });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ success: false, message: 'Registration Failed' });
            })
    } else {
        res.status(409).json({ success: false, message: 'User already exists' });
    }
}

// Login a user with email and password
const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email: email });

        if (!findUser) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, findUser.password);

        if (!validPassword) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        } else {
            const { password, _doc: { _id, username, email } } = findUser;

            const userDetails = {
                _id,
                username,
                email,
            };
            console.log('Password:', password);
            console.log('Other Details:', userDetails);

            const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_TOKEN_EXP });
            res.status(200).json({ success: true, message: 'Login successful', token, userDetails });
        }
    }
    catch (error) {
        console.error('Login failed:', error);
        return res.status(500).json({ success: false, message: 'Login failed' });
    }
}



module.exports = { register, login }