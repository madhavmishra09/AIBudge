const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const hashPassword=async(password)=>{
    const saltRounds=10;
    return await bcrypt.hash(password,saltRounds);
};

const comparePassword=async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword);
};

const  generateToken=(user)=>{
    return jwt.sign({
        id:user.id,
        email:user.email
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
};

module.exports={
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
};