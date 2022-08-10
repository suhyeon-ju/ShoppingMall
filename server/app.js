const express = require('express'); // 설치한 익스프레스를 가져옴
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'secret code',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,  // false 이면 session에 키값 넣어서 test 가능
    maxAge: 1000 * 60 * 60 //쿠키 유효시간 1시간
  }
}));

const server = app.listen(3000, () => {
  console.log('Server started. port 3000.');
});

// db 연결
// const db = {
//   database: "xe",
//   connectionLimit: 10,
//   host:"192.168.0.1",
//   user:"potato",
//   password:"potato",
//   port:"1521"
// }
// const dbPool = require('oracledb').getConnection(db);

const dbPool = {
  user: 'potato',
  password: 'potato',
  host: '192.168.0.1',
  database: 'xe'
}

const oracledb = require('oracledb')
oracledb.getConnection({
  user: 'potato',
  password: 'potato',
  host: '192.168.0.1',
  database: 'xe'
}, function (err, conn){
  if(err){
    console.log('접속 실패', err);
    return;
  }
  console.log('접속 성공');
}
);




app.post('/api/login', async (request, res) => {
  request.session['email'] = 'test@email.com';
  res.send('ok');
});

app.post('/api/logout', async (request, res) => {
  request.session.destroy();
  res.send('ok');
});

const sql = require('./sql.js');

app.post('/api/:alias', async(request, res) => {
  if(!request.session.email){
    return res.status(401).send({error:'You need to login.'});
  }
  try { 
   
    // '/api/:alias'의 alias 자리에 오는 값이 아래에 들어가게 된다
     res.send(await req.db(request.params.alias));
  } catch(err){
    res.status(500).send({
      error: request.params.alias
    });
  }
});

const req = {
  async db(alias, param = [], where = ''){
    console.log(sql[alias].query);
    return new Promise((resolve, reject) => oracledb.getConnection(dbPool,function(err,conn){
      conn.execute(sql[alias].query + where, param, (error, rows) => {
        if(error){
          if (error.code != 'ER_DUP_ENTRY')
            console.log(error);
          resolve({
            error
          });
        } else resolve(rows);
      })

    }
     ));
  }
};
