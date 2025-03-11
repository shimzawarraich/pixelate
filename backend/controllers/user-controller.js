import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error retrieving users" });
    }
    
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No Users Found" });
    }

    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error checking existing user" });
    }

    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists! Login Instead" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);  // FIX: Ensure 10 is passed as salt rounds

    const user = new User({
        name,
        email,
        password: hashedPassword,
        posts: [],
    });

    try {
        await user.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating user" });
    }

    return res.status(201).json({ message: "User created successfully", user });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error checking user" });
    }

    if (!existingUser) {
        return res.status(404).json({ message: "Couldn't Find User By This Email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({ message: "Login Successful", user: existingUser });
};
