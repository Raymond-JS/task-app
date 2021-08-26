const express = require("express")
const app = express();
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config()
const path = require("path");
const connectDB = require("./config/db.js");



// middelware firing on every request
app.use(express.json()) // looks for req.body
app.use(morgan("dev"))


connectDB()



// Route 
app.use("/tasks", require("./routes/taskRouter.js"))

__dirname = path.resolve()



if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build"))) 

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is running... ")
    })
}





// error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})




const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`)
})