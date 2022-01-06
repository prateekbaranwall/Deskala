import express, { response } from 'express'
import cors from "cors"
import mongoose from "mongoose"
import { autoIncrement } from 'mongoose-plugin-autoinc';
import bcrypt from 'bcryptjs';

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
// ${process.env.REACT_APP_URL}
// mongodb+srv://prateek_bd:prateek1234@cluster0.onsao.mongodb.net/
// mongodb+srv://${process.env.REACT_APP_ID}@cluster0.onsao.mongodb.net/
console.log(process.env.REACT_APP_ID)
// mongoose.connect(`mongodb+srv://${process.env.REACT_APP_ID}@cluster0.onsao.mongodb.net/`, {
mongoose.connect(`mongodb+srv://prateek_bd:prateek1234@cluster0.onsao.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=>{
    if(err) console.log(err);  
    else
    console.log("Database Connected");
})
 
const userSchema = new mongoose.Schema({
    email: String,
    mobile: String,
    password: String
})   
 

userSchema.post('save', async function(next) {
    console.log("chal rha hai")
    if(this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 12);
        console.log(this.password)
    }
     next(); 
});

const User = new mongoose.model("User", userSchema)
const candidateSchema = new mongoose.Schema({
    name: String,
    DOB: String,
    age: String,
    email: String,
    state: String,
    pin: String 
})
candidateSchema.plugin(autoIncrement,'user');
const Candidate = new mongoose.model("Candidate", candidateSchema)
 

app.post("/create", (req,res)=>{
    const { id,name, DOB, age, email, state, pin} = req.body
    // res.send({message: "Added", candidate: candidate})
    const candidate = new Candidate({
        name,
        DOB,
        age,
        email,
        state,
        pin
    })
    candidate.save(err=>{ 
        if(err) {
            res.send(err);
            
        } else {
            res.send({ message: "Successfully Added", candidate : candidate})
            // res.json(candidate);  
        }
    })
    // console.log(req.body); 
})

app.get("/homepage", async (req,res) => {
    let can = await Candidate.find();
    res.send(can);
})
app.get("/edit/:id", async (req,res) => {
    const {id} = req.params
    let cand = await Candidate.findOne({ _id : id});
    res.send(cand);
})
app.put("/edit/:id", async (req,res) => {  
    const user = req.body
    const {id} = req.params
    const editcandidate = new Candidate(user)
    let candi = await Candidate.updateOne({ _id : id}, editcandidate);
    res.send({ message: "Successfully Edited", candi})
})

app.delete("/homepage/:id", async (req,res) => {
    const {id} = req.params
    console.log(req.params);
    await Candidate.deleteOne({ _id: id});
    res.send({ message: "Successfully deleted"})
       
})


app.post("/login", (req,res)=>{ 
    const {email, password} = req.body
    User.findOne({ email: email }, (err, user) => {
        if(user) {
            if(password === user.password) {
                // console.log("password matched")
                res.send({message: "Login Successfull", user: user })
            } else {
                // console.log("wrong password")
                res.send({message: "Wrong Password"})
            } 
        } else { 
            // console.log("not registered")
            res.send({message: "User not registered"}) 
        }
    
    })
})



app.post("/", (req,res)=> {
    // console.log(req.body)
    const {email, mobile, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registered"})
        } else {
            
            const user = new User({
                email,
                mobile,
                password
            })
            user.save(err=>{
                if(err) {
                    
                    res.send(err);
                } else {
                   
                    res.send({ message: "Successfully Registered Please login"})
                }
            })
            console.log("123")
        }
    })
})

 


app.listen(9002,()=>{
    console.log("started at port 9002");
})