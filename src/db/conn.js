const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/employees")
.then(()=>{
    console.log("DB Connection Successfull");
}).catch((e)=>{
    console.log("DB Not Connected");
})