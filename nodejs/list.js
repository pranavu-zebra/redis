const client = require ('./client')

async function init(){
    const result = await client.lpush('tables', '1')
    console.log('result --> ',result);
    const resultAll = await client.lrange('tables', '0', '-1')
    console.log('result --> ',resultAll);

}
init()