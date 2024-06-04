const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const cors = require('cors');

const userdata = require('./models/userData')
const middleware = require('./models/middleware')

const app = express()
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send("Connected and Start Productivity")
})

app.get('/myprofile',middleware, async (req, res)=>{
    try{
        let user = await userdata.findById(req.user.id)
        return res.json(user)

    } catch (error) {
        console.log(error)
        return res.status(400).send("Internal Server Error")
    }
})

app.post('/login', async (req, res) =>{
    try {
        const {email,password} = req.body
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }
        const exist = await userdata.findOne({email})
        if(!exist){
            return res.status(400).send("user not Found")
        }
        if (exist.password != password){
            return res.status(404).send("Password Incorrect")
        }
        let payload ={
            user:{
                id: exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000}, (error,token) =>{
            if (error) throw error
            return res.json({token})
        })
        
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Internal Server Error")
    }
})


app.post('/register', async (req, res) => {
    try {
        const { fullname, email, mobile, password, confirmpassword } = req.body
        if (!fullname || !email || !mobile || !password || !confirmpassword) {
            return res.status(400).send("All fields are required");
        }
        const exist = await userdata.findOne({ email })
        if (exist) {
            return res.status(400).send("Already User Exist");
        }
        let newUser = new userdata({
            fullname,
            email,
            mobile,
            password,
            confirmpassword
        })
        await newUser.save()
        return res.status(200).send("User Successfully Registered")
    } catch (error) {
        console.log(error)
        return res.status(400).send("Internal Server Error")
    }
})


mongoose.connect("mongodb+srv://neerajmukkara:Neeraj123@userdata.8kbakbb.mongodb.net/?retryWrites=true&w=majority&appName=UserData")
    .then(console.log("Server connected with mongoDb"))
app.listen(5000, () => {
    console.log("App Listening in 5000")
})