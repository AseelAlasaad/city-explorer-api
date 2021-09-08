
'use strcit';

const axios=require('axios');

//http://localhost:3010/movie?query=amman
function getmovie(req,res){
    let  query=req.query.query;
    let urlmovie=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
    console.log(urlmovie);
    let movieInfo=[];
    axios.get(urlmovie).then(movie=>{
  
      movieInfo=movie.data.results.map(item=>{
         return new Movie(item);
     })

     res.send(movieInfo);
    })
    .catch((error)=>{
        res.status(500).send('Error!');
    })

    


}


class Movie{

    constructor(item){
      this.title=item.title;
      this.overview=item.overview;
      this.vote_average=item.vote_average;
      this.vote_count=item.vote_count;
      this.popularity=item.popularity;
     
    
    }
}
module.exports=getmovie;