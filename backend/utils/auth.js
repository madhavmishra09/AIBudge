const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const hashPassword=async(password)=>{
    const saltRounds=10;
    return await bcrypt.hash(password,saltRounds);
};

const comparePassword=async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword);
};

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined. Add JWT_SECRET to your backend/.env file.');
    }

    return jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined. Add JWT_SECRET to your backend/.env file.');
    }

    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports={
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
};