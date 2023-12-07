const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);


const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);


const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);


const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

db.sequelize
.sync()
.then(() => {

    app.listen(process.env.PORT || 3001, () => {
        console.log("Server running on Port 3001");
        
    });

})
.catch((err) => {
    console.log(err);
});