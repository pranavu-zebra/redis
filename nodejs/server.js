const express = require ('express')
const axios = require('axios').default
const redisClient = require('./client')
const app = express()

app.get('/', async (req,res)=>{

    const cacheValue = await redisClient.get('todos');

    if(cacheValue) return res.json(JSON.parse(cacheValue))

    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos')
    await redisClient.setex('todos', 30, JSON.stringify(data));
    return res.json(data);
})

app.listen(3000, ()=>{
    console.log(`Server is up and running on port: 3000`);
})