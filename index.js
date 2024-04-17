require("dotenv").config();

// Import required modules
const express = require('express');
const hbs = require("hbs");
const path = require('path');
const { Client } = require('pg');
const cors = require("cors");


// Create an Express application
const app = express();

// Set Handlebars as the view engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));


// Set up the public folder for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



// Set up PostgreSQL database connection
const client = new Client({
    host:process.env.POSTGRES_HOST,
    user:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    database:process.env.POSTGRES_DATABASE,
    port:5432,
});

try{
    client.connect();
  } catch(e){
    console.log("error while connecting to the database")
  }
  



// Define routes
app.get('/', async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('SELECT * FROM your_table');
//     const data = result.rows;
//     client.release();
//     res.render('home', {
//       title: 'Express Handlebars Boilerplate',
//       message: 'Welcome to my website!',
//       data: data
//     });
//   } catch (err) {
//     console.error('Error executing query', err);
//     res.status(500).send('Internal Server Error');
//   }
res.render("index");

});

app.get("/postgresCheck",async (req,res)=>{
    const { rows } = await client.query('SELECT * FROM questions');
    console.log(rows);
})

app.get("/faculty", async(req,res)=>{
    res.render('quizInfo');
})

app.get("/questions", async(req,res)=>{
    res.render('questions');
})

app.get("/getSubjects",async(req,res)=>{
    let year = (req.query.year);
    let dept = req.query.dept;
    console.log(req.query);
    console.log("year: ",year," dept: ",dept);
    const { rows } = await client.query(`SELECT subject,subject_id FROM college_year_dept where year=${year} and dept='${dept}'`);
    console.log(rows);
    res.json(rows);
})

// Define a port number
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
