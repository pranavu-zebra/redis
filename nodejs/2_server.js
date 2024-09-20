// for string

const express = require ('express')
const fs = require('fs').promises;
const redisClient = require('./1_client')
const app = express()

app.get('/', async (req,res)=>{

    const cacheValue = await redisClient.get('todos');
    if(cacheValue) return res.json(JSON.parse(cacheValue))
 
    const data = await fs.readFile('./dummyData-0.json', 'utf8');
    const jsonData = JSON.parse(data);
    await redisClient.setex('todos', 30, JSON.stringify(jsonData));
    
    return res.json(jsonData);
})

module.exports = app;

// for hash

// const express = require('express');
// const fs = require('fs').promises;
// const redisClient = require('./1_client');
// const app = express();

// app.get('/', async (req, res) => {
//     const data = await fs.readFile('./dummyData.json', 'utf8');
//     const jsonData = JSON.parse(data);

//     for (let key in jsonData) {
//         const redisKey = key;
//         const cacheValue = await redisClient.hget(redisKey, 'userId');
        
//         if (!cacheValue) {
//             for (let field in jsonData[key]) {
//                 await redisClient.hset(redisKey, field, JSON.stringify(jsonData[key][field]));
//             }
//             await redisClient.expire(redisKey, 30000);
//         }
//     }
    
//     const todos = {};
//     for (let key in jsonData) {
//         const redisKey = key;
//         const fields = await redisClient.hgetall(redisKey);
//         todos[redisKey] = {};
//         for (let field in fields) {
//             todos[redisKey][field] = JSON.parse(fields[field]);
//         }
//     }

//     return res.json(todos);
// });

// app.listen(3000, () => {
//     console.log('Server is up and running on port: 3000');
// });
