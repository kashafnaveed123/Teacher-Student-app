const express=require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const app=express()
const mongodbUrl = 'mongodb+srv://222kashafnaveed:kashafnaveed@cluster0.vdp24.mongodb.net/SampleBackend?retryWrites=true&w=majority'


const userRoutes = require('./routes/userRoutes') 
const courseRoutes=require('./routes/courseRoutes')
const port = 5002
 
app.use(express.json())
app.use(cors())

app.use('/user' ,userRoutes )
app.use('/course', courseRoutes); 

mongoose.connect(mongodbUrl).then(() => {
  console.log("Database is connected")
}).catch((err) => {
  console.log(err)
})


app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})