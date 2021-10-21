const {postgres}=require('pg');
const sql = new postgres({
    user : 'onlinejudge',
    host : '18.218.217.203',
    database : 'onlinejudge',
    password : 'onlinejudge',
    port : 5432
});
exports.selectProblems=async function(done){
    pg.connect(sql,(err,client)=>{
        const query=client.query('select * from problem;');
        let rows = [];
        query.on('row',function(row){
            rows.push(row);
        });
        query.on('end',function(row,err){
            done(rows);
        });
        query.on('error',function(err){
            console.log("error while sql");
        });

    });

}