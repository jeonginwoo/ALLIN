const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

app.use(express.json());

app.get("/api/user", (req, res) => {
  database.query("SELECT * FROM user", (err, users) => {
    if(err)
      console.log(err);
    else{
      res.send({ users });
    }
  })
});

app.get("/api/project", (req, res) => {
  database.query("SELECT Pno, Pname, user_name, state, progress, DATE_FORMAT(start_date,'%Y.%m.%d')as start_date, DATE_FORMAT(deadline,'%Y.%m.%d')as deadline, DATE_FORMAT(end_date,'%Y.%m.%d')as end_date FROM project LEFT JOIN user ON project.mgr = user.user_no ", (err, projects) => {
    if(err)
      console.log(err);
    else{
      res.send({ projects });
    }
  })
});

app.post("/api/project_create", (req, res) => {
  const data = req.body
  database.query(`INSERT INTO project (Pname, mgr, state, progress, start_date, deadline, end_date) VALUES(?, ?, ?, ?, ?, ?, ?);`, [data.Pname, data.mgr, data.state, data.progress, data.start_date, data.deadline, data.end_date], (err, res) =>{
    if(err){
      console.log(err)
    } else {
      console.log(res)
    }
  })
});

app.post("/api/project_update", (req, res) => {
  const data = req.body
  console.log(data)

  // database.query(``, [], (err, res) =>{
  //   if(err){
  //     console.log(err)
  //   } else {
  //     console.log(res)
  //   }
  // })
});

app.post("/api/project_delete", (req, res) => {
  const data = req.body
  console.log(data)

  // database.query(``, [], (err, res) =>{
  //   if(err){
  //     console.log(err)
  //   } else {
  //     console.log(res)
  //   }
  // })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});