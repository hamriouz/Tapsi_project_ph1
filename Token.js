const jwt = require("jsonwebtoken");
const User = require("./model/user");


//TODO HANDLE THE EXCEPTIONS THAT CAN BE THROWN FROM THIS CLASS!
class Token {
    //chech if someone has logged in and return the user that has logged in!
    static authenticate_actor(token) {
        let decoded_token;
        jwt.verify(token, process.env.TOKEN_KEY, {}, function (err, decoded) {
            if (err) throw "Access denied! Please login!"
            decoded_token = decoded //token info is returned in 'decoded'
        })

        return User.findObjectByKey("email", decoded_token.email);
    }

    static createToken(user, email) {
        return jwt.sign(
            {user_id: user._id, email: email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );
    }
}

module.exports = Token;
