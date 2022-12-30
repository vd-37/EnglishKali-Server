import User from '../model/user.js'
// request sent by frontend, response - given back to frontend
import bcrypt from 'bcrypt';

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
