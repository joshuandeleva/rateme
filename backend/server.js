//PACKAGES
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const parser = require("./middlewares/cloudinaryConfig");
const cors = require("cors");
const connectDB = require("./db/db");
const bodyParser = require("body-parser");
const { route } = require("./routes/auth");
const User = require('./models/user')
const Message = require('./models/Message')
dotenv.config({ path: "./config/config.env" });

//routes

const authRoute = require("./routes/auth", parser.single("image"));
const userRoute = require("./routes/user");
const messageRoute = require("./routes/message");
const conversationRoute = require("./routes/conversation");
const chatRoute = require('./routes/chat')
const messagesRoute = require('./routes/messages')

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// app.use("/home", Home);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversation", conversationRoute);
app.use('/api/chat', chatRoute)
app.use('/api/messages', messagesRoute)


const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
