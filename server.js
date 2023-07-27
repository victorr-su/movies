import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

// api endpoint to retrieve the movies
app.post('/api/getMovies', (req,res) =>{
	let connection = mysql.createConnection(config);
	let sql = 'SELECT * FROM v3su.movies;';
	// execute the sql query
	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({ movies: results });
		connection.end();
	});
});

// write the movie to the db
app.post('/api/addReview', (req, res) => {
	const {userID, movieID, Title, Review, Rating} = req.body;
	const sql = 'INSERT INTO v3su.Review (reviewTitle, reviewContent, reviewScore, MovieID, userID) VALUES (?, ?, ?, ?, ?);'
	const data = [Title, Review, Rating, movieID, userID];
  
	const connection = mysql.createConnection(config);
  
	connection.query(sql, data, (error) => {
	  if (error) {
		console.error(error.message);
	  } else {
		res.send('Review added successfully');
	  }
	  connection.end();
	});
  });

// search api end point
app.post('/api/search', (req, res) => {
	const connection = mysql.createConnection(config);
	const { movieTitle, actorName, directorName } = req.body;
	let sql = 'SELECT M.name AS movieTitle, ' +
	'GROUP_CONCAT(DISTINCT CONCAT(D.first_name, " ", D.last_name) SEPARATOR ", ") AS directorNames, ' +
	'GROUP_CONCAT(DISTINCT R.reviewContent SEPARATOR ", ") AS reviews, AVG(R.reviewScore) AS avgReviewScore ' +
	'FROM movies M ' +
	'LEFT JOIN movies_directors MD ON M.id = MD.movie_id ' +
	'LEFT JOIN directors D ON MD.director_id = D.id ' +
	'LEFT JOIN roles RA ON M.id = RA.movie_id ' +
	'LEFT JOIN actors A ON RA.actor_id = A.id ' +
	'LEFT JOIN Review R ON M.id = R.movieID ' +
	'WHERE 1 ';  
  
	const values = [];
  
	if (movieTitle) {
	  sql += 'AND M.id IN (SELECT id FROM movies WHERE name LIKE ?) ';
	  values.push('%' + movieTitle + '%');
	}
  
	if (actorName) {
	  sql += 'AND CONCAT(A.first_name, " ", A.last_name) LIKE ? ';
	  values.push('%' + actorName + '%');
	}
  
	if (directorName) {
	  sql += 'AND CONCAT(D.first_name, " ", D.last_name) LIKE ? ';
	  values.push('%' + directorName + '%');
	}
  
	sql += 'GROUP BY M.name';
	connection.query(sql, values, (error, results) =>{
		if(error){
			console.error(error.message);
		}else{
			res.send(results)
		}
		connection.end();
	})
})

// movie trailer Api endpoint
app.post('/api/trailer', (req,res)=>{
	const connection = mysql.createConnection(config);
	const { movieTitle } = req.body;
	let sql = 'SELECT MT.trailer_link as link FROM movie_trailers MT ' +
	'LEFT JOIN movies M ON M.id = MT.movie_ID ' +
	'WHERE M.id IN (SELECT id FROM movies WHERE name LIKE ?)';
	let values = [movieTitle];

	connection.query(sql, values, (error, results) =>{
		if(error){
			console.log(error);
		}else{
			res.send(results)
		}
	})

})

//Add new movie trailer
app.post('/api/addTrailer', (req, res) => {
	const connection = mysql.createConnection(config);
	const { addMovieTitle, addMovieLink } = req.body;
	let sql = 'SELECT id FROM v3su.movies WHERE name LIKE ?';
	let values = [addMovieTitle];
  
	connection.query(sql, values, (err, results) => {
	  if (err) {
		console.log(err);
		connection.end(); // Close the connection in case of an error
		return res.status(500).json({ error: 'Error fetching movieID.' });
	  }
  
	  if (results.length === 0) {
		connection.end(); // Close the connection when there are no results
		return res.status(404).json({ error: 'Movie not found.' });
	  }
  
	  let movieIDToAdd = results[0].id;
  
	  let insertSql = 'INSERT INTO v3su.movie_trailers (trailer_link, movie_ID) VALUES (?, ?)';
	  let insertValues = [addMovieLink, movieIDToAdd];
  
	  connection.query(insertSql, insertValues, (err, result) => {
		if (err) {
		  console.log(err);
		  connection.end(); // Close the connection in case of an error
		  return res.status(500).json({ error: 'Error inserting data.' });
		}
  
		connection.end(); // Close the connection after the insert query
		return res.status(200).json({ message: 'Trailer link added successfully.' });
	  });
	});
  });
  
  



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server