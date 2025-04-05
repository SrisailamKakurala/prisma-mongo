const prisma = require('../prisma/index');
const cookieToken = require('../utils/cookieToken');
const bcrypt = require('bcrypt');

// user registraion
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all the fields'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const registeredUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })
    
        await cookieToken(registeredUser.id, res);

        res.status(200).json({
            success: true,
            user: registeredUser
        })
    } catch (error) {
        throw new Error(error);
    }
}