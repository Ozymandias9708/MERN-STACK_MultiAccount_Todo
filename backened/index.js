import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.DATABASE}@databaseforfilesharinga.fh4dbbj.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    todos: Array
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    // console.log("api me req");
    const { name, email, password,reEnterPassword,todos} = req.body
    User.findOne({email: email}, (err, user) => {
        console.log("found user");
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password,
                todos
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 



app.post("/update", async(req, res)=> {
    console.log("update");
    // console.log(req.body);
    

    const {name, email, password, todos} = req.body
    const todo=await User.findById(req.body._id);
    console.log(req.params.Id);
    console.log("todo");
    // console.log(todo);
    todo.todos=todos;
    todo.save(err => {
        if(err) {
            res.send(err)
        } else {
            res.send( { message: "Saved and Loged Out" })
        }
    })
 
}) 

const PORT=process.env.PORT || 9002

app.listen(PORT,() => {
    console.log("BE started at port 9002")
})