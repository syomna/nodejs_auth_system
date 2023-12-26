const express = require("express");
const app = express();
const authRoutes = require('./routes/auth.js');
const userRoutes = require("./routes/user.js");
const uploadRoutes = require("./routes/upload");
const postsRoutes = require("./routes/posts.js");
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
// DB Connect
mongoose.connect(process.env.DB_CONNECT);
// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/user', authRoutes);
app.use("/api/user/profile", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/posts", postsRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(3000, () => console.log("Running on PORT 3000!"));
