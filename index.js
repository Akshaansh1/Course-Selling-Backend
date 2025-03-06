const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRoutes } = require("./routes/user");
const { courseRoutes } = require("./routes/courses");
const { AdminRoutes } = require("./routes/admin");
const app = express();
dotenv.config();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/admin' , AdminRoutes);

const main = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000, console.log("Listening to Port 3000"));
}

main()