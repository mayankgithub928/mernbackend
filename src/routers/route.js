const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const router = new express.Router();
const UserData = require('../models/users');
const jwt = require('jsonwebtoken');


router.get('/',(req,res)=>{
    //res.send('Home Page');
    res.render('index');
});
router.get('/register',(req,res)=>{
    //res.send('Home Page');
     res.render('register');
});
router.get('/login',(req,res)=>{
    //res.send('Home Page');
    res.render('login');
});

router.post('/registerProcess', async (req,res)=>{
    try{
        const psw = req.body.password;
        const cpsw = req.body.confirm_password;
        if(psw!==cpsw){
            res.send('Password are not matching');
        }
        else{
            const insertData= new UserData(req.body);
            const token = await insertData.generateAuthtoken();
            console.log("MY_TOKEN:"+token);
            const insertedData = await insertData.save();
            res.redirect('/login');

        }
        
    }catch(e){
        res.status(400).send(e);
    }
   
});

router.post('/loginProcess', async (req,res) => {
    try{
        const {email,password} = req.body;
        // console.log(email);
        // console.log(password);
        const userData = await UserData.findOne({'email':email}).select('name email phone password');
        console.log("userData:"+userData);
        if(userData==null){
            console.log('Invalid Login');
            res.send('Invalid Login');
        }else{
            const isPswMatched = await bcrypt.compare(password,userData.password);
            const token = await userData.generateAuthtoken();
            console.log("MY_TOKEN:"+token);
            console.log(`password matched ${isPswMatched}`);
            res.send(userData);
        }
        
       
    }catch(error){
        res.send(error);
    }

});

module.exports = router;