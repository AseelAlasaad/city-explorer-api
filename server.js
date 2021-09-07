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




// http://localhost:3010/

server.get('/',(req,res)=>{
    res.send('Welcome from the home');
})
//http://api.weatherbit.io/v2.0/history/daily/getWeatherinfo
// http://localhost:3010/getWeatherinfo?lat=''&lon=''
server.get('/getWeatherinfo',(req,res)=>{
   const cityName=req.query.cityName;
    const lat=req.query.lat;
    const lon=req.query.lon;
    // &lat=${lat}&lon=${lon}
    let url=`http://api.weatherbit.io/v2.0/forecast/daily/getWeatherinfo?lat=${lat}&lon=${lon}&Key=${process.env.WEATHER_API_KEY}`;
    let weatherInfo=[];
    axios.get(url).then(result=>{
    //   console.log(result);
      weatherInfo=result.data.data.map(item=>{
         return new Forecast(item);
     })

     res.send(weatherInfo);
    })
    .catch((error)=>{
        res.status(500).send('Error!');
    })




});
//http://localhost:3010/getMovie?cityName=Amman
server.get('/getMovie',(req,res)=>{
    const cityName=req.query.cityName;
     let urlmovie=`https://api.themoviedb.org/3/search/getMovie?api_key=${process.env.MOVIE_API_KEY}&cityName=${cityName}`;
     let movieInfo=[];
     axios.get(urlmovie).then(result=>{
     //   console.log(result);
       movieInfo=result.data.results.map(item=>{
          return new Movie(item);
      })
 
      res.send(movieInfo);
     })
     .catch((error)=>{
         res.status(500).send('Error!');
     })
 
 
 
 
 });
 

class Forecast{

    constructor(item){
        //describtion,valid_date from weather.json
        this.description=`low of ${item.min_temp}, high of${item.max_temp} with ${item.weather.description}`;
        this.date=item.valid_date;
        
        
    }
}

class Movie{

    constructor(item){
      this.title=item.title;
      this.overview=item.overview;
      this.vote_average=item.vote_average;
      this.vote_count=item.vote_count;
      this.popularity=item.popularity;
      this.release=item.release;  
    
    }
}
server.get('*',(req,res)=>{
    res.status(404).send('Sorry, page not found');
})
// http:localhost:3010/***** */
server.listen(PORT,()=>{
    console.log(`Hello,I'm listining on ${PORT}`);
})