require("dotenv").config()

const express = require("express")
const app = express();
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to DataBase"))

app.use(express.json());

const ninjasRouter = require("./routes/ninjas.js")
app.use("/ninjas", ninjasRouter)

app.listen(3000, () => console.log("Server on port 3000"))
