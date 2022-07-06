const express = require('express'); // 설치한 익스프레스를 가져옴
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'secret code',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: true,
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
  conn.execute('select * from pr_prod_bas',function(err,result){
    if(err){
      console.log('쿼리 실패', err);
      return;
    }
    console.log('쿼리 성공');
    console.log(result.rows);
  })
}
);




app.post('/api/login', async (request, res) => {

});

app.post('/api/logout', async (request, res) => {

});

const sql = require('./sql.js');

app.post('/api/:alias', async(request, res) => {
  try { 
   
    // '/api/:alias'의 alias 자리에 오는 값이 아래에 들어가게 된다
     res.send(await req.db(request.params.alias));
  } catch(err){
    res.status(500).send({
      error: err
    });
  }
});

const req = {
  async db(alias, param = [], where = ''){
    console.log(sql[alias].query);
    return new Promise((resolve, reject) => dbPool.execute(sql[alias].query + where, param, (error, rows) => {
      if(error){
        if (error.code != 'ER_DUP_ENTRY')
          console.log(error);
        resolve({
          error
        });
      } else resolve(rows);
    }));
  }
};
