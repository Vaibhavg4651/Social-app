import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import passport from "passport";
import connectDB from "./config/db.js";
import cp from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import user from "./src/routes/routes.js";
import session from "express-session";

dotenv.config();
connectDB();
const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());


app.use("/", user);
app.use(
  session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("http://localhost:5173");
  res.clearCookie("connect.sid" , {path: "/" , httpOnly: true , sameSite: "none" , secure: false});
});

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(errorHandler);


const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running on port ${PORT} `));