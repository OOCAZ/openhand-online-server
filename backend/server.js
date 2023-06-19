const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes');
const helmet = require('helmet')
const path = require("path")

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, function(err) {
    if(err){
        console.log(err);
    }else{
        console.log("Database connected")
    }
} )

app.use(express.json())
app.use(helmet())
app.use('/app', routesUrls)
app.use(express.static(path.join(__dirname, "build")));
app.post("/", function(req, res) {
res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT || 3000);
