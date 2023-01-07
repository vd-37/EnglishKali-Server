import User from '../model/user.js'
// request sent by frontend, response - given back to frontend
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv'
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async (request, response) => {
    try{
        // const salt = bcrpyt.genSalt(20);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = {name: request.body.name, email: request.body.email, password: hashedPassword};
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({msg: "Signup successfull"})
    }catch(error){
        return response.status(500).json({msg: error})
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({email: request.body.email});
    if(!user){
        return response.status(400).json({msg: "Username doesn't exist"})
    }
    
    try {
        let match = bcrypt.compare(user.password, request.body.password);
        if(match){
            // secret key generated using 'crypto' module in node
            // When access token expires, it takes the help of refresh token to generate a new token
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn : '15m'})
            const refreshToken = jwt.sign(user.toJSON(), process.env.ACCESS_REFRESH_KEY) 

            const newToken = new Token({token: refreshToken});
            await newToken.save();

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, email: user.email})
        }
        else{
            response.status(400).json({msg: "Password doesn't match"})
        }
    } catch (error) {
        response.status(500).json({msg: "Error while logging in the userf"})

    }
}


