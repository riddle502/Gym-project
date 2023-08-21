dotenv=require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')
dotenv.config({path:'./config.env'})

//console.log("environment-variable",process.env)

// const UserRoutes = require('./routes/usersRoutes');
// const productRoutes=require('./routes/productRoutes')

const handler=require('./handler')





mongoose.connect('mongodb+srv://amir:8604461434@cluster0.tutp2.mongodb.net/gym-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
});


const app=express();

app.use(express.json());
app.use(cors())

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});



// app.use('/user', UserRoutes);
// app.use('/product',productRoutes);

app.use(handler)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});