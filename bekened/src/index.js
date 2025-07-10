import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app , server } from "./lib/socket.js";
import path  from "path";


dotenv.config();

 
let PORT = process.env.PORT;

  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); 

let __dirname = path.resolve();

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended:true,limit:"10mb"}));
app.use(cookieParser());



app.use("/api/auth" , authRoute);
app.use("/api/messages" ,messageRoute);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.use((req , res)=>{
    res.send("page not found !!");
});

server.listen(PORT,(req, res)=>{
     console.log(`THE SERVER HAS STARTED AT PORT ${PORT}`);
     connectDB();
});