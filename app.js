var mysql = require('mysql');
const Router = require('koa-router');
let Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa();
const router = new Router();
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 1024 * 1024 * 1024
    }
}))
import {createTableSql,usernameSql} from './sql.js'
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port:     "3306",
    password : 'Abcd@12345',
    database : 'questions'
});

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});


function searchSq(table,name) {
    return new Promise((resolve, reject) => {
        let sql = `select count(*) as count from ${table} where username='${name}'`
        console.log('sql',sql)
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
                throw err
            };
            console.log('result',result)
            resolve(result[0].count);
        })
    })
}

function inserSql(userSql,addSqlParams){
    return new Promise((resolve, reject) => {
        connection.query(userSql,addSqlParams,function (err,result) {
            if(err){
                console.log(err.message)
                reject(err.message)
                return
            }
            resolve(result)
            console.log('INSERT ID:',result);

        })
    })
}

router.post('/regist', async ctx => {
    console.log('干啥呢',ctx.request.body)
    let {username,password} = ctx.request.body
    let addSqlParams = [username,password]
    let userSql = `INSERT INTO username(Id,username,password) VALUES(0,?,?)`
    let count = await searchSq('username',username)
    console.log(count,count)
    if(count){
       ctx.body = {
           code:201,
           message:'数据已经存在'
       };
       return
    }
    await inserSql(userSql,addSqlParams)
    ctx.body = {
        code:200,
        message:'插入成功'
    };
})


app.use(router.routes());


app.listen(8881,(err)=>{
    if(err) throw err
    console.log('开启服务成功')
})


connection.connect(err=>{
    if(err) throw err
    console.log('数据库连接成功')
});
// connection.query(createTableSql,(err)=>{
//     if(err) throw err
//     console.log('创建成功')
// })
//
//
// connection.query(usernameSql,(err)=>{
//     if(err) throw err
//     console.log('创建成功1')
// })






