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

// 신규 프로젝트 생성 // *** 이용자의 user_no 보내줘야함 ***
app.post("/api/project_create", (req, res) => {
  const data = req.body
  database.query(`INSERT INTO project (Pname, mgr, progress, start_date, deadline, end_date) VALUES(?, ?, 1, date(now()), ?, null);`, [data.Pname, data.mgr, data.deadline], (err, res) => {
    if (err) {
      console.log(err)
    } else {
      database.query('SELECT Pno from project where Pname = ? and mgr = ?', [data.Pname, data.mgr], (err, res) => {
        if (err) {
          console.log(err)
        } else {
          database.query('INSERT INTO works_on (user_no, pno) values (?, ?)', [data.mgr, res[0].Pno], (err, res) => {
            if (err) {
              console.log(err)
            }
          })
          database.query("INSERT INTO log (pnum, user_num, contents) VALUES(?, ?, '프로젝트 생성됌')", [res[0].Pno, data.user_no], (err, res) => {
            if (err) console.log(err)
          })
        }
      })
    }
  })
});

// 프로젝트 정보 갱신 // *** 이용자의 user_no 보내줘야함 ***
app.post("/api/project_update", (req, res) => {
  const data = req.body
  database.query('SELECT mgr, progress from project where Pno = ?', [data.Pno], (err, res) => {
    if (!err) {
      database.query('UPDATE works_on SET user_no = ? where user_no = ? and pno = ?', [data.mgr, res[0].mgr, data.Pno], (err, res) => {
        if (err) console.log(err)
      })
      database.query("INSERT INTO log (pnum, user_num, contents) VALUES(?, ?, '프로젝트 정보 갱신됌')", [data.Pno, data.user_no], (err, res) => {
        if (err) console.log(err)
      })
    } else console.log(err)
  })
  database.query(`UPDATE project SET Pname=?, mgr=?, progress=?, deadline=? WHERE Pno=?`, [data.Pname, data.mgr, data.progress, data.deadline, data.Pno], (err, res) => {
    if (err) {
      console.log(err)
    }
  })
});

// 프로젝트 삭제 // *** 이용자의 user_no 보내줘야함 ***
app.post("/api/project_delete", (req, res) => {
  const data = req.body
  console.log(data)
  database.query(`DELETE FROM project WHERE Pno=?`, [data.Pno], (err, res) => {
    if (err) {
      console.log(err)
    } else {
      database.query("INSERT INTO log (pnum, user_num, contents) VALUES(?, ?, '프로젝트 삭제됌')", [data.Pno, data.user_no], (err, res) => {
        if (err) console.log(err)
      })
    }
  })
});

// 이용자의 참여 프로젝트 리스트 반환 // *** 이용자의 user_no 보내줘야함 ***
app.post("/api/my_project", (req, res) => {
  const data = req.body
  database.query("select p.Pno, p.Pname, u.user_name, p.deadline-date(now()) as d_day, case when (p.progress = 7) then '완료' when(p.deadline-date(now()) < 0) then '지연' when (p.progress = 0) then '미착수' when (p.progress between 1 and 6) then '진행중' end as state, p.progress, DATE_FORMAT(p.start_date,'%Y.%m.%d')as start_date, DATE_FORMAT(p.deadline,'%Y.%m.%d')as deadline, DATE_FORMAT(p.end_date,'%Y.%m.%d')as end_date from project p, user u, works_on w where w.pno = p.Pno and p.mgr = u.user_no and w.user_no = ?", [data.user_no], (err, projects) => {
    if (err)
      console.log(err);
    else {
      res.send({ projects });
    }
  })
});

// // 대시보드 page 좌측 상단.
// app.post("/api/project_of_year", (req, res) => {
//   const data = req.body
//   const result = {
//     complete: 0,
//     working: 0,
//     delayed: 0
//   }
//   database.query("select count(progress) as complete from project where progress = 7 and year(deadline) = ?", [data.year], (err, res) => {
//     if (err) console.log(err);
//     else {
//       result.complete = res[0].complete
//     }
//   })
//   database.query("select count(progress) as working from project where progress between 1 and 6 and year(deadline) = ?", [data.year], (err, res) => {
//     if (err) console.log(err);
//     else {
//       result.working = res[0].working
//     }
//   })
//   database.query("select count(progress) as delayed from  where  and year(deadline) = ?", [data.year], (err, res) => {
//     if (err) console.log(err);
//     else {
//       result.complete = res[0].complete
//     }
//   })
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});