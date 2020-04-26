// 建数据库
export const createTableSql = `CREATE DATABASE questions`

// 建用户表

export const usernameSql =`CREATE TABLE IF NOT EXISTS username(
    id INT key AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(40) NOT NULL
)`

export const questionSql =`CREATE TABLE IF NOT EXISTS question(
    id INT key AUTO_INCREMENT,
    user_id int  NOT NULL,
    title VARCHAR(255) NOT NULL,
    content text NOT NULL
)`
// Make complaints

export const makeComplaintsSql =`CREATE TABLE IF NOT EXISTS complaint(
    id INT key AUTO_INCREMENT,
    user_id int  NOT NULL,
    title VARCHAR(255) NOT NULL,
    content text NOT NULL
)`