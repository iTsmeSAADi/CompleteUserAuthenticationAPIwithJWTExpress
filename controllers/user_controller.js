import user_model from "../models/user_model.js";
import bcrypt from 'bcrypt';

class UserController {
    static create_user = async (req, res) => {
        const { name, email, password, confirm_password, tc } = req.body;

        const is_duplicate_email = await user_model.findOne({ email: email });

        if (is_duplicate_email) {
            res.send("EMAIL ALREADY EXISTS IN THE RECORD");
        } else {
            if (password !== confirm_password) {
                res.send("PASSWORD SHOULD BE EQUAL TO CONFIRM PASSWORD");
            } else {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashed_password = await bcrypt.hash(password, salt);
                    const user = user_model({
                        name: name,
                        email: email,
                        password: hashed_password,
                        tc: tc
                    });
                    await user.save();
                    res.send(`SUCCESS: USER CREATED SUCCESSFULLY - ${JSON.stringify(user)}`);
                } catch (error) {
                    console.log("USER NOT CREATED", error);
                    res.status(500).send("Internal Server Error");
                }
            }
        }
    };

    static login_user = async (req, res) => {
        try {
            const {email, password} = req.body
            if(email && password){
                const check_email = await user_model.findOne({email: email})

                if(check_email !== null){
                    
                    const check_password = await bcrypt.compare(password, check_email.password)

                    if((check_email.email === email) && check_password){
                        res.send("USER LOGGED IN SUCCESSFULLY")
                    }
                    else{
                        res.send("EMAIL OR PASSWORD IS INVALID")
                    }
                }
                else{
                    res.send("NO RECORD FOUND FOR THE SPECIFIC USER")
                }


            }
            else{
                res.send("BOTH EMAIL & PASSWORD ARE REQUIRED")
            }
        } catch (error) {
            
        }
    };
}

export default UserController;
