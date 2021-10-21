const pg=require('pg');
const config = {
    user : 'onlinejudge',
    host : '18.218.217.203',
    database : 'onlinejudge',
    password : 'onlinejudge',
    port : 5432
};
const pool = new pg.Pool(config);

const query = async function(q){
    const client = await pool.connect();
    let res;
    try{
        await client.query('BEGIN');
        try{
            res = await client.query(q);
            await client.query('COMMIT');
        } catch(err){
            await client.query('ROLLBACK');
            throw err;
        }
    }finally{
        client.release();
    }
    return res;
}
exports.selectProblems=async function(){
    try{
        const {rows} = await query('SELECT * FROM problem LIMIT 30');
        return rows;
    }
    catch(err){
        console.log("Database "+err);
    }
}