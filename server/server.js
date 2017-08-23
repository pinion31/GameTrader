const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
import igdb from 'igdb-api-node';

const app = express();


const client = igdb(process.env.IGDB_KEY);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '../static')));
app.use(express.static('static'));

app.get('/findGame/:term', (req,res) => {

  let searchResults = [];

  /*
  client.platforms({
    fields: '*' , // Return all fields
   // search: req.params.term,
    limit: 50, // Limit to 5 results
    offset: 100 // Index offset for results
    }).then((response) => {
        console.dir(response);



     });*/

  client.games({
    fields: ['id', 'name', 'cover', 'summary', 'developers', 'publishers'] , // Return all fields
    search: req.params.term,
    filters: {
      'release_dates.platform-eq':49
    },
    limit: 15, // Limit to 5 results
    offset: 0 // Index offset for results
    }).then((response) => {
      let result = response.body;

       result.forEach(game => {
          if (game.cover) {

            let coverImage = client.image({
              cloudinary_id: game.cover.cloudinary_id},
              'cover_small',
              'jpg'
            );

            searchResults = searchResults.concat([
            {
              id: game.id,
              name:game.name,
              summary:game.summary,
              cover:coverImage,
              //developer: result.developer,
              //publisher: result.publishers,
            }]);
          }
      });
       res.json(JSON.stringify(searchResults));
}).catch(error => {
        throw error;
});
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static', 'index.html'));
});

app.listen(3000, () => {
  console.log('App started again');
});


