'use strcit';

const axios=require('axios');

function getweather(req,res){
    const city=req.query.city;
    const lat=req.query.lat;
    const lon=req.query.lon;
    // &lat=${lat}&lon=${lon}
    let url=`http://api.weatherbit.io/v2.0/forecast/daily/weather?city=${city}&Key=${process.env.WEATHER_API_KEY}`;
    let weatherInfo=[];
    axios.get(url).then(result=>{
    console.log(url);
      weatherInfo=result.data.data.map(item=>{
         return new Forecast(item);
     })

     res.send(weatherInfo);
    })
    .catch((error)=>{
        res.status(500).send('Error!');
    })




}


class Forecast{

    constructor(item){
        //describtion,valid_date from weather.json
        this.description=`low of ${item.min_temp}, high of${item.max_temp} with ${item.weather.description}`;
        this.date=item.valid_date;
        
        
    }
}
module.exports=getweather;