const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

app.use(express.json());

// 이용자 계정 정보 반환.
app.get("/api/user", (req, res) => {
  database.query("SELECT * FROM user", (err, users) => {
    if (err)
      console.log(err);
    else {
      res.send({ users });
    }
  })
});

// 전체 프로젝트 리스트 반환. state :: 진행단계가 0단계이면 미착수, 1~6단계이면 진행중, 7단계이면 완료, 현재 날짜가 deadline을 넘겼으면 지연.
app.get("/api/project", (req, res) => {
  database.query("SELECT Pno, Pname, user_name, mgr, case when (progress = 7) then '완료' when(deadline-date(now()) < 0) then '지연' when (progress = 0) then '미착수' when (progress between 1 and 6) then '진행중' end as state, progress, DATE_FORMAT(start_date,'%Y-%m-%d')as start_date, DATE_FORMAT(deadline,'%Y-%m-%d')as deadline, DATE_FORMAT(end_date,'%Y-%m-%d')as end_date FROM project LEFT JOIN user ON project.mgr = user.user_no", (err, projects) => {
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
          database.query("INSERT INTO log (pnum, user_num, pname, summary, time) VALUES(?, ?, ?, '프로젝트 생성됨', now())", [res[0].Pno, data.user_no, res[0].Pname], (err, res) => {
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
  database.query('SELECT user_name from user where user_no = ?', [data.mgr], (err, res) => {
    if (err) console.log(err)
    else {
      new_mgr = res[0].user_name
    }
  })
  database.query('SELECT p.mgr, p.progress, p.Pname, date_format(p.deadline, "%Y-%m-%d") as deadline from project p, user u where p.Pno = ? and u.user_no = p.mgr', [data.Pno], (err, res) => { // 바꾸려는 프로젝트의 원래 정보들 res[0]에 저장.
    if (!err) {
      // 다 바꼈을 때
      console.log('1')
      if (res[0].mgr != data.mgr && res[0].deadline != data.deadline && res[0].progress != data.progress) {
        database.query('UPDATE works_on SET user_no = ? where user_no = ? and pno = ?', [data.mgr, res[0].mgr, data.Pno], (err, res) => { if (err) console.log(err) })
        if (data.progress == 7) {
          database.query(`UPDATE project SET mgr=?, progress=?, deadline=?, end_date=date(now()) WHERE Pno=?`, [data.mgr, data.progress, data.deadline, data.Pno], (err, res) => { if (err) console.log(err) })
          database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "신규 관리자 : ? \n마감일 변동 : ? → ? \n진행 단계 갱신 : 프로젝트 완료됨")', [data.Pno, data.user_no, res[0].Pname, new_mgr, res[0].deadline, data.deadline], (err, res) => { if (err) console.log(err) })
        }
        else {
          database.query(`UPDATE project SET mgr=?, progress=?, deadline=? WHERE Pno=?`, [data.mgr, data.progress, data.deadline, data.Pno], (err, res) => { if (err) console.log(err) })
          database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "신규 관리자 : ? \n마감일 변동 : ? → ? \n진행 단계 갱신 : ? 단계 → ? 단계")', [data.Pno, data.user_no, res[0].Pname, new_mgr, res[0].deadline, data.deadline, res[0].progress, data.progress], (err, res) => { if (err) console.log(err) })
        }
      }
      // 관리자, 마감일 변경
      else if (res[0].mgr != data.mgr && res[0].deadline != data.deadline) {
        console.log('2')
        database.query('UPDATE works_on SET user_no = ? where user_no = ? and pno = ?', [data.mgr, res[0].mgr, data.Pno], (err, res) => { if (err) console.log(err) })
        database.query(`UPDATE project SET mgr=?, deadline=? WHERE Pno=?`, [data.mgr, data.deadline, data.Pno], (err, res) => { if (err) console.log(err) })
        database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "신규 관리자 : ? \n마감일 변동 : ? → ?")', [data.Pno, data.user_no, res[0].Pname, new_mgr, res[0].deadline, data.deadline], (err, res) => { if (err) console.log(err) })
      }
      // 관리자, 진행 단계 변경
      else if (res[0].mgr != data.mgr && res[0].progress != data.progress) {
        console.log('3')
        database.query('UPDATE works_on SET user_no = ? where user_no = ? and pno = ?', [data.mgr, res[0].mgr, data.Pno], (err, res) => { if (err) console.log(err) })
        if (data.progress == 7) {
          database.query(`UPDATE project SET mgr=?, progress=?, end_date=date(now()) WHERE Pno=?`, [data.mgr, data.progress, data.Pno], (err, res) => { if (err) console.log(err) })
          database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "신규 관리자 : ? \n진행 단계 갱신 : 프로젝트 완료됨")', [data.Pno, data.user_no, res[0].Pname, new_mgr], (err, res) => { if (err) console.log(err) })
        }
        else {
          database.query(`UPDATE project SET mgr=?, progress=? WHERE Pno=?`, [data.mgr, data.progress, data.Pno], (err, res) => { if (err) console.log(err) })
          database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "신규 관리자 : ?\n진행 단계 갱신 : ?단계 → ? 단계")', [data.Pno, data.user_no, res[0].Pname, new_mgr, res[0].progress, data.progress], (err, res) => { if (err) console.log(err) })
        }
      }
      // 마감일, 진행 단계 변경
      else if (res[0].deadline != data.deadline && res[0].progress != data.progress) {
        console.log('4')
        if (data.progress == 7) {
          database.query(`UPDATE project SET progress=?, deadline=?, end_date=date(now()) WHERE Pno=?`, [data.progress, data.deadline, data.Pno], (err, res) => { if (err) console.log(err) })
          database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "마감일 변동 : ? → ? \n진행 단계 갱신 : 프로젝트 완료됨")', [data.Pno, data.user_no, res[0].Pname, res[0].deadline, data.deadline], (err, res) => { if (err) console.log(err) })
        }
        else {
          database.query(`UPDATE project SET progress=?, deadline=? WHERE Pno=?`, [data.progress, data.deadline, data.Pno], (err, res) => { if (err) console.log(err) })
          database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "마감일 변동 : ? → ? \n진행 단계 갱신 : ? 단계 → ? 단계")', [data.Pno, data.user_no, res[0].Pname, res[0].deadline, data.deadline, res[0].progress, data.progress], (err, res) => { if (err) console.log(err) })
        }
      }
      // 관리자 변경
      else if (res[0].mgr != data.mgr) {
        console.log('5')
        database.query('UPDATE works_on SET user_no = ? where user_no = ? and pno = ?', [data.mgr, res[0].mgr, data.Pno], (err, res) => { if (err) console.log(err) })
        database.query(`UPDATE project SET mgr=? WHERE Pno=?`, [data.mgr, data.Pno], (err, res) => { if (err) console.log(err) })
        database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "신규 관리자 : ?")', [data.Pno, data.user_no, res[0].Pname, new_mgr], (err, res) => { if (err) console.log(err) })
      }
      // 마감일 변경
      else if (res[0].deadline != data.deadline) {
        console.log('6')
        database.query(`UPDATE project SET deadline=? WHERE Pno=?`, [data.deadline, data.Pno], (err, res) => { if (err) console.log(err) })
        database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "마감일 변동 : ? → ?")', [data.Pno, data.user_no, res[0].Pname, res[0].deadline, data.deadline], (err, res) => { if (err) console.log(err) })
      }
      // 진행 단계 변경
      else if (res[0].progress != data.progress) {
        console.log('7')
        if (data.progress == 7) {
          database.query(`UPDATE project SET progress=?, end_date=date(now()) WHERE Pno=?`, [data.progress, data.Pno], (err, res) => { if (err) console.log(err) })
          database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "진행 단계 갱신 : 프로젝트 완료됨")', [data.Pno, data.user_no, res[0].Pname], (err, res) => { if (err) console.log(err) })
        }
        else {
          database.query(`UPDATE project SET progress=? WHERE Pno=?`, [data.progress, data.Pno], (err, res) => { if (err) console.log(err) })
          database.query('INSERT INTO log (pnum, user_num, pname, summary, time, details) VALUES(?, ?, ?, "프로젝트 정보 갱신", now(), "진행 단계 갱신 : ? 단계 → ? 단계")', [data.Pno, data.user_no, res[0].Pname, res[0].progress, data.progress], (err, res) => { if (err) console.log(err) })
        }
      }
    }
  })
})

