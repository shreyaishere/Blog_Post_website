const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/postRoutes");

const app = express();
const PORT = 5000;
// const MONGODB_URI = "mongodb://localhost:27017/Users";

const MONGODB_URI = process.env.MONGODB_URI;

app.use(
  cors({
    //   origin: 'http://localhost:3000',
    //   credentials: true

    //  origin: [
    //     "https://blog-post-website-wilp.onrender.com",
    //     "https://shreyaishere.github.io"
    //   ],

    origin: "https://blog-post-website-orpin.vercel.app",
    credentials: true,
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err)); 

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
