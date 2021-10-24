const pg=require('pg');
const config = {
    user : 'onlinejudge',
    host : '18.191.59.199',
    database : 'onlinejudge',
    password : 'onlinejudge',
    port : 5432
};
const pool = new pg.Pool(config);

const runQuery = async function(q){
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


exports.selectProblems=async function(start,limit){
    try{
        const {rows} = await runQuery(`SELECT * FROM problem LIMIT ${limit} OFFSET ${start}`);
        return rows;
    }
    catch(err){
        console.log("Database "+err);
    }
}

exports.selectUsers = async function(start,limit){
    try{
        const {user} = await runQuery(`SELECT * FROM public.user`);
        const {profile} = await runQuery(`SELECT * FROM public.user_profile LIMIT ${limit} OFFSET ${start}`)
        console.log(user);
        return {user:user,profile:profile};
    }
    catch(err){
        console.log("Database "+err);
    }
}
