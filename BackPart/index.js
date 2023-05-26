const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

app.use(express.json());

app.get("/api/user", (req, res) => {
  database.query("SELECT * FROM user", (err, users) => {
    if (err)
      console.log(err);
    else {
      res.send({ users });
    }
  })
});

// 전체 프로젝트 리스트 반환. stae :: 진행단계가 0단계이면 미착수, 1~6단계이면 진행중, 7단계이면 완료, 현재 날짜가 deadline을 넘겼으면 지연.
app.get("/api/project", (req, res) => {
  database.query("SELECT Pno, Pname, user_name, case when (progress = 7) then '완료' when(deadline-date(now()) < 0) then '지연' when (progress = 0) then '미착수' when (progress between 1 and 6) then '진행중' end as state, progress, DATE_FORMAT(start_date,'%Y.%m.%d')as start_date, DATE_FORMAT(deadline,'%Y.%m.%d')as deadline, DATE_FORMAT(end_date,'%Y.%m.%d')as end_date FROM project LEFT JOIN user ON project.mgr = user.user_no", (err, projects) => {
    if (err)
      console.log(err);
    else {
      res.send({ projects });
    }
  })
});

// 신규 프로젝트 생성
app.post("/api/project_create", (req, res) => {
  const data = req.body
  database.query(`INSERT INTO project (Pname, mgr, progress, start_date, deadline, end_date) VALUES(?, ?, 1, date(now()), ?, null);`, [data.Pname, data.mgr, data.deadline], (err, res) => {
    if (err) {
      console.log(err)
    } else {
      database.query('SELECT Pno, Pname from project where Pname = ? and mgr = ?', [data.Pname, data.mgr], (err, res) => {
        if (err) {
          console.log(err)
        } else {
          database.query('INSERT INTO works_on (user_no, pno) values (?, ?)', [data.mgr, res[0].Pno], (err, res) => {
            if (err) {
              console.log(err)
            }
          })
          database.query("INSERT INTO log (pnum, user_num, pname, contents, time) VALUES(?, ?, ?, '프로젝트 생성됨', now())", [res[0].Pno, data.user_no, res[0].Pname], (err, res) => {
            if (err) console.log(err)
          })
        }
      })
    }
  })
});

// 프로젝트 정보 갱신
app.post("/api/project_update", (req, res) => {
  const data = req.body
  database.query('SELECT mgr, progress, Pname from project where Pno = ?', [data.Pno], (err, res) => {
    if (!err) {
      const pname = res[0].Pname
      database.query('UPDATE works_on SET user_no = ? where user_no = ? and pno = ?', [data.mgr, res[0].mgr, data.Pno], (err, res) => {
        if (err) console.log(err)
      })
      if (data.progress == 7) {
        database.query(`UPDATE project SET mgr=?, progress=?, deadline=?, end_date=date(now()) WHERE Pno=?`, [data.mgr, data.progress, data.deadline, data.Pno], (err, res) => {
          if (err) {
            console.log(err)
          } else {
            database.query("INSERT INTO log (pnum, user_num, pname, contents, time) VALUES(?, ?, ?, '프로젝트 완료됨', now())", [data.Pno, data.user_no, pname], (err, res) => {
              if (err) console.log(err)
            })
          }
        })
      } else {
        database.query(`UPDATE project SET mgr=?, progress=?, deadline=? WHERE Pno=?`, [data.mgr, data.progress, data.deadline, data.Pno], (err, res) => {
          if (err) {
            console.log(err)
          } else {
            database.query("INSERT INTO log (pnum, user_num, pname, contents, time) VALUES(?, ?, ?, '프로젝트 정보 갱신됨', now())", [data.Pno, data.user_no, pname], (err, res) => {
              if (err) console.log(err)
            })
          }
        })
      }
    } else console.log(err)
  })
});

// 프로젝트 삭제
app.post("/api/project_delete", (req, res) => {
  const data = req.body
  database.query("SELECT Pname from project where Pno = ?", [data.Pno], (err, res) => {
    if (err) console.log(err)
    else {
      database.query("INSERT INTO log (pnum, user_num, pname, contents, time) VALUES(?, ?, ?, '프로젝트 삭제됨', now())", [data.Pno, data.user_no, res[0].Pname], (err, res) => {
        if (err) console.log(err)
      })
      database.query(`DELETE FROM project WHERE Pno=?`, [data.Pno], (err, res) => {
        if (err) console.log(err)
      })
    }
  })
});

// 이용자의 참여 프로젝트 리스트 반환
app.post("/api/my_project", (req, res) => {
  const data = req.body
  database.query("select p.Pno, p.Pname, u.user_name, concat(p.deadline-date(now()), ' 일') as d_day, case when (p.progress = 7) then '완료' when(p.deadline-date(now()) < 0) then '지연' when (p.progress = 0) then '미착수' when (p.progress between 1 and 6) then '진행중' end as state, p.progress, DATE_FORMAT(p.start_date,'%Y.%m.%d')as start_date, DATE_FORMAT(p.deadline,'%Y.%m.%d')as deadline, DATE_FORMAT(p.end_date,'%Y.%m.%d')as end_date from project p, user u, works_on w where w.pno = p.Pno and p.mgr = u.user_no and w.user_no = ?", [data.user_no], (err, projects) => {
    if (err)
      console.log(err);
    else {
      res.send({ projects });
    }
  })
});

// 달력
app.post("/api/calender", (req, res) => {
  const data = req.body
  database.query("SELECT Pname, deadline, date(now())-deadline as d_day from project where date_format(?, '%Y-%m') = date_format(deadline, '%Y-%m')", [data.date], (err, projects) => {
    if (err) console.log(err)
    else {
      res.send({ projects })
    }
  })
});

// 사용로그
app.get("/api/uselog", (req, res) => {
  database.query("select * from log", (err, logs) => {
    if (err) console.log(err)
    else {
      res.send({ logs })
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});