'use strcit';
// import lib
require('dotenv').config();
const express=require('express');
const cors=require('cors');
//get wather data
const weatherDate=require('./data/weather.json');

const server=express();
server.use(cors());
//get port from .env file
const PORT=process.env.PORT;
//class Forecast



// http://localhost:3010/

server.get('/',(req,res)=>{
    res.send('Welcome from the home');
})

// http://localhost:3010/getWeatherinfo?cityName=Amman
server.get('/getWeatherinfo',(req,res)=>{
 const cityName=req.query.cityName;
//  const lat=req.query.lat;
//  const lon=req.query.lon;
    const returnArr=weatherDate.find((item)=>{
      if(item.city_name===cityName)
      {   
          return item;
      }
    })
    const weatherArr=returnArr.data.map((item)=>{
       let obj =new Forecast(item);
       return obj ;
    }) 

 console.log(weatherArr);

 res.send(weatherArr);
});


class Forecast{

    constructor(item){
        //describtion,valid_date from weather.json
        this.description=item.weather.description;
        this.data=item.valid_date;
        this.high=item.max_temp;
    }
}
server.get('*',(req,res)=>{
    res.status(404).send('Sorry, page not found');
})
// http:localhost:3010/***** */
server.listen(PORT,()=>{
    console.log(`Hello,I'm listining on ${PORT}`);
})