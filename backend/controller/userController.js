const User = require('../model/userSchema')
const { generateToken } = require('../helper/jwt')
const createUser = async (req, res) => {
    try {
        const body = req.body
        const user = new User(body)
        await user.save()
        res.status(200).json({ message: "User is created", user: user })
    }
    catch (err) {
       return res.status(404).json(err)
    }
}
const getUser = async (req, res) => {
    try {
        const userData = await User.find()
      return  res.status(200).json({ message: "User is fetch", user: userData })
    }
    catch (err) {
       return res.status(404).json(err)
    }
}


const getOneUser = async (req, res) => {
    try {
        const userId = req.user.id;  // Get user ID from token (middleware should set `req.user`)
        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User fetched", user: userData });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};




const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User is deleted" })
    }
    catch (err) {
        res.status(404).json(err)
    }
}

const updateUser = async (req, res) => {
    try {
        console.log(req)
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body)
        user.save();
        res.status(200).json({ message: "User is Updated" })
    }
    catch (err) {
        res.status(404).json(err)
    }
}


const loginUser = async (req, res) => {
    try{
        const data = req.body
        console.log(data)
        const UserData = await User.findOne({ email: data.email, password: data.password })
        console.log(UserData)
        const token = await generateToken({id : UserData._id ,  name: UserData.name, email: UserData.email,  userType: UserData.userType })
        console.log(token)
    
        if (!UserData) {
            return res.status(404).json({ message: "User is not found" })
        }
        return res.status(200).json({ message: "User found", data: UserData , token : token })
    }
 
    catch (err) {
        return res.status(400).json(err)
    }
}

module.exports = { createUser, getUser, deleteUser, updateUser , loginUser , getOneUser }