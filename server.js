'use strcit';
// import lib
require('dotenv').config();
const express=require('express');
const cors=require('cors');

//axios
const axios=require('axios');

//get wather data
// const weatherDate=require('./data/weather.json');

const server=express();
server.use(cors());
//get port from .env file
const PORT=process.env.PORT;

const getWeather=require('./Weather');

const getMovie=require('./Movie');


// http://localhost:3010/

server.get('/',(req,res)=>{
    res.send('Welcome from the home');
})
// http://localhost:3010/weather?city=Aamman
server.get('/weather',getWeather);



//http://localhost:3010/movie?query=amman
server.get('/movie',getMovie);

server.get('*',(req,res)=>{
    res.status(404).send('Sorry, page not found');
})
// http:localhost:3010/***** */
server.listen(PORT,()=>{
    console.log(`Hello,I'm listining on ${PORT}`);
})