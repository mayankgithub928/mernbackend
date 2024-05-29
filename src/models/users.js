const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }
    ,
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
users.methods.generateAuthtoken = async function(){
    try{
        console.log(this._id);
        const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        if (!this.tokens) {
            this.tokens = [];
        }
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        //console.log(token);
        return token;
    }catch(error){
       console.log(error);
    }
   
}
//users.index({ email: 1,phone: 1}, { unique: true });
users.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});
const UserData = new mongoose.model('User',users);
module.exports = UserData;