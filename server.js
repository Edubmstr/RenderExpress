import dotenv from 'dotenv';
import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 8090

const pool = mysql.createPool(process.env.DATABASE_URL);

app.get('/data', (req, res) => {
   const result = pool.query('SELECT * FROM dox WHERE id=(SELECT max(id) FROM dox)', function(err, rows, fields){
      if(err) throw err;
      res.send(rows);
   });
});

app.post('/money', (req, res) => {
   const result = pool.query(`INSERT into dox (money) VALUES(${req.body.amount})`, function(err, rows, fields){
      if(err) throw err;
      res.send(rows);
   });
})

 app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
 });
