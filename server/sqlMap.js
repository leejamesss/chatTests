// sql语句
//sqlMap.js——SQL 语句映射文件，供 API 调用
var sqlMap = {
    user: {
        add: 'insert into problem(A, B, C, D, question, answer, testpoint,course, analysis,correct) values (?,?,?,?,?,?,?,?,?,?)',
    }

}
module.exports = sqlMap


