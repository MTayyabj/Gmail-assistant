// const express = require('express')
// const app = express()
// const port = 3000
// import chatRoutes from "./routes/chatroutes.js";

// app.use("/api", chatRoutes);


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

import express from "express";
import chatRoutes from "./routes/chatroutes.js";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/Mongodb.js'
import authRouter from './routes/AuthRoutes.js'
import userRouter from "./routes/UserRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"

const app = express();
// const port = 5000;
const port = process.env.PORT || 5000; 
connectDB();

//ALLOWING TO COMMUNICATE WITH THIS API, WE CAN ADD MORE
// const allowedOrigins = ['https://project-1-q6dv.vercel.app/']

app.use(express.json()); // needed for req.body
app.use(cookieParser());

// app.use(cors({
//   origin:["http://localhost:5173", "https://project-1-q6dv.vercel.app"],
//   credentials:true
// }))

app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}))

//API ENDPOINTS
app.get('/',(req,res)=> res.send("API is working wo hooo."));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use("/api", chatRoutes);
// app.use("/api/chat", chatRoutes);
app.use("/api/contact", contactRoutes);


// if (process.env.NODE_ENV !== "production") {
//   const port = process.env.PORT || 4000;
//   app.listen(port, () => console.log(`Server is listening on PORT ${port}`));
// }

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Export server for Vercel
export default app;