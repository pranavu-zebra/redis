const client = require('./client')

async function init(){
    await client.setex('user:10',1, 'rahul')
    const result = await client.get('user:10');
    console.log('Result ->', result);
    const resultAll = await client.keys('*')
    console.log('Result ->', resultAll);   
}
init();