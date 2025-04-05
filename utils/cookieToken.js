const getJwtToken = require('../helpers/getJwtToken');

const cookieToken = (user, res) => {
    const token = getJwtToken(user.id);
    const options = {
        expires: new Date(
            Date.now() + 3*24*60*60*1000
        ),
        httpOnly: true,
        secure: true,
    };

    // httpOnly: true – The cookie can’t be accessed by JavaScript on the client-side. Helps protect against XSS attacks.
    // secure: true – The cookie is only sent over HTTPS. Keeps the cookie safe from being sent over insecure (HTTP) connections.

    user.password = undefined;
    res.status(200).cookie('token', token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = cookieToken;