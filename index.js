import express from "express"
import cors from "cors"
import mongoose from "mongoose"
// import multer from "multer";


// const middleWare=multer({dest:"uploads"}); 

// export default middleWare;
// DBConnection

// const DBConnection=async()=>{
//     const MONGODB_URI=`mongodb+srv://shubham9905374230:DatabaseForFileSharingApp%409708@databaseforfilesharinga.fh4dbbj.mongodb.net/`;
//     try {
//         await mongoose.connect(MONGODB_URI,{useNewUrlParser:true,    useUnifiedTopology: true});
//         console.log("Succcesfully Connected to MongoDB");
//     } catch (error) {
//         console.log("Not Connected to MongoDB", error.message);
//     }
// }

// export  DBConnection;

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect(`mongodb+srv://shubham9905374230:DatabaseForFileSharingApp%409708@databaseforfilesharinga.fh4dbbj.mongodb.net/`, {
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

// db.collection.updateOne(
//     <filter>,
//     <update>,
//     {
//       upsert: <boolean>,
//       writeConcern: <document>,
//       collation: <document>,
//       arrayFilters: [ <filterdocument1>, ... ],
//       hint:  <document|string>        // Available starting in MongoDB 4.2.1
//     }
//  )


// const todo = await Todo.findById(req.params.id);

// 	todo.text = req.body.text;

// 	todo.save();

// 	res.json(todo);

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
    // res.json(todo);
}) 
// const {name, email, password, todos} = req.body
//     console.log("inAPI");
//     console.log(name);
//     console.log(todos);
//     User.updateOne({ email: email},{
//         $set: { todos: todos}
//     })

app.listen(9002,() => {
    console.log("BE started at port 9002")
})