const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

app.get("/api/users", (req, res) => {
  database.query("SELECT * FROM user", (err, users) => {
    if(err)
      console.log(err);
    else{
      res.send({ users });
    }
  })
});

app.get("/api/projects", (req, res) => {
  database.query("SELECT Pno, Pname, user_name, state, progress, DATE_FORMAT(start_date,'%Y.%m.%d')as start_date, DATE_FORMAT(deadline,'%Y.%m.%d')as deadline, DATE_FORMAT(end_date,'%Y.%m.%d')as end_date FROM project LEFT JOIN user ON project.mgr = user.user_no ", (err, projects) => {
    if(err)
      console.log(err);
    else{
      res.send({ projects });
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});