// 프로젝트 삭제
app.post("/api/project_delete", (req, res) => {
  const data = req.body
  database.query("SELECT Pname from project where Pno = ?", [data.Pno], (err, res) => {
    if (err) console.log(err)
    else {
      database.query("INSERT INTO log (pnum, user_num, pname, summary, time) VALUES(?, ?, ?, '프로젝트 삭제됨', now())", [data.Pno, data.user_no, res[0].Pname], (err, res) => {
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
  database.query("select p.Pno, p.Pname, u.user_name as mgr_name, now()) as d_day, case when (p.progress = 7) then '완료' when(p.deadline-date(now()) < 0) then '지연' when (p.progress = 0) then '미착수' when (p.progress between 1 and 6) then '진행중' end as state, p.progress, DATE_FORMAT(p.start_date,'%Y.%m.%d')as start_date, DATE_FORMAT(p.deadline,'%Y.%m.%d')as deadline, DATE_FORMAT(p.end_date,'%Y.%m.%d')as end_date from project p, user u, works_on w where w.pno = p.Pno and p.mgr = u.user_no and w.user_no = ?", [data.user_no], (err, projects) => {
    if (err)
      console.log(err);
    else {
      res.send({ projects });
    }
  })
});

// 달력
app.post("/api/calendar", (req, res) => {
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
  database.query("select l.pnum, l.pname, u.user_name, l.summary, l.details, date_format(l.time, '%Y-%m-%d %h:%i:%s') as time from log l, user u where u.user_no = l.user_num", (err, logs) => {
    if (err) console.log(err)
    else {
      res.send({ logs })
    }
  })
})

// 차트용
app.get("/api/chart", (req, resp) => {
  const data = {
    completed: 0, // 완료된 프로젝트
    working: 0, // 진행중인 프로젝트
    delayed: 0, // 지연된 프로젝트
    canceled: 0, // 취소된 프로젝트
  }
  database.query('select count(*) as c from project where progress = 7', (err, res) => {
    if (err) console.log(err)
    else {
      data.completed = res[0].c

      database.query('select count(*) as w from project where deadline-date(now()) >= 0 and progress between 1 and 6 ', (err, res) => {
        if (err) console.log(err)
        else {
          data.working = res[0].w

          database.query('select count(*) as d from project where deadline-date(now()) < 0 and progress != 7', (err, res) => {
            if (err) console.log(err)
            else {
              data.delayed = res[0].d

              database.query('select count(*) as e from log where summary = "프로젝트 삭제됨"', (err, res) => {
                data.canceled = res[0].e

                resp.send(data)
              })
            }
          })
        }
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});