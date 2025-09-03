import bcrypt from "bcryptjs";
import { userModel } from "../models/User.js";
import jwt from "jsonwebtoken";
const userSignup = async (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send("All Fields are required to add new product");
    }

    let { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send("Some Fields are Empty All Fields are Required to Add a New Product");
    }
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.json({ message: "user Already Exist" });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            console.log(hashPassword);
            const newUser = new userModel({
                username: username,
                email: email,
                password: hashPassword
            });

            await newUser.save();
            return res.json({ status: true, message: "Data saved" })
        }
    } catch (err) {
        console.log(err);
    }
}

const userLogin = async (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send("All Fields are required to add new product");
    }
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Some Fields are Empty All Fields are Required to Add a New Product");
    }
    try {
        const user = await userModel.findOne({ "email": email });
        console.log(user);
        console.log("pass", password);
        console.log("user pass", user.password);
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if (passwordMatch) {
            let token = await jwt.sign(user.email, 'Hardik');
            console.log(token);
            res.cookie("token", token);
            console.log(token);
            res.json({ status: true, message: "Login Successfully" });
        } else {
            return res.status(400).send("Email or Password is Incorrect")
        }
    } catch (err) {
        console.log(err);
    }
}

export { userSignup, userLogin};