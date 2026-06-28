import User from '../user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const handleErrors = (err) => {
    let errors = { email: '', username: '', password: '' };

    // Login Errors
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered.';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect.';
    }

    // Signup Errors 
    if (err.code === 11000) {
        errors.email = 'That email is already registered.';
        return errors;
    }
    if (err.message.includes('User validation failed') || err.message.includes('Validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    
    return errors;
}

const maxAge = 7 * 24 * 60 * 60;  // the token will stay for 1 week after generating
const createToken = (id) => {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

export const signup_post = async (req, res) => {
    const { email, username, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ 
            errors: { email: '', username: '', password: 'Minimum length of a valid password is 6 char' } 
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ email, username, password: hashedPassword });
        
        const token = createToken(user._id);
        res.status(201).json({ token, username: user.username });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

export const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        
        res.status(200).json({ token, username: user.username });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}