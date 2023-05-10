const express = require('express');
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
const url = "mongodb+srv://user001:test123@cluster0.dpqjq5z.mongodb.net/IpDB";
mongoose.connect(url);
const IPSchema = new mongoose.Schema({
  address:String
});
const Ip = new mongoose.model("Ip",IPSchema);
app.get('/', (req, res) => {
    const parseIp = (req) =>
    req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress

    const ip = parseIp(req);
    const newIP = new Ip({
      address:ip
    });
    newIP.save().then(()=>{
      console.log("Added");
    })
    res.render("index",{ip});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});