const express = require("express");
const path = require("path");
const fs = require("fs");
const app= express();

//connection with mongodb database 
const mongoose = require('mongoose');
//after installing body parser via npm install ---
const bodyparser = require("body-parser")
//havent used body parser yet ?
// what is body parser ?? 


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port = 8000 ;


// defining mongoose sschema 
const contactSchema = new mongoose.Schema({
    name: String , 
    phone: String,
    email: String,
    address: String,
    desc: String
  });


// making a model - converting -> 
//made a collection 
const contact = mongoose.model('contact',  contactSchema );









// FIRST OF ALL WE WILL INSTALL ALL THE EXPRESS AND PUG DOCUMENTAION AND PACKAGES IN THIS FOLDER -> depemndencies,....
// npm init 
// npm install express    -- to install express'
// npm install pug --- for pug 



//express epciffic stuff
app.use('/static' , express.static('static'));
app.use(express.urlencoded());


//pug specific stuff
app.set('view engine' , 'pug'); //to set template engine as pug 
app.set('views' , path.join(__dirname , 'views'));


// ENDPOINTS
app.get('/', (req, res)=>{

    const params={};
    res.status(200).render('home.pug', params);
})


//  when it goes to->  /contact 
app.get('/contact', (req, res)=>{

    const params={};
    res.status(200).render('contact.pug', params);
})


//post request 
// do install body parser ->  npm install body-parser
// jesa he koi contact me post request dalega - to ye function cahlega 
app.post('/contact', (req, res)=>{

    //jo data post req sede form se abher nikla he wo isme dalega 
    var myData = new contact(req.body);
    
    //saving that data which we stored in myData - after saving it returns a promise (.then )
    myData.save().then( ()=>{
        res.send(" This is item has been saved to the database")
    }).catch( ()=>{
        res.status(400).send(" The item was not saved in the database ")
    });


    // res.status(200).render('contact.pug');
})

// now when we enter the form details in our conatct page (.pug) the detaiils
// are saved to backend in the mongodb database contactDance under collection contacts . 

//  YOU CAN CHECK BOOTSTRAP ALERTS FOR YOUR ALERT THAT YOU HAVE SUBMITTED WSUCCESSFULLY ! 

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});